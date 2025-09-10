// src/lib/api.ts
import type { User, Post } from '../types';

const BASE = 'http://localhost:4000';

function prettyErrorMessage(raw: any): string {
 
  let msg: string | undefined;

  if (raw) {
    if (Array.isArray(raw.message)) msg = raw.message.join(', ');
    else if (typeof raw.message === 'string') msg = raw.message;
    else if (typeof raw.error === 'string') msg = raw.error;
  }

 
  if (msg?.toLowerCase().includes('property id should not exist')) {
    msg = "Güncelleme/oluşturma isteğinde 'id' alanını göndermeyin.";
  }

  return msg || 'İşlem başarısız oldu.';
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE}${path}`;
  const headers: HeadersInit = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    let friendly = `Hata ${res.status}`;
    try {
      const data = await res.json();
      friendly = prettyErrorMessage(data);
    } catch {
      
      try {
        const txt = await res.text();
        if (txt) friendly = txt;
      } catch {}
    }
    throw new Error(friendly);
  }

  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

/* ---------------- USERS ---------------- */
export const getUsers = () => request<User[]>('/users');

export const createUser = (body: Omit<User, 'id'>) =>
  request<User>('/users', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const updateUser = (user: User) =>
  request<User>(`/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });

export const deleteUser = (id: number) =>
  request<void>(`/users/${id}`, { method: 'DELETE' });

/* ---------------- POSTS ---------------- */
export const getPosts = (limit?: number) =>
  request<Post[]>(
    `/posts${limit ? `?limit=${limit}` : ''}`
  );

export const createPost = (body: Omit<Post, 'id'>) =>
  request<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const updatePost = (post: Post) =>
  request<Post>(`/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
  });

export const deletePost = (id: number) =>
  request<void>(`/posts/${id}`, { method: 'DELETE' });
