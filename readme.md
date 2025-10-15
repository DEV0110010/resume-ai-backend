```markdown
# 🚀 AI Resume Builder

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) [![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)](https://reactjs.org/) [![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?logo=mongodb)](https://www.mongodb.com/)

**AI Resume Builder** is a full-stack web application that helps users create **professional resumes** using AI-powered suggestions and customizable templates. Built with React, Node.js, and MongoDB, it provides an intuitive UI, AI guidance, and seamless resume management.  

---

## 📌 Table of Contents

- [✨ Features](#-features)  
- [🛠 Tech Stack](#-tech-stack)  
- [📂 Project Structure](#-project-structure)  
- [⚙️ Setup Instructions](#-setup-instructions)  
- [🔗 API Endpoints](#-api-endpoints)  
- [❌ Error Responses](#-error-responses)  
- [💻 Client Overview](#-client-overview)  
- [🖥 Server Overview](#-server-overview)  
- [📄 License](#-license)  

---

## ✨ Features

- 🔐 **User Authentication** – Login & Register  
- 📝 **Resume Management** – Create, Edit, Preview  
- 🤖 **AI Suggestions** – Smart resume content recommendations  
- 🎨 **Templates** – Multiple professional resume templates  
- 🖼 **Image Uploads** – Profile photo upload & management  
- 📱 **Responsive UI** – Modern, mobile-friendly design  

---

## 🛠 Tech Stack

- **Frontend:** React, Redux Toolkit, Vite  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **AI Integration:** Gemini API  
- **Image Hosting:** ImageKit  
- **File Uploads:** Multer  

---

## 📂 Project Structure

```

client/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── configs/
│   ├── pages/
server/
├── configs/
├── controllers/
├── middlewares/
├── models/
├── routes/

````

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js & npm  
- MongoDB instance  
- ImageKit account  
- Gemini API credentials  

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder
````

### 2️⃣ Setup Server

```bash
cd server
npm install
# Configure .env with MongoDB, ImageKit & Gemini API keys
npm start
```

### 3️⃣ Setup Client

```bash
cd client
npm install
npm run dev
```

---

## 🔗 API Endpoints

### **Auth**

* **POST `/api/user/register`** – Register a new user

  ```json
  { "name": "...", "email": "...", "password": "..." }
  ```

  **Response:** `201 Created`

* **POST `/api/user/login`** – Login user

  ```json
  { "email": "...", "password": "..." }
  ```

  **Response:** `200 OK` with JWT

---

### **Resume**

* **GET `/api/resume/`** – Get all resumes for user
* **POST `/api/resume/`** – Create a new resume
* **PUT `/api/resume/:id`** – Update a resume
* **DELETE `/api/resume/:id`** – Delete a resume

All require header:

```
Authorization: Bearer <token>
```

---

### **AI Suggestions**

* **POST `/api/ai/suggest`** – Get AI suggestions for resume sections

  ```json
  { "section": "experience", "input": "Worked as..." }
  ```

  **Response:** `200 OK`

---

### **Image Upload**

* **POST `/api/resume/upload-image`** – Upload profile image
  FormData key: `image`
  **Response:** `200 OK` with image URL

---

## ❌ Error Responses

All errors return:

```json
{
  "error": true,
  "message": "Error description"
}
```

**Common Codes:**

* `400` – Bad Request
* `401` – Unauthorized
* `403` – Forbidden
* `404` – Not Found
* `500` – Internal Server Error

**Example:**

```json
{
  "error": true,
  "message": "Invalid email or password"
}
```

---

## 💻 Client Overview

* **Entry:** [`src/main.jsx`](src/main.jsx)
* **State Management:** Redux Toolkit (`authSlice.js`, `store.js`)
* **Pages:** Home, Login, Dashboard, ResumeBuilder, Preview
* **Components:** Navbar, Loader, ResumePreview, TemplateSelector, Forms
* **Templates:** Classic, Minimal, Modern, MinimalImage
* **API Config:** [`src/configs/api.js`](src/configs/api.js)

---

## 🖥 Server Overview

* **Entry:** [`server.js`](server.js)
* **Database:** [`configs/db.js`](configs/db.js)
* **AI Integration:** [`configs/gemini.js`](configs/gemini.js)
* **ImageKit Config:** [`configs/imageKit.js`](configs/imageKit.js)
* **File Uploads:** [`configs/multer.js`](configs/multer.js)
* **Controllers:** User, Resume, AI
* **Models:** User, Resume
* **Routes:** User, Resume, AI
* **Middleware:** Auth ([`auth.middleware.js`](middlewares/auth.middleware.js))

---

## 📄 License

MIT License

