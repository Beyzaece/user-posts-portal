import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.findOne(Number(id));
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.users.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.users.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.users.remove(Number(id));
    return { ok: true };
  }
}