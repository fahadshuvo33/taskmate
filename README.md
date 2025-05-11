# TaskMate - A Docker-Based Task Management Application

This project was created as a learning experience to explore Docker containerization with a full-stack application. It's a task management system built with modern web technologies and containerized for easy deployment.

## Project Overview

TaskMate is a containerized task management application that demonstrates the use of Docker in a modern web development stack. This project serves as a practical example of how to containerize both frontend and backend services, manage database connections, and handle inter-container communication.

## Current Features

- 🐋 Full Docker containerization
- ✨ Create, view, edit, and delete tasks
- 🔍 Real-time task search
- 👤 Personal information management
- 📝 Custom fields for tasks
- 🎨 Modern UI with Tailwind CSS
- 🌐 RESTful API architecture

## Planned Features

- 🔐 User authentication and authorization
- 📊 Task analytics and reporting
- 🏷️ Task categories and labels
- 📅 Due dates and reminders
- 👥 Team collaboration features
- 📱 Mobile responsiveness improvements

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Modern ES6+ JavaScript

### Backend
- Django
- Django REST Framework
- MySQL (Production Database)
- Redis (Planned for caching)

### Infrastructure
- Docker
- Docker Compose
- Nginx (Planned for reverse proxy)

## Running with Docker

### Prerequisites
- Docker
- Docker Compose

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/fahadshuvo33/taskmate.git
cd taskmate
```

2. Set up environment variables:

Copy the example environment file and update it with your values:
```bash
cp .env.example .env
```

Then edit the `.env` file with your specific configurations. The example file contains all the necessary variables with sample values and helpful comments.

3. Build and run the containers:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### Docker Commands

Common commands you'll need:

```bash
# Start containers in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers after changes
docker-compose up --build

# Access MySQL container
docker-compose exec db mysql -u root -p

# Run Django migrations
docker-compose exec backend python manage.py migrate
```

### Development Without Docker

If you prefer to run the application without Docker:

1. Backend Setup:
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

2. Frontend Setup:
```bash
cd frontend
npm install
npm start
```

## API Documentation

RESTful API endpoints:

- `GET /api/tasks/` - List all tasks
- `POST /api/tasks/` - Create a task
- `PUT /api/tasks/{id}/` - Update a task
- `DELETE /api/tasks/{id}/` - Delete a task
- `GET /api/personal-info/` - Get personal info
- `PUT /api/personal-info/{id}/` - Update personal info

## Contributing

Contributions are welcome! This is a learning project, and I'm open to suggestions and improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License..
