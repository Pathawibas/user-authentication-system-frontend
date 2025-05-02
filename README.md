# 🧑‍💻 User Authentication System

A simple frontend authentication system built with **React Router v7**, **Vite**, **TypeScript**, **Tailwind CSS**, and **localStorage**.

This project is designed for training frontend developers to understand core authentication workflows like register, login, and protected routes.

---

## 🚀 Tech Stack

- **Frontend Framework**: React (with Vite + TypeScript)
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Password Hashing**: bcryptjs
- **Data Storage**: localStorage (simulating backend)
- **Token Handling**: Base64 token stored in `localStorage`

---

## 📁 Branches Structure

| Branch Name        | Purpose                        |
|--------------------|--------------------------------|
| `develop`          | Main development branch        |
| `1-initial-project`| Vite + Tailwind + Routing base |
| `2-register`       | Registration form + validation |
| `3-users`          | User list + search + delete    |
| `4-login`          | Login + token storage          |
| `5-profile`        | Protected profile + logout     |

---

## 📸 Pages Overview

### `/register`
- Full form with required + optional fields
- Validates input
- Hashes password before storing
- Stores user in localStorage

### `/users`
- Displays all registered users
- Supports search and pagination
- Allows deleting users

### `/login`
- Email + password login
- Verifies hash
- Stores token on success

### `/profile`
- Protected route (checks for token)
- Displays current user's data
- Logout functionality

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-org/your-repo.git
cd user-authentication-system
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Dev Server

```bash
npm run dev
```

---

## 🌐 Live Demo

Check out the live demo of the project here:
[User Authentication System](https://user-authentication-system-frontend-alpha.vercel.app/)

---

## ✨ Training Focus Areas

* React component structure and forms
* State and validation management
* Controlled components
* Password hashing and security awareness
* Auth token-based access control
* Routing and page protection

---

## ✅ Suggested Next Steps

* Add form libraries (e.g. React Hook Form + Zod)
* Replace localStorage with real API calls (Node/Firebase)
* Add role-based authorization
* Use Context or Zustand for global auth state

---

## 🧑‍🏫 Created for Internal Training

This project is used to train junior frontend developers in building real-world login systems without a backend to understand the fundamentals first.

---

> Built with ❤️

