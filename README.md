# 👶 Journey Care Mother

A full-stack healthcare platform that connects **Mothers**, **Doctors**, **Children**, and **Administrators** in one integrated system.

---

## 👨‍💻 Development Team

| Name | Responsibility |
|------|----------------|
| **Rabea** | Tech Lead, Backend Core, Authentication, Project Architecture, Git Management |
| **Mai** | Mother & Child Module (Frontend + Backend) |
| **Shorouk** | Clinical System (Appointments, Payments, Chat, Queue, Video) |
| **Zaghloul** | Doctor Module & Admin Module (Frontend + Backend) |

---

# 🌳 Git Workflow

Each team member **MUST** work on their own branch.

Do **NOT** commit directly to the `main` branch.

Branch naming:

```bash
feature/rabea
feature/mai
feature/shorouk
feature/zaghloul
```

---

## Workflow

### Clone Repository

```bash
git clone <repository-url>
```

---

### Create Your Branch

```bash
git checkout -b feature/your-name
```

Example

```bash
git checkout -b feature/rabea
```

---

### Work on your assigned module

Commit frequently.

Example:

```bash
git add .

git commit -m "Add login page"

git push origin feature/rabea
```

---

### Open Pull Request

After finishing your task:

- Push your branch
- Open Pull Request
- Wait for review
- Merge into `develop`

---

# 🚫 Rules

- ❌ Never push directly to `main`
- ❌ Never modify another member's module without permission
- ✅ Pull latest changes before starting work
- ✅ Commit frequently
- ✅ Use meaningful commit messages

---

# 📁 Project Modules

## 👨‍💻 Rabea

- Backend Core
- Authentication
- Middleware
- Config
- Project Architecture
- Git Management
- Integration
- Bug Fixes

---

## 👩 Mai

### Frontend

- Mother Dashboard
- Child Pages
- Growth Dashboard
- Blogs
- Tasks

### Backend

- Mother APIs
- Child APIs
- Growth APIs
- Blog APIs
- Task APIs

---

## 👩 Shorouk

### Frontend

- Booking
- Appointments
- Chat
- Queue
- Video Call

### Backend

- Appointment APIs
- Payment APIs
- Chat APIs
- Socket.IO
- Queue Engine

---

## 👨 Zaghloul

### Frontend

- Doctor Dashboard
- Admin Dashboard

### Backend

- Doctor APIs
- Availability APIs
- Visit Report
- Prescription
- Review APIs
- Admin APIs

---

# 📌 Main Branches

```text
main
│
└── develop
     │
     ├── feature/rabea
     ├── feature/mai
     ├── feature/shorouk
     └── feature/zaghloul
```

---

# 📌 Commit Message Examples

```bash
git commit -m "Create authentication module"

git commit -m "Build mother dashboard"

git commit -m "Add appointment APIs"

git commit -m "Create doctor profile page"
```

---

# ❤️ Good Luck Team
Let's build an amazing graduation project together 🚀
