# 🚀 Social Media Backend API

A scalable backend for a mini social media application inspired by TaskPlanet. This API enables user authentication, post creation, and interaction features like likes and comments, built using Node.js, Express, and MongoDB.

---

## 🌐 Live Backend

https://social-backend-2pe5.onrender.com/

---

## 📌 Features

* 🔐 User Authentication (Signup & Login)
* 🍪 Secure Cookie-Based Authentication (HTTP-only cookies)
* 📝 Create Posts (Text/Image)
* 🌍 Public Feed (All Users)
* ❤️ Like/Unlike Posts
* 💬 Comment on Posts
* 📊 Like & Comment Count
* 🧑‍🤝‍🧑 User-based interactions tracking

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JWT + Cookies
* **File Upload:** Multer
* **Deployment:** Render

---

## 📁 Project Structure

```
Backend/
│
├── config/        # Database connection
├── controllers/   # Business logic
├── middleware/    # Auth & other middleware
├── models/        # Mongoose schemas
├── routes/        # API routes
├── uploads/       # Image storage
├── script.js      # Entry point
├── package.json
```

---

## 🔑 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| POST   | /api/users/register | Register new user |
| POST   | /api/users/login    | Login user        |
| POST   | /api/users/logout   | Logout user       |
| GET    | /api/users/me       | Get current user  |

---

### 📝 Post Routes

| Method | Endpoint               | Description      |
| ------ | ---------------------- | ---------------- |
| POST   | /api/posts             | Create post      |
| GET    | /api/posts             | Get all posts    |
| PUT    | /api/posts/:id/like    | Like/Unlike post |
| POST   | /api/posts/:id/comment | Add comment      |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/backend-repo.git
cd backend-repo
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Create `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=your_secret_key
```

---

### 4️⃣ Run Server

```bash
npm start
```

---

## 🔐 Authentication Flow

* User logs in → JWT generated
* Token stored in **HTTP-only cookie**
* Protected routes verified using middleware
* `/me` endpoint checks authentication state

---

## 🌍 Deployment

* **Backend:** Render
* **Database:** MongoDB Atlas

---

## ⚠️ Important Notes

* CORS configured for frontend (Vercel)
* Cookies configured with:

  * `httpOnly: true`
  * `secure: true`
  * `sameSite: "none"`

---

## 🧠 Key Learnings

* Implemented secure authentication using cookies
* Managed cross-origin requests (CORS)
* Built scalable REST APIs
* Integrated file uploads using Multer
* Deployed full-stack app in production

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📧 Contact

**Dipak Ghuge**
Full Stack Developer (MERN)
