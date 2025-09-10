# User & Post Portal

Modern, güvenilir ve profesyonel bir yönetim arayüzü.  
Kullanıcılar ve gönderiler üzerinde **CRUD (Create, Read, Update, Delete)** işlemleri yapılabilir.  
React + TypeScript + TailwindCSS (frontend) ve NestJS (backend) teknolojileriyle geliştirilmiştir.  

---

## Özellikler
- Kullanıcı ekleme, düzenleme, silme  
- Gönderi ekleme, düzenleme, silme  
- Inline edit (tek tıkla düzenleme)  
- Hata/başarı mesajları için **Toast bildirimleri**  
- Modern, responsive ve temiz bir arayüz  

---

## 📦 Kurulum

### 1. Depoyu Klonla
```bash
git clone <repo-link>
cd web-assignment

2. Backend (NestJS)
cd backend
npm install
npm run start:dev

👉 Varsayılan port: http://localhost:4000
👉 Endpointler: /users, /posts


3. Frontend (React + Vite)

Ayrı bir terminalde:
cd frontend
npm install
npm run dev

🔗 API Endpointleri

Users
	•	GET /users
	•	GET /users/:id
	•	POST /users
	•	PUT /users/:id
	•	DELETE /users/:id

Posts
	•	GET /posts
	•	GET /posts/:id
	•	POST /posts
	•	PUT /posts/:id
	•	DELETE /posts/:id

🛠 Kullanılan Teknolojiler

Frontend
	•	React
	•	TypeScript
	•	Vite
	•	TailwindCSS

Backend
	•	NestJS
	•	TypeScript
	•	Class Validator / Transformer

📌 Notlar
	•	Backend 4000 portunda, Frontend 5173 portunda çalışır.
	•	Test için önce backend’i, sonra frontend’i başlatın.
	•	ESLint & Prettier desteğiyle kod standardı korunmuştur. 
---

## 📸 Ekran Görüntüleri

### 1. Ana Sayfa
![Home](C:\Masaüstü\örnekproje\web-assignment\public\home.png)

### 2. Users Sayfası
![Users](C:\Masaüstü\örnekproje\web-assignment\public\users.png)

### 3. Posts Sayfası
![Posts](C:\Masaüstü\örnekproje\web-assignment\public\posts.png)