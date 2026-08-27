import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { addLinks, readLinks, renderBookmarks } from '../src/bookmark-store.js';

const link = { category: 'MCP', title: '<MCP guide>', url: 'https://learn.microsoft.com/mcp#overview', description: 'Use & verify' };

describe('bookmark store', () => {
  it('renders escaped, categorized Netscape bookmarks', () => {
    const html = renderBookmarks([link]);
    expect(html).toContain('<H3>MCP</H3>');
    expect(html).toContain('&lt;MCP guide&gt;');
    expect(html).toContain('https://learn.microsoft.com/mcp');
    expect(html).toContain('Use &amp; verify');
  });

  it('rejects non-HTTPS URLs', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'bookmark-mcp-'));
    await expect(addLinks(join(directory, 'bookmarks.html'), [{ ...link, url: 'http://example.com' }])).rejects.toThrow('HTTPS');
  });

  it('adds links and skips duplicates', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'bookmark-mcp-'));
    const filePath = join(directory, 'bookmarks.html');
    const first = await addLinks(filePath, [link]);
    const second = await addLinks(filePath, [{ ...link, title: 'Same URL' }]);
    expect(first.added).toHaveLength(1);
    expect(second.skipped).toHaveLength(1);
    expect(await readLinks(filePath)).toHaveLength(1);
    expect(await readFile(filePath, 'utf8')).toContain('Microsoft Student Accelerator');
  });
});
