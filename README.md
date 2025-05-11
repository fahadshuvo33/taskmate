# TaskMate

TaskMate is a modern task management application built with React and Django, featuring a beautiful UI with Tailwind CSS.

## Features

- ✨ Create, view, edit, and delete tasks
- 🔍 Search tasks functionality
- 👤 Personal information management
- 📝 Custom fields for tasks
- 🎨 Modern and responsive UI
- 🌙 Beautiful gradient design

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Modern ES6+ JavaScript

### Backend
- Django
- Django REST Framework
- SQLite3 (can be easily switched to other databases)

## Getting Started

### Prerequisites
- Python 3.x
- Node.js and npm
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd TaskMate
```

2. Backend Setup:
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

3. Frontend Setup:
```bash
cd frontend
npm install
npm start
```

### Docker Setup (Optional)

You can also run the application using Docker:

```bash
docker-compose up --build
```

## API Endpoints

- `GET /api/tasks/` - List all tasks
- `POST /api/tasks/` - Create a new task
- `PUT /api/tasks/{id}/` - Update a task
- `DELETE /api/tasks/{id}/` - Delete a task
- `GET /api/personal-info/` - Get personal info
- `PUT /api/personal-info/{id}/` - Update personal info

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
