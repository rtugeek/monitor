# PM2部署

安装PM2
```shell
npm install -g pm2
```
克隆代码并打包
```shell
git clone https://github.com/rtugeek/monitor.git
# 切换到server目录
cd server
# 安装依赖
pnpm install 
# 构建打包
pnpm run build

```
启动服务
```shell
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
