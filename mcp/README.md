# Awesome Finance Agents MCP server

Read-only [MCP](https://modelcontextprotocol.io) server for the list, running on Cloudflare Workers.

- Endpoint: `https://mcp.finance-agents.dev/mcp` (Streamable HTTP, stateless, no auth)
- Tools: `search_projects(query, chapter?, lang?, limit?)`, `list_chapters()`, `get_chapter(id, lang?)`, `get_project(name_or_url)`
- Data: fetched from `https://finance-agents.dev/projects.json` and the per-page `.md` files, cached for 10 minutes. Updating the READMEs updates the server; no redeploy needed.
- Limits: 60 requests per minute per IP.

## Client setup

Claude Code:

```sh
claude mcp add --transport http finance-agents https://mcp.finance-agents.dev/mcp
```

Cursor (`~/.cursor/mcp.json`):

```json
{ "mcpServers": { "finance-agents": { "url": "https://mcp.finance-agents.dev/mcp" } } }
```

Claude Desktop (`claude_desktop_config.json`):

```json
{ "mcpServers": { "finance-agents": { "command": "npx", "args": ["-y", "mcp-remote", "https://mcp.finance-agents.dev/mcp"] } } }
```

## Develop and deploy

Requires Node.js 22+.

```sh
cd mcp
npm ci
npm run dev        # http://localhost:8787/mcp
npm run typecheck
CLOUDFLARE_API_TOKEN=... npm run deploy
```

The token needs Workers Scripts: Edit and permission to add the `mcp.finance-agents.dev` custom domain on the `finance-agents.dev` zone. Deploys are manual; there is no CI workflow (it would need the token as a repository secret).
