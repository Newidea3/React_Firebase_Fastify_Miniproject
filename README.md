# Firebase + Fastify + React Mini Project

## Overview
This project is a **full-stack web application** built as part of a mini-challenge to integrate:
- **Frontend:** React  
- **Backend:** Fastify (Node.js) with Socket.IO  
- **Auth & Database:** Firebase Authentication + Firestore  
- **Realtime Updates:** WebSockets + Firestore integration  
- **(Optional)** GPU Service stub with Python (FastAPI)

The goal is to build a small but realistic app that tracks **user click counts**, stores them per user, and updates the frontend in real-time.

---

## Tech Stack

### Frontend
- **React + Vite**
- **Firebase Auth (Email/Password + Google Sign-In)**
- **Realtime updates via Socket.IO client**
- **Tailwind + Shadcn UI for components**

### Backend
- **Node.js + Fastify**
- **Socket.IO for real-time WebSocket connections**
- **Firebase Admin SDK (optional for server-side validation)**
- **Redis (future use for pub/sub or caching)**
- **Hosted on Cloud Run / local development**

### Firebase Services
- **Firebase Authentication:** Handles login & registration (email/password + Google).
- **Firestore:** Stores user data (name, photoURL, and click count).
- **Firebase Storage (optional):** For storing profile images.

---

---

## 🪄 License

**MIT License © 2025 Byron**
