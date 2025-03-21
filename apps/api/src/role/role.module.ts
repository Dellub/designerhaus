import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { EmailModule } from '../email/email.module'
import { PrismaModule } from '../prisma/prisma.module'
import { RoleRouter } from './role.router'
import { RoleService } from './role.service'

@Module({
  imports: [AuthModule, PrismaModule, EmailModule],
  providers: [RoleService, RoleRouter],
  exports: [RoleService, RoleRouter],
})
export class RoleModule {}
