# Task Management System

This is a simple Task Management application built using Django REST Framework and React. It allows users to register, login, and manage their own tasks securely using JWT authentication with HTTP-only cookies.

## Features

### Authentication

- Register
- Login
- Logout
- Current User Profile
- Refresh Token

### Task Management

- Create Task
- View All Tasks
- View Single Task
- Update Task
- Delete Task

Each task contains:

- Title
- Description
- Status
- Created By
- Created Date
- Updated Date

### Dashboard

- Logged-in User Name
- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks

### Other Features

- Search Task by Title
- Filter Task by Status
- Loading State
- Empty State
- Delete Confirmation
- API Error Handling
- Protected Routes
- User can access only their own tasks

---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT

### Database

- SQLite

---

## Project Structure

```text
TaskManagement/

backend/
frontend/
README.md
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

Backend will run on:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run on:

```
http://127.0.0.1:5173
```

---

## API Endpoints

### Authentication

```
POST   /api/auth/register/
POST   /api/auth/login/
POST   /api/auth/logout/
POST   /api/auth/refresh/
GET    /api/auth/me/
```

### Tasks

```
GET     /api/tasks/
POST    /api/tasks/
GET     /api/tasks/{id}/
PUT     /api/tasks/{id}/
DELETE  /api/tasks/{id}/
GET     /api/tasks/dashboard/
```

---

## Search

```
GET /api/tasks/?search=task
```

## Filter

```
GET /api/tasks/?status=Pending
```

---

## Environment Variables

### Backend

Use the `.env.example` file to create your `.env`.

### Frontend

Use the `.env.example` file to create your `.env`.

---

## Author

Kailash Kumar

B.Tech Computer Science and Engineering

---

This project was developed as part of a Full Stack Python interview task.