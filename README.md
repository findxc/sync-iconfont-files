A tool to download iconfont files in https://www.iconfont.cn .

## About EGG_SESS_ICONFONT

`EGG_SESS_ICONFONT` is a cookie and you can get the value in dev tools after login into https://www.iconfont.cn . `@findtools/sync-iconfont-files` uses `process.env.EGG_SESS_ICONFONT` to read the value, so you need to set it in your environment variables.

For safety concern, it is better that the login user only has check auth but no modify or delete auth.

PS: In dev tools cookies section, we can find that `EGG_SESS_ICONFONT` expires after 1 year. But I haven't waited for 1 whole year, so I don't know when it will really expire.

## How to use

1. add `EGG_SESS_ICONFONT` to your environment variables
2. run `npm i @findtools/sync-iconfont-files`
3. add a script, for example, `"iconfont": "sync-iconfont-files --projectId=xxx --directory src/iconfont"` to your `package.json` . In your iconfont project page url, you can get the value of projectId
4. run `npm run iconfont` to download files
