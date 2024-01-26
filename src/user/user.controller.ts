import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto';
import { deleteUserDto } from './dto/deleteUser.dto';
import { loginUserDto } from './dto/loginUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Post('login')
  login(@Body() user: loginUserDto) {
    return this.userService.login(user);
  }
  @Post('register')
  register(@Body() createUserDto: createUserDto): Promise<createUserDto> {
    return this.userService.register(createUserDto);
  }
  @Delete()
  delete(@Body() user: deleteUserDto): string {
    this.userService.delete(user.email);
    return 'User deleted';
  }
}
