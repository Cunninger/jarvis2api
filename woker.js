const API_BASE = 'https://api.jarvis.cx';
const TOKEN_REFRESH_INTERVAL = 25 * 60 * 1000; // 25分钟，单位毫秒

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    try {
      const { refreshToken, message } = await request.json();
      
      if (!refreshToken) {
        return new Response(JSON.stringify({
          error: 'refreshToken is required'
        }), {
          status: 400,
          headers: corsHeaders()
        });
      }

      // 从KV中获取缓存的token信息
      let tokenInfo = await env.TOKEN_STORE.get(refreshToken, { type: 'json' });
      const now = Date.now();

      // 如果没有token或者token已经接近过期（25分钟），则刷新
      if (!tokenInfo || (now - tokenInfo.timestamp) >= TOKEN_REFRESH_INTERVAL) {
        // 获取新的access token
        const tokenResponse = await fetch(`${API_BASE}/api/v1/auth/refresh?refreshToken=${refreshToken}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to refresh token');
        }

        const tokenData = await tokenResponse.json();
        
        // 更新token信息到KV存储
        tokenInfo = {
          accessToken: tokenData.token.accessToken,
          timestamp: now
        };
        
        // 存储token信息，过期时间设置为30分钟
        await env.TOKEN_STORE.put(
          refreshToken, 
          JSON.stringify(tokenInfo), 
          { expirationTtl: 30 * 60 }
        );
      }

      // 使用access token发送聊天请求
      const chatResponse = await fetch(`${API_BASE}/api/v1/ai-chat/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenInfo.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: message || 'hello',
          metadata: {
            conversation: {
              messages: []
            }
          },
          assistant: {
            id: "gemini-1.5-pro-latest",
            model: "dify", 
            name: "Gemini 1.5 Pro"
          }
        })
      });

      const chatData = await chatResponse.json();
      return new Response(JSON.stringify(chatData), {
        headers: corsHeaders()
      });

    } catch (error) {
      return new Response(JSON.stringify({
        error: error.message
      }), {
        status: 500,
        headers: corsHeaders()
      });
    }
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
}

function handleCORS() {
  return new Response(null, {
    headers: corsHeaders()
  });
}
