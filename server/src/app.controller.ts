import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { AppService } from './app.service'
import { AuthGuard } from './auth.guard'
import { Example } from './example'
import { MonitorRequestOptions } from './server-info'
import { TokenService } from './token.service'

@Controller()
@ApiQuery({ name: 'token', description: 'Auth token, get this from console log', required: true })
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly tokenService: TokenService, private readonly appService: AppService) {}

  @ApiOperation({ tags: ['Server'], description: 'Update request token' })
  @Get('/token')
  updateToken(@Query('newToken') newToken: string) {
    this.tokenService.updateToken(newToken)
    return { msg: 'ok' }
  }

  @ApiOperation({ tags: ['Server'], description: 'Backup server data from client' })
  @Post('/servers')
  saveServers(@Body() serverData: any) {
    this.appService.saveServers(serverData)
    return { msg: 'ok' }
  }

  @ApiOperation({ tags: ['Server'], description: 'Get ' })
  @ApiResponse({ example: Example.servers })
  @Get('/servers')
  getServers() {
    return this.appService.getServers()
  }

  @ApiOperation({ tags: ['Server'], description: 'Http request forwarder' })
  @Post('')
  async request(@Body() body: MonitorRequestOptions) {
    return this.appService.request(body)
  }
}
