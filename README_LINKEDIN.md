Automating LinkedIn feed for News & Events

This repo includes a simple local JSON feed and a template script to fetch recent LinkedIn posts.

Files:
- `dist/data/linkedin.json` — sample feed consumed by the News & Events page.
- `scripts/fetch_linkedin.py` — template to call LinkedIn API and write the JSON feed.

How to automate:
1. Obtain a LinkedIn API access token and the organization numeric ID for `ufplanning`.
2. Set env vars:

```powershell
set LINKEDIN_ACCESS_TOKEN=your_token_here
set LINKEDIN_ORG_ID=123456
```

3. Run the script from the workspace root:

```powershell
python scripts/fetch_linkedin.py
```

4. Serve the site; `dist/news-events/index.html` will load `dist/data/linkedin.json`.

If you prefer not to use the API, manually edit `dist/data/linkedin.json` to add entries in the `posts` array.
