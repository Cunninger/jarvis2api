# jarvis2api
使用此代码需要:
- 在Cloudflare Worker中创建一个KV命名空间（比如叫TOKEN_STORE ）
- 在Worker设置中绑定KV：
- 获取refreshToken
```
curl --location 'https://api.jarvis.cx/api/v1/auth/sign-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "xxx",
    "password": "xxx"
}'
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
