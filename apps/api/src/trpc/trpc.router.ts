import { type INestApplication, Injectable } from '@nestjs/common'
import * as trpcExpress from '@trpc/server/adapters/express'
import type { RoleRouter } from '../role/role.router'
import { type TrpcService, createContext } from '../trpc/trpc.service'
import type { UserRouter } from '../user/user.router'

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userRouter: UserRouter,
    private readonly roleRouter: RoleRouter,
  ) {}

  appRouter = this.trpcService.trpc.router({
    ...this.userRouter.apply(),
    ...this.roleRouter.apply(),
  })

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext,
      }),
    )
  }
}

export type AppRouter = TrpcRouter[`appRouter`]
