import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Ertuğrul ', username: 'Dalgaç', email: 'edalg@april.biz' },
    { id: 2, name: 'Beyza Ece', username: 'Deniz', email: 'becede@melissa.tv' },
    { id: 3, name: 'Zeynep ', username: 'Şahan', email: 'zeyşah@yesenia.net' },
  ];
  private nextId = 4;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const u = this.users.find(x => x.id === id);
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  create(dto: CreateUserDto): User {
    const user: User = { id: this.nextId++, ...dto };
    this.users.unshift(user);
    return user;
  }

  update(id: number, dto: UpdateUserDto): User {
    const i = this.users.findIndex(x => x.id === id);
    if (i === -1) throw new NotFoundException('User not found');
    this.users[i] = { ...this.users[i], ...dto };
    return this.users[i];
  }

  remove(id: number): void {
    const before = this.users.length;
    this.users = this.users.filter(x => x.id !== id);
    if (this.users.length === before) throw new NotFoundException('User not found');
  }
}