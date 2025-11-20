import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TokenService } from './token.service'

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
  providers: [TokenService, AppService],
})
export class AppModule {}
