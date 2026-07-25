# Zenith Monitor

A modern uptime monitoring application inspired by UptimeRobot.  
Users can create monitors, track website availability, monitor response times, and receive detailed status information through a clean dashboard.

## Features

- User authentication with JWT
- HTTP monitoring
- Ping monitoring
- DNS monitoring
- Automatic background checks
- Response time measurement
- Status code tracking
- Monitor history and logs
- Dashboard with monitor management
- Docker support
- PostgreSQL database

---

## Technologies

### Backend
- Java 21
- Spring Boot 4
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT (JJWT)
- Maven

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Axios
- React Router

### DevOps
- Docker
- Docker Compose
- Nginx

---

## Screenshots

> Add screenshots here

- Login
- Dashboard
- Create Monitor
- Monitor Details

---

## Project Structure

```
url_monitor0
│
├── backend
│   ├── src
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend
│   ├── src
│   ├── Dockerfile
│   └── package.json
│
├── compose.yaml
├── .env.example
└── README.md
```

---

## Getting Started

### Requirements

- Docker Desktop

That's all.

No Java, Node.js or PostgreSQL installation is required.

---

## Installation

Clone the repository

```bash
git clone https://github.com/USERNAME/url_monitor0.git
cd url_monitor0
```

Create a `.env` file from `.env.example`

```bash
cp .env.example .env
```

Start the application

```bash
docker compose up --build
```

---

## Default URLs

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:5000
```

Database

```
localhost:55432
```

---

## Environment Variables

```
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=

DB_URL=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=
```

---

## API

Authentication

```
POST /auth/login
```

Users

```
POST /users
```

Monitors

```
GET /monitors
POST /monitors
PUT /monitors/{id}
DELETE /monitors/{id}
```

---

## Docker

Build

```bash
docker compose up --build
```

Run in background

```bash
docker compose up -d
```

Stop

```bash
docker compose down
```

Remove containers and database

```bash
docker compose down -v
```

---

## Future Improvements

- Email notifications
- Telegram notifications
- Discord webhook support
- SSL certificate monitoring
- Multi-user organizations
- Public status page
- Dark mode improvements
- Charts and analytics

---

## Author

Murat Bolatoglu

GitHub

https://github.com/MuratBolatoglu