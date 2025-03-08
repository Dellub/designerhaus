import { Body, Controller, Post } from '@nestjs/common'
import type { AuthService } from './auth.service'
import type { CreateUserDto } from './dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto)
  }
}
