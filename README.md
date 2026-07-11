# 👶 Journey Care Mother

A full-stack healthcare platform that connects **Mothers**, **Doctors**, **Children**, and **Administrators** in one integrated healthcare system.

The platform helps mothers manage pregnancy and child healthcare, book appointments with doctors, communicate in real-time, and receive medical follow-ups through one unified application.

---

# 🚀 Tech Stack

## Frontend

- React.js
- Vite
- JavaScript (ES6+)
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- Recharts
- Socket.IO Client

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO
- Multer
- Joi Validation
- Bcrypt

---

# 👨‍💻 Development Team

| Name | Responsibility |
|------|----------------|
| **Rabea** | **Tech Lead**, Backend Core, Authentication, Admin Module (Frontend + Backend), Project Architecture, Git Management, Integration, Code Review |
| **Shorouk** | Mother & Child Module (Frontend + Backend) |
| **Zaghloul** | Clinical Module (Appointments, Payments, Queue, Chat, Video Call) (Frontend + Backend) |
| **Mai** | Doctor Module (Frontend + Backend) |

---

# 📁 Project Modules

## 👨‍💻 Rabea (Tech Lead)

### Backend

- Project Structure
- Server Configuration
- Database Configuration
- Authentication
- Authorization
- JWT
- Middleware
- Route Protection
- Shared Utilities
- Global Error Handling

### Frontend

- Authentication Pages
- Admin Dashboard
- User Management
- Doctor Management
- Blog Management
- Task Management
- Reports
- Layouts
- Protected Routes

### Responsibilities

- Project Architecture
- Git Repository Management
- Merge Pull Requests
- Code Review
- Integration
- Final Deployment

---

## 👩 Shorouk

### Frontend

- Mother Dashboard
- Mother Profile
- Pregnancy
- Child Pages
- Growth Dashboard
- Blogs
- Tasks
- Notifications

### Backend

- Mother APIs
- Child APIs
- Growth APIs
- Vaccination APIs
- Blog APIs
- Task APIs

---

## 👨 Zaghloul

### Frontend

- Doctor Search
- Booking
- Appointments
- Queue Status
- Chat
- Video Call

### Backend

- Appointment APIs
- Queue Engine
- Payment APIs
- Chat APIs
- Socket.IO
- Notification Events

---

## 👩 Mai

### Frontend

- Doctor Dashboard
- Doctor Profile
- Availability
- Patients
- Visit Reports
- Prescriptions
- Reviews

### Backend

- Doctor APIs
- Availability APIs
- Visit Report APIs
- Prescription APIs
- Review APIs

---

# 🌳 Git Workflow

Every team member **MUST** work on their own branch.

Nobody should work directly on **main**.

---

## Main Branches

```
main
│
└── develop
     │
     ├── feature/rabea
     ├── feature/shorouk
     ├── feature/zaghloul
     └── feature/mai
```

---

# 📥 Clone Repository

```bash
git clone <repository-url>

cd Journey-Care-Mother
```

---

# 🌱 Create Your Branch

### Rabea

```bash
git checkout develop

git pull origin develop

git checkout -b feature/rabea
```

---

### Shorouk

```bash
git checkout develop

git pull origin develop

git checkout -b feature/shorouk
```

---

### Zaghloul

```bash
git checkout develop

git pull origin develop

git checkout -b feature/zaghloul
```

---

### Mai

```bash
git checkout develop

git pull origin develop

git checkout -b feature/mai
```

---

# 💻 Development Workflow

Before starting work

```bash
git checkout develop

git pull origin develop
```

Switch to your branch

```bash
git checkout feature/your-name
```

Work on your assigned module.

Commit your changes frequently.

Example:

```bash
git add .

git commit -m "Create login page"

git push origin feature/your-name
```

---

# 🔀 Pull Request

After finishing your task

1. Push your branch.
2. Open Pull Request.
3. Merge into **develop**.
4. Never merge directly into **main**.

---

# 📌 Commit Message Examples

Backend

```bash
git commit -m "Create authentication module"

git commit -m "Build appointment APIs"

git commit -m "Implement doctor profile"

git commit -m "Add JWT middleware"
```

Frontend

```bash
git commit -m "Build mother dashboard"

git commit -m "Create booking page"

git commit -m "Design doctor dashboard"

git commit -m "Implement admin reports"
```

Fixes

```bash
git commit -m "Fix login validation"

git commit -m "Resolve booking bug"

git commit -m "Improve dashboard UI"
```

---

# 🚫 Rules

- Never push directly to **main**
- Never modify another member's module without permission
- Pull latest changes before starting work
- Commit frequently
- Write meaningful commit messages
- Keep your code clean
- Resolve conflicts before opening Pull Request

---

# 📂 Backend Structure

```
src
│
├── config
├── middlewares
├── modules
├── routes
├── socket
├── utils
├── app.js
└── server.js
```

---

# 🎨 Frontend Structure

```
src
│
├── assets
├── components
├── context
├── hooks
├── layouts
├── pages
├── routes
├── services
├── utils
├── App.jsx
└── main.jsx
```

---

# 📋 Roles

## Admin

- Manage Users
- Manage Doctors
- Manage Blogs
- Manage Tasks
- Reports
- Dashboard

---

## Mother

- Pregnancy Tracking
- Child Management
- Growth Dashboard
- Booking
- Chat
- Tasks
- Blogs

---

## Doctor

- Manage Profile
- Manage Availability
- View Patients
- Write Prescriptions
- Visit Reports
- Chat

---

# 🎯 Project Goal

Build a modern healthcare platform that simplifies communication between mothers and doctors while providing complete pregnancy and child healthcare management.

---

# ❤️ Team

Good luck everyone 🚀

Let's build an amazing Graduation Project together.
