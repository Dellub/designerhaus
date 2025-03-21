import { Injectable } from '@nestjs/common'
import { InternalServerErrorException } from '@nestjs/common/exceptions'
import type { PrismaService } from '../prisma/prisma.service'
import type { RoleCreateDtoType, RoleFindAllDtoType, RoleUpdateDtoType } from './role.dto'

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(roleCreateDto: RoleCreateDtoType) {
    // create
    try {
      const role = await this.prismaService.role.create({
        data: {
          ...roleCreateDto,
        },
      })
      return role
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(roleUpdateDto: RoleUpdateDtoType) {
    try {
      const updatedRole = await this.prismaService.role.update({
        where: {
          id: roleUpdateDto.id,
        },
        data: { name: roleUpdateDto.name },
      })
      return updatedRole
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll(opts: RoleFindAllDtoType) {
    const records = await this.prismaService.role.findMany({
      skip: (opts.page - 1) * opts.perPage,
      take: opts.perPage,
      orderBy: {
        name: 'asc',
      },
    })
    const total = await this.prismaService.role.count()
    const lastPage = Math.ceil(total / opts.perPage)
    return {
      records,
      total,
      currentPage: opts.page,
      lastPage,
      perPage: opts.perPage,
    }
  }

  async findById(id: number) {
    return this.prismaService.role.findFirstOrThrow({
      where: { id },
    })
  }

  async remove(id: number | number[]) {
    let ids: number[] = []
    if (Array.isArray(id)) {
      ids = id
    } else if (typeof id === 'number') {
      ids = [id]
    }
    const output = []
    for (const id of ids) {
      output.push(
        // @ts-ignore
        await this.prismaService.role.delete({
          where: {
            id: id,
          },
        }),
      )
    }
    return output
  }
}
