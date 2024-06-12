export default {
    async fetch(request, env) {
  
      const url = new URL(request.url);
      const prompt = url.searchParams.get('prompt');
  
      if (!prompt) {
        return new Response("Please fill prompt", {
          status: 400,
          headers: {
            'content-type': 'text/plain'
          }
        });
      }
  
      const inputs = {
        prompt: prompt
      };
  
      const response = await env.AI.run(
        '@cf/stabilityai/stable-diffusion-xl-base-1.0',
        inputs
      );
  
      return new Response(response, {
        headers: {
          'content-type': 'image/png',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  };