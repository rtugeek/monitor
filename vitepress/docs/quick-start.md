# 快速上手

## 服务器安装

### PM2部署

安装PM2
```shell
npm install -g pm2
```
克隆代码并打包
```shell
git clone --depth 1 https://github.com/rtugeek/monitor.git
# 切换到server目录
cd monitor/server
# 安装依赖
pnpm install 
# 构建打包
pnpm run build
# 启动服务
pm2 start
```

`服务端口` 和 `base path` 可以在 **ecosystem.config.js** 自定义
```javascript
module.exports = {
  apps: [{
    name: 'MonitorServer',
    script: './dist/main.js',
    watch: [
      '.',
    ],
    restart_delay: 5000,
    max_restarts: 5,
    autorestart: true,
    env: {
      PORT: 5549,                 👈server port
      BASE_PATH: '/api/monitor',  👈base path
    },
    ignore_watch: [
      'node_modules',
      'pnpm-lock.yaml',
    ],
  }],
}
```



## 前端添加服务器

打开[前端页面](https://rtugeek.github.io/monitor/#/)，点击`添加服务器`，将`API Url`和`API Token`填入对应位置，点击保存即可。

![Edit Server](screenshot/edit_server.png)



## Nginx 配置示例

```nginx configuration
location ~ ^/api/monitor/{
    proxy_pass http://localhost:5549; 
    proxy_connect_timeout 300s;
    proxy_send_timeout 900;
    proxy_read_timeout 900;
    proxy_buffer_size 32k;
    proxy_buffers 4 64k;
    proxy_busy_buffers_size 128k;
    proxy_redirect off;
    proxy_hide_header Vary;
    proxy_set_header Accept-Encoding '';
    proxy_set_header Referer $http_referer;
    proxy_set_header Cookie $http_cookie;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```