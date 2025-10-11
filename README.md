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



## Features Implemented

###  1. Authentication
- Implemented **Firebase Authentication** for:
  - Email + Password sign-in
  - Google Sign-In using `signInWithPopup()`
- Uses Firebase’s session persistence to keep users logged in.
- Custom `useAuth` hook manages user context globally across the app.

###  2. Realtime Click Tracking
- Each logged-in user has a personal click counter.
- Every button click triggers a Socket.IO event (`click`).
- The backend listens and emits updated counts in real-time (`countUpdated`).

###  3. Firestore Integration
- Stores per-user data in Firestore:
  ```json
  {
    "uid": "user123",
    "displayName": "Byron",
    "email": "byron@gmail.com",
    "clicks": 12,
  }
### 4. UI Components

- Login modal and registration flow.

- Dynamic display of user info (displayName, photoURL).

- Logout and state persistence using useSessionStorage().



### 5.Setup Instructions

- Clone the repository
`git clone https://github.com/your-username/mini-firebase-fastify-app.git
cd mini-firebase-fastify-app
`
- Install Dependencies
`cd frontend
npm install

cd backend
npm install

`
- Environment Variables
`
Frontend:
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_BACKEND_URL

Backend:
FIREBASE_TYPE
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
FIREBASE_CLIENT_ID
.FIREBASE_AUTH_URI
FIREBASE_TOKEN_URI
FIREBASE_AUTH_PROVIDER_X509_CERT_URL
FIREBASE_CLIENT_X509_CERT_URL
FIREBASE_UNIVERSE_DOMAIN
`
#  Cloud Setup and Configuration

##  Prerequisites (For Deployment)

Before deployment, ensure you have the following **GCP/Firebase resources** provisioned:

- **GCP Project** with Billing Enabled.  
- **Firebase Project** with Email/Password Auth enabled and Firestore initialized.  
- **GCE VM instance** running the FastAPI GPU Service (with internal IP only).  
- **Serverless VPC Access Connector** configured in the GCE VM's VPC network.  
- **Redis (Memorystore) Instance** in the same VPC network.  

---

##  Environment Variables (For Cloud Run Deployment)

The following environment variables are required for the **Backend API deployment on Cloud Run** (in addition to your Firebase credentials):

| Variable         | Description                                         | Example Value              |
|------------------|-----------------------------------------------------|-----------------------------|
| `REDIS_HOST`     | Internal IP of the Memorystore Redis Instance.     | `10.0.1.5`                  |
| `REDIS_PORT`     | Port of the Memorystore Redis Instance (default).  | `6379`                      |
| `GPU_SERVICE_URL`| Internal URL (IP:Port) of the GCE FastAPI service. | `http://10.128.0.2:8000`    |

---

##  Deployment Steps

### **1. GPU Service (GCE)**

1. **Provision VM:** Create a GCE instance with the desired GPU (e.g., NVIDIA T4).  
2. **Install Drivers/Dependencies:** Install NVIDIA drivers, Docker, and Python environment (with FastAPI).  
3. **Deploy Code:** Deploy the Python FastAPI app to the VM, ensuring it listens on the private network interface (`0.0.0.0`).  
4. **Firewall:** Create an ingress firewall rule allowing traffic to the FastAPI port (e.g., `8000`) **only** from the IP range of your Serverless VPC Access Connector.

---

### **2. Backend API (Cloud Run)**

1. **Containerize:** Create a Docker image for the Node.js Fastify/Socket.IO backend.  
2. **Deploy:** Use the following command:

   ```bash
   gcloud run deploy api-service \
     --image gcr.io/[PROJECT-ID]/api-service \
     --region [REGION] \
     --set-env-vars FIREBASE_PROJECT_ID=... \
     # ... include all Cloud ENV VARs here
     --vpc-connector [CONNECTOR-NAME] \
     --egress all
     ```
⚠️ **Important Note**

The flags `--vpc-connector` and `--egress all` are **critical** to enable private network communication to the **GCE VM** and **Redis**.

---

## 🌐 3. Frontend (Firebase Hosting)

### **Build**
Generate static assets for the React application.

### **Configure**
Add the Cloud Run API URL and Firebase configuration details to your React environment variables.

### **Deploy**
Use the Firebase CLI:

```bash
firebase deploy 
```
# 🔒 Security Considerations

## A. Authentication & Authorization

| Component | Security Measure |
|------------|------------------|
| **Client (React)** | Uses Firebase SDK to handle user login and manage the active ID token. |
| **Backend API (Cloud Run)** | Verifies Firebase ID tokens using the Firebase Admin SDK on each API request to ensure authentication. |
| **Firestore** | Enforces security rules:<br>`allow read, write: if request.auth.uid == resource.data.userId;`<br>This ensures users can only read/write their own click data. |

---

## B. Network Isolation

| Component | Security Measure |
|------------|------------------|
| **Redis (Memorystore)** | Hosted on a private VPC; not publicly accessible. Only Cloud Run instances can access it via the VPC Connector. |
| **GPU Service (GCE)** | VM has **no external IP**. Access is restricted to:<br>1️⃣ Internal IP only.<br>2️⃣ Firewall rules allowing traffic only from the VPC Connector’s IP range.<br>*(Optional: Require a shared secret token validated in the FastAPI service.)* |

---

## 📈 Next Steps / TODO

- [ ] Implement Redis pub/sub for multi-instance sync  
- [ ] Add GPU microservice stub (FastAPI)  
- [ ] Deploy frontend to Firebase Hosting  
- [ ] Deploy backend to Google Cloud Run  
- [ ] Add profile image upload (Firebase Storage)  
- [ ] Integrate click count visualization (charts)  

---

## 🧑‍💻 Author

**Byron**  
*Software Engineer | Full-Stack Developer*  
Focused on building scalable, cloud-based solutions using **React**, **Node.js**, and **Firebase**.

---

## 🪄 License

**MIT License © 2025 Byron**
