# 🐳 Docker Deployment Guide

This guide will help you deploy the Authentication API using Docker and Docker Compose.

## Prerequisites

- [Docker](https://www.docker.com/get-started) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Authentication_programm-1
```

### 2. Create Environment File

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=4000
NODE_ENV=production
BASE_URL=http://localhost:4000

# MongoDB Configuration
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=admin123
MONGO_DATABASE=authdb
MONGO_PORT=27017

# MongoDB Connection URL (for Docker)
MONGO_URL=mongodb://admin:admin123@mongodb:27017/authdb?authSource=admin

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-minimum-32-characters

# Email Configuration
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USERNAME=your-mailtrap-username
MAILTRAP_PASSWORD=your-mailtrap-password
MAILTRAP_SENDER_EMAIL=noreply@yourapp.com
```

**⚠️ Important:** Change the `JWT_SECRET` to a strong random string (minimum 32 characters) before deploying to production.

### 3. Build and Start Services

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### 4. Verify Deployment

```bash
# Test the API
curl http://localhost:4000/

# Expected response: "Hello World!"
```

## Docker Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Volumes (⚠️ Deletes Data)
```bash
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f auth-api
docker-compose logs -f mongodb
```

### Rebuild After Code Changes
```bash
docker-compose up -d --build
```

### Execute Commands in Container
```bash
# Access API container shell
docker-compose exec auth-api sh

# Access MongoDB shell
docker-compose exec mongodb mongosh -u admin -p admin123
```

### View Container Status
```bash
docker-compose ps
```

## Service Details

### Authentication API
- **Container Name:** `auth-api`
- **Port:** `4000` (configurable via `PORT` env variable)
- **Health Check:** Available at `http://localhost:4000/`
- **Depends On:** MongoDB service

### MongoDB
- **Container Name:** `auth-mongodb`
- **Port:** `27017` (configurable via `MONGO_PORT` env variable)
- **Default Credentials:**
  - Username: `admin` (configurable)
  - Password: `admin123` (configurable)
  - Database: `authdb` (configurable)
- **Data Persistence:** Data stored in Docker volume `mongodb_data`

## Environment Variables

All environment variables can be configured in the `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | API server port | `4000` |
| `NODE_ENV` | Node environment | `production` |
| `BASE_URL` | Base URL for API | `http://localhost:4000` |
| `MONGO_ROOT_USERNAME` | MongoDB root username | `admin` |
| `MONGO_ROOT_PASSWORD` | MongoDB root password | `admin123` |
| `MONGO_DATABASE` | MongoDB database name | `authdb` |
| `MONGO_PORT` | MongoDB exposed port | `27017` |
| `MONGO_URL` | MongoDB connection string | Auto-generated |
| `JWT_SECRET` | JWT signing secret | **Required** |
| `MAILTRAP_HOST` | Email SMTP host | `smtp.mailtrap.io` |
| `MAILTRAP_PORT` | Email SMTP port | `2525` |
| `MAILTRAP_USERNAME` | Email SMTP username | **Required** |
| `MAILTRAP_PASSWORD` | Email SMTP password | **Required** |
| `MAILTRAP_SENDER_EMAIL` | Sender email address | `noreply@example.com` |

## Data Persistence

MongoDB data is persisted in Docker volumes:
- `mongodb_data`: Database files
- `mongodb_config`: Configuration files

To backup data:
```bash
docker-compose exec mongodb mongodump --out /data/backup
```

To restore data:
```bash
docker-compose exec mongodb mongorestore /data/backup
```

## Production Deployment

### 1. Security Checklist

- [ ] Change default MongoDB credentials
- [ ] Use strong JWT_SECRET (32+ characters, random)
- [ ] Configure proper BASE_URL
- [ ] Set up HTTPS/SSL (use reverse proxy like Nginx)
- [ ] Configure production email service
- [ ] Set up monitoring and logging
- [ ] Enable firewall rules
- [ ] Regular security updates

### 2. Using Docker in Production

**Option A: Docker Compose (Recommended for Single Server)**
```bash
docker-compose -f docker-compose.yml up -d
```

**Option B: Docker Swarm (For Multi-Server)**
```bash
docker stack deploy -c docker-compose.yml auth-stack
```

**Option C: Kubernetes**
- Convert docker-compose.yml to Kubernetes manifests
- Use Helm charts for easier management

### 3. Reverse Proxy Setup (Nginx)

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. SSL/HTTPS Setup

Use Let's Encrypt with Certbot:

```bash
sudo certbot --nginx -d api.yourdomain.com
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs auth-api

# Check if port is already in use
lsof -i :4000

# Rebuild containers
docker-compose up -d --build --force-recreate
```

### MongoDB Connection Issues

```bash
# Check MongoDB logs
docker-compose logs mongodb

# Test MongoDB connection
docker-compose exec mongodb mongosh -u admin -p admin123

# Verify connection string in .env file
```

### Permission Issues

```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Rebuild with no cache
docker-compose build --no-cache
```

### Out of Memory

```bash
# Check container resource usage
docker stats

# Increase Docker memory limit in Docker Desktop settings
```

## Monitoring

### Health Checks

Both services include health checks:
- API: `http://localhost:4000/`
- MongoDB: Internal ping check

### View Container Stats

```bash
docker stats
```

### View Resource Usage

```bash
docker-compose top
```

## Cleanup

### Remove All Containers and Volumes

```bash
# Stop and remove containers, networks, and volumes
docker-compose down -v

# Remove images
docker-compose down --rmi all
```

### Remove Only Containers (Keep Data)

```bash
docker-compose down
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)

