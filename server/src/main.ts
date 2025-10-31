import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { TokenService } from './token.service'

process.on('uncaughtException', (_) => {

})

async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    return res
  }
  catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout}ms`)
    }
    throw err
  }
  finally {
    clearTimeout(id)
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('APP')
  app.enableCors() // 允许所有站点跨域请求

  const envPort = process.env.PORT?.trim()
  const port = envPort ?? 5549
  let basePath = process.env.BASE_PATH?.trim() ?? '/api/monitor'
  if (!basePath.startsWith('/')) {
    basePath = `/${basePath}`
  }
  app.setGlobalPrefix(basePath)
  const config = new DocumentBuilder()
    .setTitle('Monitor Server')
    .setDescription('A simple http server for monitor server status')
    .setVersion('1.0')
    .setContact('Neo Fu', 'https://widgetjs.cn', 'rtugeek@gmail.com')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  const docPath = `${basePath}/doc`.replace('//', '/')
  SwaggerModule.setup(docPath, app, documentFactory)

  await app.listen(port)

  const tokenService = app.get(TokenService)
  let host = '127.0.0.1'
  try {
    const res = await fetchWithTimeout('https://ifconfig.co/ip')
    host = (await res.text()).trim()
  }
  catch (e) {

  }
  logger.log(`Server port: ${port}`)
  logger.log(`Add the follow token to http request header or search params`)
  logger.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
  logger.log(tokenService.token)
  logger.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑')
  logger.log(`Public api baseUrl http://${host}:${port}${basePath}`)
  logger.log(`Local api baseUrl http://127.0.0.1:${port}${basePath}`)
  logger.log(`Open http://${host}:${port}${docPath} to see the api doc`)
}
bootstrap()
