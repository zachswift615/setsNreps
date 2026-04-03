# Sets & Reps

<img width="372" alt="image" src="https://user-images.githubusercontent.com/9255115/159035366-3328c724-c3e5-44f0-b422-83f5323911a9.png">

A workout tracking application built with Django REST Framework and React.

## Tech Stack

- **Backend**: Django 5.1.3, Django REST Framework 3.15.2
- **Frontend**: React 18.3.1, React Router 6.28.0
- **Python**: 3.10+ (tested on 3.13)
- **Database**: SQLite (development)

## Prerequisites

### Option 1: Docker (Recommended)
- Docker Desktop (includes Docker and Docker Compose)

### Option 2: Local Development
- Python 3.10 or higher
- Node.js 16+ and npm
- Git

## Quick Start with Docker

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone git@github.com:zachswift615/setsNreps.git
cd setsNreps

# Start all services
docker-compose up --build
```

That's it! The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Django Admin**: http://localhost:8000/admin

To stop the services:
```bash
docker-compose down
```

### Docker Commands

```bash
# Start services in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose stop

# Restart services
docker-compose restart

# Remove containers and volumes
docker-compose down -v

# Load initial exercise data (muscle groups & exercises)
docker-compose exec backend python manage.py loaddata api/fixtures/initial_data.json

# Create superuser in Docker
docker-compose exec backend python manage.py createsuperuser --email "youremail@example.com"

# Run Django management commands
docker-compose exec backend python manage.py <command>
```

### Loading Exercise Data

The app comes with pre-populated muscle groups and exercises. To load them:

**With Docker:**
```bash
docker-compose exec backend python manage.py loaddata api/fixtures/initial_data.json
```

**Without Docker:**
```bash
./load_fixtures.sh
# Or manually:
cd setsNreps
python manage.py loaddata api/fixtures/initial_data.json
```

This loads:
- **8 Muscle Groups**: Chest, Back, Shoulders, Arms, Legs, Abs, Glutes, Cardio
- **55 Exercises**: Including Barbell Squat, Flat Bench Press, Barbell Deadlift, Dumbbell Deadlift, Sit-ups, Pull-ups, and many more
```

## Local Setup (Without Docker)

### 1. Clone the repository
```bash
git clone git@github.com:zachswift615/setsNreps.git
cd setsNreps
```

### 2. Set up Python virtual environment
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On macOS/Linux
# OR
venv\Scripts\activate  # On Windows
```

### 3. Install Python dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up the database
```bash
cd setsNreps
python manage.py migrate
```

### 5. Create a superuser (optional, for admin access)
```bash
python manage.py createsuperuser --email "youremail@example.com"
```

### 6. Install Node dependencies
```bash
# Make sure you're in the setsNreps/setsNreps directory
npm install
```

### 7. Run the application

You'll need **two terminal windows**:

**Terminal 1 - Django backend:**
```bash
# From setsNreps/setsNreps directory
python manage.py runserver
```
This starts the Django API server at `http://localhost:8000`

**Terminal 2 - React frontend:**
```bash
# From setsNreps/setsNreps directory
npm start
```
This starts the React development server at `http://localhost:3000`

### 8. Access the application

- **Frontend UI**: http://localhost:3000
- **Django Admin** (for adding exercises): http://localhost:8000/admin
- **API Endpoints**: http://localhost:8000/api/

## Development Notes

- The React app proxies API requests to the Django backend
- Static files are served from the `build` directory in production
- CORS is enabled for local development

## Building for Production

```bash
# Build the React frontend
cd setsNreps
npm run build

# Collect Django static files
python manage.py collectstatic --noinput
```
