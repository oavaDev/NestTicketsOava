import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto';
import {deleteUserDto} from "./dto/deleteUser.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Post()
  create(@Body() createUserDto: createUserDto): Promise<createUserDto> {
    return this.userService.create(createUserDto);
  }
  @Delete()
  delete(@Body() user: deleteUserDto): string {
    this.userService.delete(user.email);
    return 'User deleted';
  }
}
