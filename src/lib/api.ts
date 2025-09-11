// src/lib/api.ts
import type { User, Post } from "../types";

const BASE = "http://localhost:4000";

function prettyErrorMessage(raw: unknown): string {
  let msg: string | undefined;

  if (typeof raw === "object" && raw !== null) {
    const r = raw as { message?: unknown; error?: unknown };
    if (Array.isArray(r.message)) msg = r.message.join(", ");
    else if (typeof r.message === "string") msg = r.message;
    else if (typeof r.error === "string") msg = r.error;
  }

  // Nest class-validator özel mesaj düzeltmesi
  if (msg?.toLowerCase().includes("property id should not exist")) {
    msg = "Güncelleme/oluşturma isteğinde 'id' alanını göndermeyin.";
  }

  return msg || "İşlem başarısız oldu.";
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE}${path}`;
  const headers: HeadersInit = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    let friendly = `Hata ${res.status}`;

    // Önce JSON dene, olmazsa düz metin dene — boş catch yok
    const json = await res
      .clone()
      .json()
      .catch(() => null as unknown);
    if (json) {
      friendly = prettyErrorMessage(json);
    } else {
      const txt = await res.text().catch(() => "");
      if (txt) friendly = txt;
    }

    throw new Error(friendly);
  }

  if (res.status === 204) {
    // No Content
    return undefined as unknown as T;
  }

  return (await res.json()) as T;
}

/* ---------------- USERS ---------------- */
export const getUsers = () => request<User[]>("/users");

export const createUser = (body: Omit<User, "id">) =>
  request<User>("/users", {
    method: "POST" as HttpMethod,
    body: JSON.stringify(body),
  });

export const updateUser = (user: User) =>
  request<User>(`/users/${user.id}`, {
    method: "PUT" as HttpMethod,
    body: JSON.stringify(user),
  });

export const deleteUser = (id: number) =>
  request<void>(`/users/${id}`, { method: "DELETE" as HttpMethod });

/* ---------------- POSTS ---------------- */
export const getPosts = (limit?: number) =>
  request<Post[]>(`/posts${limit ? `?limit=${limit}` : ""}`);

export const createPost = (body: Omit<Post, "id">) =>
  request<Post>("/posts", {
    method: "POST" as HttpMethod,
    body: JSON.stringify(body),
  });

export const updatePost = (post: Post) =>
  request<Post>(`/posts/${post.id}`, {
    method: "PUT" as HttpMethod,
    body: JSON.stringify(post),
  });

export const deletePost = (id: number) =>
  request<void>(`/posts/${id}`, { method: "DELETE" as HttpMethod });
