export default {
    async fetch(request, env) {
      // Enable CORS
      const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*'
      });
  
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers });
      }
  
      if (request.method === 'GET') {
        // Extract query parameters
        const url = new URL(request.url);
        const prompt = url.searchParams.get('prompt') || 'Tell me about Cloudflare';
  
        const tasks = [];
  
        // prompt - simple completion style input
        let simple = {
          prompt: prompt
        };
        let response = await env.AI.run('@cf/meta/llama-3-8b-instruct', simple);
        tasks.push({ inputs: simple, response });
  
        return new Response(JSON.stringify(tasks), { headers });
      } else {
        return new Response('Method not allowed', { status: 405, headers });
      }
    }
  };
  