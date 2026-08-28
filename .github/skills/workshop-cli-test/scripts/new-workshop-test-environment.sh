#!/usr/bin/env bash
# Creates a fresh, reproducible clone for a GitHub Copilot CLI workshop test.
# Usage: ./new-workshop-test-environment.sh [--source PATH_OR_URL] [--ref REF] [--destination PATH]
set -eu

source_path=""
ref="HEAD"
destination_path=""

while [ "$#" -gt 0 ]; do
    case "$1" in
        --source)
            source_path="$2"
            shift 2
            ;;
        --ref)
            ref="$2"
            shift 2
            ;;
        --destination)
            destination_path="$2"
            shift 2
            ;;
        *)
            printf 'Unknown argument: %s\n' "$1" >&2
            exit 2
            ;;
    esac
done

if ! command -v git >/dev/null 2>&1; then
    printf 'Git is required but was not found on PATH.\n' >&2
    exit 1
fi

if [ -z "$source_path" ]; then
    if ! source_path="$(git rev-parse --show-toplevel 2>/dev/null)"; then
        printf 'Specify --source or run this script inside a Git repository.\n' >&2
        exit 1
    fi
fi

source_dirty=false
if [ -d "$source_path" ]; then
    source_path="$(cd "$source_path" && pwd)"
    if ! git -C "$source_path" status --porcelain >/dev/null 2>&1; then
        printf 'Source is not a readable Git repository: %s\n' "$source_path" >&2
        exit 1
    fi
    if [ -n "$(git -C "$source_path" status --porcelain)" ]; then
        source_dirty=true
        printf 'Warning: source worktree is dirty; the clone includes committed content only.\n' >&2
    fi
fi

if [ -z "$destination_path" ]; then
    destination_path="$(mktemp -d "${TMPDIR:-/tmp}/workshop-cli-test.XXXXXX")"
    rmdir "$destination_path"
fi

if [ -e "$destination_path" ]; then
    printf 'Destination already exists: %s\n' "$destination_path" >&2
    exit 1
fi

git clone --no-hardlinks -- "$source_path" "$destination_path"
git -C "$destination_path" checkout --detach "$ref"
commit="$(git -C "$destination_path" rev-parse HEAD)"
destination_path="$(cd "$destination_path" && pwd)"

printf 'path=%s\n' "$destination_path"
printf 'commit=%s\n' "$commit"
printf 'source=%s\n' "$source_path"
printf 'sourceDirty=%s\n' "$source_dirty"