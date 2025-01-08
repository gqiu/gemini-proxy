export default {
  async fetch(request, env) {
    try {
      // Parse the incoming request
      const url = new URL(request.url);
      const path = url.pathname;
      const method = request.method;
      
      // Get API key from URL parameters
      const apiKey = url.searchParams.get('key');
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'Missing key parameter in URL' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Forward to Gemini API with original URL parameters
      const geminiUrl = `https://generativelanguage.googleapis.com${path}${url.search}`;
      const headers = new Headers(request.headers);
      headers.set('x-goog-api-key', apiKey);
      
      const modifiedRequest = new Request(geminiUrl, {
        method: method,
        headers: headers,
        body: method !== 'GET' ? request.body : undefined
      });

      return await fetch(modifiedRequest);
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}
