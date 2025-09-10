import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  // örnek başlangıç verisi
 private posts: Post[] = [
  { id: 1, userId: 1, title: 'İlk gönderim', body: 'Bu sistemde ilk deneme gönderisi yapıldı.' },
  { id: 2, userId: 1, title: 'Merhaba Dünya', body: 'CRUD uygulaması başarıyla çalışıyor.' },
  { id: 3, userId: 2, title: 'Yeni Özellik', body: 'Inline edit ile veriler kolayca güncellenebilir.' },
];
  private nextId = 4;

  findAll(limit?: number): Post[] {
    if (limit && limit > 0) return this.posts.slice(0, limit);
    return this.posts;
  }

  findOne(id: number): Post {
    const p = this.posts.find(x => x.id === id);
    if (!p) throw new NotFoundException('Post not found');
    return p;
  }

  create(dto: CreatePostDto): Post {
    const post: Post = { id: this.nextId++, ...dto };
    this.posts.unshift(post);
    return post;
  }

  update(id: number, dto: UpdatePostDto): Post {
    const i = this.posts.findIndex(x => x.id === id);
    if (i === -1) throw new NotFoundException('Post not found');
    this.posts[i] = { ...this.posts[i], ...dto };
    return this.posts[i];
  }

  remove(id: number): void {
    const before = this.posts.length;
    this.posts = this.posts.filter(p => p.id !== id);
    if (this.posts.length === before) throw new NotFoundException('Post not found');
  }
}