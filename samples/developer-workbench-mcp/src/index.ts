import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { addLinks, getOutputPath, readLinks } from './bookmark-store.js';

const server = new McpServer({ name: 'developer-workbench-mcp', version: '0.1.0' });
const linkSchema = z.object({
  title: z.string().min(1).max(200),
  url: z.string().min(1),
  description: z.string().max(500).default(''),
  category: z.string().min(1).max(100)
});

server.tool('add_learning_links', 'Add one to five approved learning links to the local bookmark export.', {
  links: z.array(linkSchema).min(1).max(5)
}, async ({ links }) => {
  const result = await addLinks(getOutputPath(process.cwd()), links);
  return { content: [{ type: 'text', text: JSON.stringify({ output: 'output/developer-learning-bookmarks.html', added: result.added, skipped: result.skipped }, null, 2) }] };
});

server.tool('list_learning_links', 'List links already present in the local bookmark export.', {}, async () => {
  const links = await readLinks(getOutputPath(process.cwd()));
  return { content: [{ type: 'text', text: JSON.stringify({ count: links.length, links }, null, 2) }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
