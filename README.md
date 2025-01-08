# Gemini API Proxy Worker

A Cloudflare Worker that proxies requests to the Gemini API, handling authentication through request headers.

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Deployment

### Prerequisites
- Cloudflare account
- Cloudflare API token with Workers edit permissions
- Gemini API key

### Steps

1. Add your Cloudflare API token as a GitHub secret:
   - Go to your GitHub repository settings
   - Add a new secret named `CLOUDFLARE_API_TOKEN`
   - Paste your Cloudflare API token

2. Push to main branch to trigger deployment:
   ```bash
   git push origin main
   ```

## Usage

Make requests to your worker's URL with the following header:
- `x-gemini-api-key`: Your Gemini API key

Example request:
```bash
curl -X POST \
  https://your-worker.example.com/v1/models/gemini-pro:generateContent \
  -H 'x-gemini-api-key: YOUR_API_KEY' \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Hello, how are you?"
      }]
    }]
  }'
```

## Configuration

The worker can be configured through the following files:
- `wrangler.toml`: Cloudflare Worker configuration
- `.github/workflows/deploy.yml`: GitHub Actions deployment workflow

## Local Development

To run the worker locally:
```bash
npm run dev
```

This will start a local development server at `localhost:8787`
