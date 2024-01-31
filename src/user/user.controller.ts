import { Controller, Get, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { deleteUserDto } from './dto/deleteUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Delete()
  delete(@Body() user: deleteUserDto): string {
    this.userService.delete(user.email);
    return 'User deleted';
  }
}
