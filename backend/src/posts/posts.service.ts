import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 1, title: 'Hello World', body: 'First post content', userId: 1 },
    { id: 2, title: 'Second Post', body: 'More content here', userId: 2 },
  ];
  private nextId = 3;

  // Listele
  findAll(limit?: number): Post[] {
    if (limit) return this.posts.slice(0, limit);
    return this.posts;
  }

  // Tek getir
  findOne(id: number): Post {
    const post = this.posts.find(x => x.id === id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  // Ekle
  create(dto: CreatePostDto): Post {
    const post: Post = { id: this.nextId++, ...dto };
    this.posts.unshift(post);
    return post;
  }

  // Güncelle
  update(id: number, dto: UpdatePostDto): Post {
    const i = this.posts.findIndex(x => x.id === id);
    if (i === -1) throw new NotFoundException('Post not found');
    this.posts[i] = { ...this.posts[i], ...dto };
    return this.posts[i];
  }

  // Sil
  remove(id: number): void {
    const len = this.posts.length;
    this.posts = this.posts.filter(x => x.id !== id);
    if (this.posts.length === len) throw new NotFoundException('Post not found');
  }
}
