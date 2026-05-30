iadapt-redesign — iAdapt Research Center website

The live site is static HTML in `iadapt-redesign/dist`.

## Publish to GitHub Pages

### One-time setup on GitHub

1. Push this repo to GitHub.
2. Open **Settings → Pages**.
3. Set **Build and deployment → Source** to **GitHub Actions**.

Every push to `main` runs the deploy workflow automatically.

### Your live URL

After deploy finishes:

**https://adoralin0.github.io/new_iadapt/**

Do **not** use `/iadapt-redesign/dist/` in the URL. That path is only inside the repo, not on the live site.

### Build locally before pushing (optional)

```powershell
npm run deploy
```

This copies `iadapt-redesign/dist` into `docs/` (what GitHub Pages publishes).

## Run locally

```powershell
npm start
```

Opens the site at http://localhost:8080

## Fetch LinkedIn posts

```powershell
$env:LINKEDIN_ACCESS_TOKEN = 'your_token_here'
$env:LINKEDIN_ORG_ID = '123456'
npm run build:data
```
