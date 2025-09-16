Prerequisites

Docker Engine 20.10+ installed
Docker Compose 2.0+ installed
Ports 3001, 4000, and 27017 available on your system

Quick Start

Clone the repository:

bashgit clone https://github.com/[your-username]/[your-repo-name].git
cd [your-repo-name]

Build and start all services:

bashdocker-compose up --build

Wait for all services to start (you'll see logs from frontend, backend, and mongo services)
Access the application:

Frontend: http://localhost:3001
Backend API: http://localhost:4000
Student Endpoint: http://localhost:4000/api/student



Alternative Running Options
Run in detached mode (background):
bashdocker-compose up -d --build
View logs:
bash# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongo
Stop all services:
bashdocker-compose down
Complete cleanup (removes volumes):
bashdocker-compose down -v