export default {
    async fetch(request, env) {
      if (request.method === 'POST') {
        // Parse the form data to get the uploaded file
        const formData = await request.formData();
        const audioFile = formData.get('audio');
  
        if (!audioFile) {
          return new Response('Audio file is required', { status: 400 });
        }
  
        const blob = await audioFile.arrayBuffer();
  
        const inputs = {
          audio: [...new Uint8Array(blob)]
        };
  
        // Replace '@cf/openai/whisper-tiny-en' with the appropriate model name as needed
        const response = await env.AI.run('@cf/openai/whisper-tiny-en', inputs);
  
        return new Response(JSON.stringify({ inputs, response }), {
          headers: {  
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
          },
          
        });
      }
  
      return new Response('Method not allowed', { status: 405 });
    }
  };
  