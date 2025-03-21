import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { EmailModule } from '../email/email.module'
import { PrismaModule } from '../prisma/prisma.module'
import { UserRouter } from './user.router'
import { UserService } from './user.service'

@Module({
  imports: [AuthModule, PrismaModule, AuthModule, EmailModule],
  providers: [UserService, UserRouter],
  exports: [UserService, UserRouter],
})
export class UserModule {}
