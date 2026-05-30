"""
Template script to fetch recent organization shares from LinkedIn and write `dist/data/linkedin.json`.
Requires:
  - A LinkedIn API access token with the appropriate permissions.
  - The organization ID (numeric) for the LinkedIn company page (e.g., UF planning org id).

Set env vars before running:

  set LINKEDIN_ACCESS_TOKEN=your_token_here
  set LINKEDIN_ORG_ID=123456

Run:
  python scripts/fetch_linkedin.py

Notes:
- This is a template. LinkedIn's APIs and required permissions may change; consult LinkedIn docs.
"""
import os
import sys
import json
import requests
from datetime import datetime

TOKEN = os.environ.get('LINKEDIN_ACCESS_TOKEN')
ORG_ID = os.environ.get('LINKEDIN_ORG_ID')
OUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'iadapt-redesign', 'dist', 'data', 'linkedin.json')

if not TOKEN or not ORG_ID:
    print('Please set LINKEDIN_ACCESS_TOKEN and LINKEDIN_ORG_ID environment variables')
    sys.exit(1)

HEADERS = {'Authorization': f'Bearer {TOKEN}'}

# Endpoint to fetch shares for an organization. This may require special permissions.
URL = f'https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:organization:{ORG_ID}&sharesPerOwner=10'

resp = requests.get(URL, headers=HEADERS)
if resp.status_code != 200:
    print('LinkedIn API request failed:', resp.status_code, resp.text)
    sys.exit(1)

data = resp.json()
posts = []
for item in data.get('elements', []):
    text = ''
    if 'text' in item and isinstance(item['text'], dict):
        text = item['text'].get('text', '')
    created = item.get('created', {}).get('time')
    date = datetime.utcfromtimestamp(created/1000).strftime('%Y-%m-%d') if created else ''
    # LinkedIn does not provide a simple public URL for every share; link back to company page
    posts.append({
        'title': (text[:80] + '...') if text else 'LinkedIn post',
        'text': text,
        'date': date,
        'link': f'https://www.linkedin.com/company/{ORG_ID}/'
    })

os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
with open(OUT_FILE, 'w', encoding='utf-8') as f:
    json.dump({'posts': posts}, f, ensure_ascii=False, indent=2)

print('Written', OUT_FILE)
