# SprintFlow AI - AI-Powered Task Management System

SprintFlow AI is a lightweight project & task management system designed for software teams. It provides a light-mode, modern dashboard featuring a soft dual-shadow **Neumorphic design theme** for a professional and premium user experience.

---

## 🚀 Tech Stack

### Frontend Client
* **Angular 21**: Leveraging Standalone components, Zoneless change detection, and reactive Signals.
* **Vanilla CSS**: Curated, custom soft shadow parameters (`styles.scss`).
* **Lucide Angular Icons**: Premium, clean vector iconography.

### Backend Server
* **Node.js & Express**: Scalable REST API architecture.
* **MongoDB & Mongoose**: Object modeling and persistent storage.
* **JSON Web Tokens (JWT)**: Secure user session separation.

---

## 📂 Project Directory Structure

```
SprintFlow-AI/
├── client/                     # Angular 21 Frontend Client
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Guards, interceptors, and data services
│   │   │   ├── features/       # Pages (Dashboard layout, Login portal, Settings form)
│   │   │   ├── layout/         # Base layout wrappers (Navbar, Sidebar)
│   │   │   └── shared/         # Reusable widgets (Badge, Button, Loader, Modal)
│   │   ├── index.html          # Shell layout & Google Font preconnects
│   │   └── styles.scss         # Global neumorphic variables & custom styling tokens
│   └── angular.json            # Client build configurations
│
└── server/                     # Node.js / Express REST API Backend
    ├── config/                 # MongoDB database connections
    ├── controllers/            # Authentication & Task CRUD logic controllers
    ├── middleware/             # Route-level JWT verification handlers
    ├── models/                 # Database schema models (User, Task)
    ├── routes/                 # Express Router endpoint definitions
    ├── utils/                  # Helper utilities (Token generators)
    ├── seed.js                 # Initial database seeding script
    └── server.js               # Main Express app initialization
```

---

## 🛠️ Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* [MongoDB](https://www.mongodb.com/) (running locally on port `27017` or using a cloud URI)

### 1. Backend Server Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/sprintflow
   JWT_SECRET=supersecretjwtkey12345
   ```
4. Seed default admin accounts (Optional):
   ```bash
   node seed.js
   ```
5. Launch development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Client Setup
1. Navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch development server:
   ```bash
   npm start
   ```
4. Access the web app at `http://localhost:4200` in your browser.

---

## 🌟 Key Features

1. **Private Dashboard Sandbox**: Multi-user accounts are supported with secure JWT session tracking. Each logged-in user can only read, create, edit, or delete their own data in MongoDB.
2. **Auto-Registration**: Entering any email and password on the login screen automatically registers you in the database if the user record does not exist.
3. **Reactive UI State Management**: Settings profile changes (name/email) propagate reactively across all header welcome greetings and avatars instantly without page reloads.
