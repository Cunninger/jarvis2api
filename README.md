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
