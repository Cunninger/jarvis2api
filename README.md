# jarvis2api
使用此代码需要:
- 在Cloudflare Worker中创建一个KV命名空间（比如叫TOKEN_STORE ）
- 在Worker设置中绑定KV：
- `curl` 获取 `refreshToken`,过期时间为1年
```
curl --location 'https://api.jarvis.cx/api/v1/auth/sign-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "xxx",
    "password": "xxx"
}'
```
- 目前列表中的模型，但是目前只有`Gemini 1.5 Pro`和`Gemini 1.5 Flash`可用。`cf worker` 代码中默认使用的是`Gemini 1.5 Pro`
```
{
    id: "gpt-4o",
    model: "dify",
    name: "GPT-4o"
},
{
    id: "gemini-1.5-pro-latest",
    model: "dify",
    name: "Gemini 1.5 Pro"
},
{
    id: "gemini-1.5-flash-latest",
    model: "dify",
    name: "Gemini 1.5 Flash"
},
{
    id: "gpt-4o-mini",
    model: "dify",
    name: "GPT-4o mini"
},
{
    id: "claude-3-haiku-20240307",
    model: "dify",
    name: "Claude 3 Haiku"
},
{
    id: "claude-3-5-sonnet-20240620",
    model: "dify",
    name: "Claude 3.5 Sonnet"
}
```

都路过了，顺手点一个吧，感谢你的star！

## 趋势
<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="https://api.star-history.com/svg?repos=cunninger/jarvis2api&type=Date&theme=dark"
  />
  <source
    media="(prefers-color-scheme: light)"
    srcset="https://api.star-history.com/svg?repos=cunninger/jarvis2api&type=Date"
  />
  <img
    alt="Star History Chart"
    src="https://api.star-history.com/svg?repos=cunninger/jarvis2api&type=Date"
  />
</picture>
