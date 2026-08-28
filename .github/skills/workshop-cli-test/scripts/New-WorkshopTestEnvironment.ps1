<#
.SYNOPSIS
Creates a fresh, reproducible clone for a GitHub Copilot CLI workshop test.

.EXAMPLE
./New-WorkshopTestEnvironment.ps1 -SourcePath C:\src\workshop -Ref main
#>
[CmdletBinding()]
param(
    [Parameter()]
    [string] $SourcePath,

    [Parameter()]
    [string] $Ref = 'HEAD',

    [Parameter()]
    [string] $DestinationPath
)

$ErrorActionPreference = 'Stop'

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw 'Git is required but was not found on PATH.'
}

if (-not $SourcePath) {
    $SourcePath = (& git rev-parse --show-toplevel 2>$null)
    if ($LASTEXITCODE -ne 0 -or -not $SourcePath) {
        throw 'Specify -SourcePath or run this script inside a Git repository.'
    }
}

$isLocalSource = Test-Path -LiteralPath $SourcePath
$sourceDirty = $false
if ($isLocalSource) {
    $SourcePath = (Resolve-Path -LiteralPath $SourcePath).Path
    $sourceStatus = & git -C $SourcePath status --porcelain
    if ($LASTEXITCODE -ne 0) {
        throw "SourcePath is not a readable Git repository: $SourcePath"
    }

    $sourceDirty = [bool] $sourceStatus
    if ($sourceDirty) {
        Write-Warning 'The source worktree is dirty. The clone includes committed content only.'
    }
}

if (-not $DestinationPath) {
    $runId = [DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ')
    $DestinationPath = Join-Path ([System.IO.Path]::GetTempPath()) "workshop-cli-test-$runId"
}

if (Test-Path -LiteralPath $DestinationPath) {
    throw "DestinationPath already exists: $DestinationPath"
}

& git clone --no-hardlinks -- $SourcePath $DestinationPath
if ($LASTEXITCODE -ne 0) {
    throw 'Git clone failed.'
}

& git -C $DestinationPath checkout --detach $Ref
if ($LASTEXITCODE -ne 0) {
    throw "Unable to check out ref: $Ref"
}

$commit = & git -C $DestinationPath rev-parse HEAD
if ($LASTEXITCODE -ne 0) {
    throw 'Unable to determine the cloned commit.'
}

[pscustomobject]@{
    path = (Resolve-Path -LiteralPath $DestinationPath).Path
    commit = $commit
    source = $SourcePath
    sourceDirty = $sourceDirty
} | ConvertTo-Json