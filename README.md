# 📚 Smart Study Planner & Task Manager

A modern full-stack task management web application designed to help users efficiently plan, organize, and track their daily study tasks with real-time multi-language support and a clean, user-friendly interface.

---

## 🌐 Live Demo

🔗 **Frontend (Netlify):**
https://voluble-lily-d273f6.netlify.app/

⚙️ **Backend API (Render):**
https://smart-study-planner-clx1.onrender.com/

---

## 🚀 Key Features

### 📝 Task Management

* Add tasks with date and time
* Mark tasks as completed or pending
* Delete tasks easily
* Clean and minimal interface for better focus

---

### 📊 Progress Tracking

* Dynamic progress bar updates automatically
* Displays completion percentage
* Helps maintain productivity and consistency

---

### 🌍 Multi-Language Support

* Supports:

  * English 🇬🇧
  * Hindi 🇮🇳
  * French 🇫🇷
  * Spanish 🇪🇸
* Full UI translation (buttons, headings, placeholders)
* Tasks are translated based on selected language

---

### 🧠 Smart Translation System

* Uses Flask backend API for translation
* Integrates external translation service
* Custom word correction system for accuracy

  * Example: *"math" → "mathématiques"*
* Handles both API-based and manual corrections

---

### 🎨 Modern UI/UX

* Animated particle background
* Smooth hover effects
* Clean layout with good contrast
* Designed for usability and simplicity

---

### 💾 Data Persistence

* Uses browser Local Storage
* Tasks remain saved after refresh
* No database required

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

### Backend

* Python
* Flask
* Flask-CORS
* REST API

### Deployment

* Netlify (Frontend Hosting)
* Render (Backend Hosting)

---

## ⚙️ How It Works

1. User enters a task
2. Selected language is detected
3. Task is sent to Flask backend
4. Backend translates the text
5. Custom dictionary improves translation accuracy
6. Task is stored in Local Storage
7. UI updates instantly with progress tracking

---

## ▶️ Run Locally

### 🔹 Backend Setup

Install dependencies:
pip install flask flask-cors requests gunicorn

Run server:
python app.py

---

### 🔹 Frontend Setup

Open:
index.html

in your browser

---

## 🧪 Example Usage

| Input | Language | Output        |
| ----- | -------- | ------------- |
| study | Hindi    | अध्ययन        |
| math  | French   | mathématiques |
| book  | Spanish  | libro         |

---

## 💡 Project Purpose

This project demonstrates:

* Full-stack web development
* API integration and handling
* Real-time translation logic
* UI/UX design principles
* Deployment of frontend and backend
* Problem-solving with translation limitations

---

## 🚧 Future Improvements

* User authentication (login/signup)
* Database integration (MongoDB / Firebase)
* Dark/light theme toggle
* Task categories and priority levels
* Mobile responsive enhancements

---

## 👩‍💻 Author

**Farheen**

---

## ⭐ Final Note

This project reflects real-world development practices including deployment, API usage, and user-focused design. It showcases the ability to build and manage a complete full-stack application from scratch.
