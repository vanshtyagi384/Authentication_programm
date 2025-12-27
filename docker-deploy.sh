#!/bin/bash

# Docker Deployment Script for Authentication API
# This script helps you quickly deploy the application using Docker Compose

set -e

echo "🐳 Authentication API - Docker Deployment"
echo "=========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://www.docker.com/get-started"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ .env file created. Please edit it with your configuration."
        echo "⚠️  IMPORTANT: Change JWT_SECRET to a strong random string!"
        read -p "Press Enter to continue after editing .env file..."
    else
        echo "❌ .env.example file not found. Please create .env file manually."
        exit 1
    fi
fi

echo "🔨 Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📊 Service Status:"
    docker-compose ps
    echo ""
    echo "🌐 API is available at: http://localhost:4000"
    echo "📝 View logs with: docker-compose logs -f"
    echo "🛑 Stop services with: docker-compose down"
    echo ""
    echo "🧪 Testing API..."
    if curl -s http://localhost:4000/ > /dev/null; then
        echo "✅ API is responding!"
    else
        echo "⚠️  API might still be starting. Check logs: docker-compose logs auth-api"
    fi
else
    echo "❌ Deployment failed. Check logs: docker-compose logs"
    exit 1
fi

