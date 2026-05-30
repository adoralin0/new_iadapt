iadapt-redesign — local static server

This repository contains a built static site under `iadapt-redesign/dist`.

## GitHub Pages (live site)

1. Push this repo to GitHub.
2. Open **Settings → Pages**.
3. Set **Build and deployment → Source** to **GitHub Actions**.
4. After the deploy workflow finishes, your site is at:

   `https://<your-username>.github.io/new_iadapt/`

No redirects or extra scripts are required. GitHub Actions publishes the files in `iadapt-redesign/dist` as the site root.

## Run locally

```powershell
npm start
```

The server serves `iadapt-redesign/dist` on port 8080 (or the next free port).

## Fetch LinkedIn posts

Set environment variables, then run:

```powershell
$env:LINKEDIN_ACCESS_TOKEN = 'your_token_here'
$env:LINKEDIN_ORG_ID = '123456'
npm run build:data
```

This writes `iadapt-redesign/dist/data/linkedin.json` for the News & Events page.
