# 🚀 SprintFlow AI

> AI-Powered Task Management System built with Angular, Node.js, Express, and MongoDB.

![Angular](https://img.shields.io/badge/Angular-21-red)
![Node](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📖 Project Overview

SprintFlow AI is a lightweight project and task management application.

The application enables users to authenticate securely, manage tasks through a clean and responsive interface, and organize their workflow efficiently.



---

## ✨ Features

### Authentication

- Secure JWT Login
- Persistent Authentication
- Logout
- Protected Routes

### Task Management

- Create Tasks
- View Tasks
- Update Tasks
- Delete Tasks
- Task Status
- Priority Levels
- Due Dates

### Dashboard

- Statistics Cards
- Task Overview
- Search
- Responsive Layout
- Modern Neumorphic UI

### Responsive Design

- Desktop
- Tablet
- Mobile

---

## 🛠 Tech Stack

### Frontend

- Angular 21
- TypeScript
- Tailwind CSS
- SCSS
- Lucide Angular Icons
- Angular Signals
- Angular Router

### Backend

- Node.js
- Express.js
- JWT Authentication
- Mongoose
- bcryptjs

### Database

- MongoDB Atlas

### Deployment

- Frontend: Vercel
- Backend: Render

---

# 📂 Project Structure

```
SprintFlow-AI/

├── client/
│
│   ├── src/
│   │
│   ├── app/
│   │
│   ├── core/
│   │
│   ├── features/
│   │
│   ├── shared/
│   │
│   └── assets/
│
├── server/
│
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
│
└── README.md
```

---

# 🏗 Architecture

```
Angular Frontend
        │
        │ REST API
        ▼
Node.js + Express
        │
        ▼
MongoDB Atlas
```

---

# 🔐 Authentication Flow

```
User Login

↓

JWT Token Generated

↓

Stored in Local Storage

↓

Protected API Requests

↓

Authentication Middleware

↓

Access Granted
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/SprintFlow-AI.git
```

---

## Backend

```bash
cd server

npm install

npm run dev
```

---

## Frontend

```bash
cd client

npm install

ng serve
```

---

## Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY
```

---

# 🚀 Deployment

## Frontend

Vercel

## Backend

Render

## Database

MongoDB Atlas

---

# 🌐 Live Demo

https://sprintflow-one.vercel.app


# 📡 API Endpoints

## Authentication

POST

```
/api/auth/login
```

PUT

```
/api/auth/profile
```

---

## Tasks

GET

```
/api/tasks
```

POST

```
/api/tasks
```

PUT

```
/api/tasks/:id
```

DELETE

```
/api/tasks/:id
```

---

# 🤖 AI Usage

This project was developed using AI-assisted software engineering practices.

AI was used to support:

- UI planning
- Component architecture
- API design discussions
- Debugging
- Code reviews
- Refactoring
- Documentation generation

All generated code was reviewed, understood, modified, tested, and integrated manually before inclusion in the project.


---
## 🤖 AI Tools Used

The following AI tools were used during the development process:

- ChatGPT – architecture planning, debugging, documentation, code reviews, deployment guidance, and engineering discussions.
- Google Stitch - used for designing ui  as per my idea
- Antigravity  – component scaffolding, repetitive code generation, and frontend refinement, code development.

## Challenges  Faced
- Database integration
- Refining ui's
- API testing and correction
- Authentication settings
# 🎯 Engineering Decisions

Some key engineering decisions include:

- Angular Standalone Components
- JWT-based Authentication
- Modular Backend Architecture
- RESTful API Design
- Reusable UI Components
- Responsive Dashboard
- Centralized API Configuration
- MongoDB Atlas Cloud Database
- Separate Frontend and Backend Deployments

---

# 🔮 Future Improvements

- AI-powered task suggestions
- AI priority estimation
- Kanban board
- Team collaboration
- Role-based permissions
- File attachments
- Activity history
- Email notifications

---

# 📸 Screenshots

## Login

<img width="1914" height="903" alt="Screenshot 2026-07-16 234632" src="https://github.com/user-attachments/assets/eb97b449-39d8-4898-9888-23b2685fb1a4" />


## Dashboard

<img width="1914" height="907" alt="Screenshot 2026-07-16 234743" src="https://github.com/user-attachments/assets/733d4090-1af3-48d3-af2a-36073598e558" />


## Task Management

<img width="1918" height="907" alt="Screenshot 2026-07-16 234752" src="https://github.com/user-attachments/assets/389beae4-d039-47f5-92cd-69055dd3e1f7" />

## New Task 

<img width="1916" height="905" alt="Screenshot 2026-07-16 234832" src="https://github.com/user-attachments/assets/178926cd-afb4-4cfd-be05-65461b6a7cec" />



---

# 👨‍💻 Author

**Indrajith KS**

GitHub

https://github.com/indrajithkss

LinkedIn

https://www.linkedin.com/in/indrajith-ks-40aa62227/
---

