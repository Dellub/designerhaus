import { Global, Module } from '@nestjs/common'
import { RoleModule } from '../role/role.module'
import { UserModule } from '../user/user.module'
import { TrpcRouter } from './trpc.router'
import { TrpcService } from './trpc.service'

@Global()
@Module({
  imports: [UserModule, RoleModule],
  controllers: [],
  providers: [TrpcService, TrpcRouter],
  exports: [TrpcService],
})
export class TrpcModule {}
