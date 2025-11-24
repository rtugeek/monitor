# API
::: warning
每次请求必须在`请求头`或`查询参数`中加上Token，否则请求将无法通过身份验证。
:::
Token 在服务器启动时生成，可在控制台日志中查看。

示例控制台输出：

```shell{5}
[Nest] LOG [NestApplication] Nest application successfully started +1ms
[Nest] LOG [APP] Server port: 5549
[Nest] LOG [APP] Add the follow token to http request header or search params
[Nest] LOG [APP] ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
[Nest] LOG [APP] sjq2eqcob0irqvs7rm21oxyour_token 👈 token is here
[Nest] LOG [APP] ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
[Nest] LOG [APP] Open http://yourip:5549/api/monitor/doc to see the api doc
```

### 请求示例
获取系统信息的传参与[`systeminformation`](https://systeminformation.io/general.html)一致
#### 获取cpu信息
```http request
POST http://yourip:5549/api/monitor
Token: sjq2eqcob0irqvs7rm21oxyour_token
Content-Type: application/json

{
  "cpu": "*"
}
```

#### 获取mem信息
```http request
POST http://yourip:5549/api/monitor
Token: sjq2eqcob0irqvs7rm21oxyour_token
Content-Type: application/json

{
  "mem": "*"
}
```

#### 获取多个信息
```http request
POST http://yourip:5549/api/monitor
Token: sjq2eqcob0irqvs7rm21oxyour_token
Content-Type: application/json

{
  "mem": "*",
  "cpu": "speed,cores,manufacturer,processors",
  "processes": "*"
}
```

#### 重置 token

```http request
GET http://yourip:5549/api/monitor/token?newToken=your_new_token&token=old_token
```