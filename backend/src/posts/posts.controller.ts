import { Body, Controller, Delete, Get, Param, Post as PostMethod, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  @Get()
  findAll(@Query('limit') limit?: string) {
    const n = limit ? Number(limit) : undefined;
    return this.posts.findAll(n);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posts.findOne(Number(id));
  }

  @PostMethod()
  create(@Body() body: CreatePostDto) {
    return this.posts.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.posts.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.posts.remove(Number(id));
    return { ok: true };
  }
}
