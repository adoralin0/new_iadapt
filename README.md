iadapt-redesign — local static server

This repository contains a built static site under `iadapt-redesign/dist`.

To serve the site locally (no build step required):

```powershell
# from the workspace root
npm start
# or
node server.js
```

The server will serve the files from `iadapt-redesign/dist` on port 8080 by default.

If you prefer a quick Python server instead:

```powershell
cd iadapt-redesign/iadapt-redesign/dist
python -m http.server 8000
```

Fetch LinkedIn posts for the News & Events page
------------------------------------------------

You can populate `iadapt-redesign/dist/data/linkedin.json` by running the provided fetch script. This requires a LinkedIn API access token and the numeric organization ID.

1. Set environment variables (PowerShell):

```powershell
$env:LINKEDIN_ACCESS_TOKEN = 'your_token_here'
$env:LINKEDIN_ORG_ID = '123456'
```

2. Run the fetch script (from the workspace root):

```powershell
npm run build:data
```

This writes `iadapt-redesign/dist/data/linkedin.json` which the News & Events page consumes. Do not share your access token publicly.

If you prefer the server to fetch at runtime, I can add a proxy endpoint to `server.js` — but that requires securely storing the token on the server and is not recommended for public deployments without extra safeguards.

