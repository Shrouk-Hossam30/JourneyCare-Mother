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

# 🔗 Project Resources

## 📦 GitHub Repository

Source Code:

**https://github.com/rabea-shaban/JourneyCare-Mother**

---

## 🎨 UI Design

Live UI Preview:

**https://journey-care-ui.vercel.app/**

This design serves as the primary UI/UX reference for the project. All new pages and components should follow the same design system, color palette, spacing, typography, and responsive behavior.

---

# 🚀 Development Workflow

This project follows a **Git Flow** workflow to ensure smooth collaboration between all team members.

## 🌿 Branch Structure

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

- **main** → Production / Final Stable Version
- **develop** → Integration Branch
- **feature/\*** → Individual Development Branches

---

# 📥 Step 1: Clone Repository

Clone the repository:

```bash
git clone https://github.com/rabea-shaban/JourneyCare-Mother.git
```

Move into the project directory:

```bash
cd JourneyCare-Mother
```

---

# 🌱 Step 2: Switch to Develop

Never start working directly on **main**.

```bash
git checkout develop
git pull origin develop
```

---

# 🌿 Step 3: Switch to Your Feature Branch

### 👨‍💻 Rabea

```bash
git checkout feature/rabea
```

### 👩‍💻 Shorouk

```bash
git checkout feature/shorouk
```

### 👨‍💻 Zaghloul

```bash
git checkout feature/zaghloul
```

### 👩‍💻 Mai

```bash
git checkout feature/mai
```

---

# 📦 Step 4: Install Dependencies

## Backend

```bash
cd backend
npm install
```

or

```bash
yarn
```

---

## Frontend

```bash
cd frontend
npm install
```

or

```bash
yarn
```

---

# ⚙️ Step 5: Configure Environment Variables

## Backend

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY
```

---

## Frontend

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=http://localhost:5000/api
```

---

# ▶️ Step 6: Run the Project

## Backend

```bash
cd backend
npm run dev
```

---

## Frontend

```bash
cd frontend
npm run dev
```

---

# 💻 Step 7: Start Development

Work **only** on your own feature branch.

❌ Never commit directly to:

- `main`
- `develop`

---

# 💾 Step 8: Commit Your Changes

```bash
git add .
git commit -m "Complete Mother Profile Module"
```

Example:

```bash
git commit -m "Complete Doctor Dashboard"
```

---

# ☁️ Step 9: Push Your Branch

Example:

```bash
git push origin feature/shorouk
```

Replace the branch name with your own branch.

---

# 🔀 Step 10: Create a Pull Request

After finishing your feature:

```
feature/<your-name>
        │
        ▼
     develop
```

**Do NOT create a Pull Request to `main`.**

---

# 🔄 Step 11: Get Latest Updates

After your Pull Request is merged into **develop**:

```bash
git checkout develop
git pull origin develop
```

Switch back to your branch:

```bash
git checkout feature/<your-name>
```

Merge the latest develop changes:

```bash
git merge develop
```

---

# 👨‍💻 Team Responsibilities

| Member       | Branch             | Responsibilities                                                |
| ------------ | ------------------ | --------------------------------------------------------------- |
| **Rabea**    | `feature/rabea`    | Core, Authentication, Admin, Blog, Task, Notification           |
| **Shorouk**  | `feature/shorouk`  | Mother Module, Child Module, Growth Dashboard                   |
| **Zaghloul** | `feature/zaghloul` | Clinical System, Appointments, Payment, Queue, Chat, Video Call |
| **Mai**      | `feature/mai`      | Doctor Module, Doctor Dashboard, Visit Report, Prescription     |

---

# 📌 Git Workflow

```
                main
                  ▲
                  │
              develop
      ┌────────┼────────┬────────┐
      │        │        │        │
 feature/  feature/  feature/  feature/
 rabea    shorouk   zaghloul     mai
```

---

# 📋 Team Rules

- ✅ Work only on your own feature branch.
- ✅ Pull the latest changes from `develop` before starting work.
- ✅ Push only to your own feature branch.
- ✅ Create Pull Requests only to `develop`.
- ❌ Never push directly to `main`.
- ❌ Never push directly to `develop`.
- ✅ All Pull Requests must be reviewed and approved by the **Tech Lead (Rabea)** before merging.

---

## Happy Coding! 🚀

## 📌 Development Guidelines

- Follow the existing UI design.
- Keep the design consistent across all pages.
- Reuse components whenever possible.
- Do not change the design language without team discussion.
- Make all pages responsive.
- Use the same colors, spacing, typography, and component styles throughout the application.
-

# 👨‍💻 Development Team

| Name         | Responsibility                                                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rabea**    | **Tech Lead**, Backend Core, Authentication, Admin Module (Frontend + Backend), Project Architecture, Git Management, Integration, Code Review |
| **Shorouk**  | Mother & Child Module (Frontend + Backend)                                                                                                     |
| **Zaghloul** | Clinical Module (Appointments, Payments, Queue, Chat, Video Call) (Frontend + Backend)                                                         |
| **Mai**      | Doctor Module (Frontend + Backend)                                                                                                             |

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
- View Appointment daily/weekly
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

<!-- Test Push for Zaghloul Feature Branch -->
