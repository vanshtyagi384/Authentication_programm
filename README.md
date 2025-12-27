# 🔐 Authentication API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20.19.4-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.20.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

**A production-ready, enterprise-grade Node.js authentication microservice**

[Features](#-features) • [Documentation](#-api-documentation) • [Installation](#-installation) • [Deployment](#-deployment) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

A robust, scalable, and secure RESTful authentication API built with **Express.js** and **MongoDB**. This microservice provides comprehensive authentication and authorization capabilities including user registration, email verification, JWT-based authentication, and role-based access control (RBAC). Designed following industry best practices for security, scalability, and maintainability.

### Key Highlights

- 🚀 **Production-Ready** - Built with enterprise-grade security and error handling
- 🔒 **Secure by Default** - Password hashing, JWT tokens, HttpOnly cookies, and email verification
- 📦 **Modular Architecture** - Clean separation of concerns with MVC pattern
- 🔄 **Scalable Design** - Stateless authentication suitable for microservices
- 📧 **Email Integration** - Automated email verification workflow
- 🎯 **Role-Based Access** - Built-in support for user and admin roles

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Security](#-security)
- [Performance](#-performance)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Authentication & Authorization
- ✅ **User Registration** - Secure user registration with comprehensive validation
- ✅ **Email Verification** - Cryptographically secure token-based email verification
- ✅ **JWT Authentication** - Industry-standard JSON Web Token implementation with configurable expiration
- ✅ **Password Security** - Bcrypt hashing with salt rounds (10) for password encryption
- ✅ **Role-Based Access Control (RBAC)** - Granular permission system supporting user and admin roles
- ✅ **Cookie-Based Sessions** - HttpOnly, Secure cookies for enhanced XSS protection
- ✅ **Token Management** - Automatic token generation, validation, and expiration handling

### Infrastructure & Security
- ✅ **CORS Configuration** - Configurable Cross-Origin Resource Sharing with credentials support
- ✅ **MongoDB Integration** - Production-ready database solution with Mongoose ODM
- ✅ **Environment-Based Configuration** - Secure environment variable management
- ✅ **Error Handling** - Comprehensive error handling with appropriate HTTP status codes
- ✅ **Request Validation** - Input validation for all endpoints
- ✅ **Email Service Integration** - Nodemailer integration for transactional emails

### Developer Experience
- ✅ **Modular Architecture** - Clean MVC pattern with separation of concerns
- ✅ **ES6+ Syntax** - Modern JavaScript with ES modules
- ✅ **Hot Reload** - Nodemon integration for rapid development
- ✅ **RESTful Design** - Standard REST API conventions and best practices

## 🛠 Tech Stack

### Core Framework & Runtime
| Technology | Version | Purpose |
|------------|---------|---------|
| **[Node.js](https://nodejs.org/)** | 20.19.4+ | JavaScript runtime environment |
| **[Express.js](https://expressjs.com/)** | 5.1.0 | Minimalist web framework for Node.js |
| **[MongoDB](https://www.mongodb.com/)** | 6.20.0 | NoSQL document database |
| **[Mongoose](https://mongoosejs.com/)** | 8.19.0 | MongoDB object modeling and ODM |

### Security & Authentication
| Package | Version | Purpose |
|---------|---------|---------|
| **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** | 9.0.2 | JWT token generation and verification |
| **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** | 3.0.2 | Password hashing with bcrypt algorithm |
| **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** | 6.0.0 | Native bcrypt implementation (alternative) |

### Utilities & Middleware
| Package | Version | Purpose |
|---------|---------|---------|
| **[nodemailer](https://nodemailer.com/)** | 7.0.6 | Email delivery service integration |
| **[dotenv](https://github.com/motdotla/dotenv)** | 17.2.3 | Environment variable management |
| **[cookie-parser](https://github.com/expressjs/cookie-parser)** | 1.4.7 | HTTP cookie parsing middleware |
| **[cors](https://github.com/expressjs/cors)** | 2.8.5 | Cross-Origin Resource Sharing middleware |

### Development Tools
| Package | Version | Purpose |
|---------|---------|---------|
| **[nodemon](https://nodemon.io/)** | 3.1.10 | Development server with hot-reload capability |

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Application                       │
│                    (Web/Mobile/Desktop)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/HTTPS
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    Express.js Server                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Routes     │──│ Middleware   │──│ Controllers  │       │
│  │  Layer       │  │  Layer       │  │  Layer     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                  │                  │              │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼──────────────┐
│                    Data Access Layer                          │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              Mongoose ODM                             │    │
│  │  ┌──────────────┐  ┌──────────────┐                 │    │
│  │  │ User Model   │  │   Schema     │                 │    │
│  │  │ Validation   │  │  Middleware  │                 │    │
│  │  └──────────────┘  └──────────────┘                 │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────┬───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                    MongoDB Database                           │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              User Collections                         │    │
│  │  • Users                                             │    │
│  │  • Verification Tokens                               │    │
│  └──────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                    External Services                           │
│  ┌──────────────────┐          ┌──────────────────┐          │
│  │  Email Service   │          │   JWT Service    │          │
│  │  (Nodemailer)    │          │  (jsonwebtoken)  │          │
│  └──────────────────┘          └──────────────────┘          │
└───────────────────────────────────────────────────────────────┘
```

### Request Flow

1. **Client Request** → Express.js receives HTTP request
2. **Routing** → Route handler matches request to appropriate endpoint
3. **Middleware** → Authentication/authorization middleware validates request
4. **Controller** → Business logic processes the request
5. **Model** → Mongoose interacts with MongoDB database
6. **Response** → JSON response sent back to client

### Design Patterns

- **MVC (Model-View-Controller)** - Separation of concerns
- **Middleware Pattern** - Request processing pipeline
- **Repository Pattern** - Data access abstraction (via Mongoose)
- **Factory Pattern** - Token generation and email service creation

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.19.4 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Email Service** (Mailtrap or similar for email verification)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd Authentication_programm-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration (see [Configuration](#configuration))

4. **Start the development server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:4000` (or the port specified in your `.env` file)

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=4000
BASE_URL=http://localhost:4000

# Database Configuration
MONGO_URL=mongodb://localhost:27017/your-database-name
# Or for MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database-name

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Mailtrap Example)
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USERNAME=your-mailtrap-username
MAILTRAP_PASSWORD=your-mailtrap-password
MAILTRAP_SENDER_EMAIL=noreply@yourapp.com
```

### Security Note
⚠️ **Important**: Never commit your `.env` file to version control. Always use strong, unique values for `JWT_SECRET` in production.

## 📡 API Documentation

### Base URL
```
http://localhost:4000/api/v1/users
```

### API Versioning
This API follows semantic versioning. The current version is `v1`. All endpoints are prefixed with `/api/v1/`.

### Authentication
Most endpoints require authentication via JWT token. Include the token in one of the following ways:
- **Cookie**: Automatically sent with requests (HttpOnly cookie)
- **Authorization Header**: `Authorization: Bearer <token>`

### Response Format
All API responses follow a consistent structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": { ... }
}
```

### HTTP Status Codes
| Code | Description |
|------|-------------|
| `200` | OK - Request successful |
| `201` | Created - Resource created successfully |
| `400` | Bad Request - Invalid input or validation error |
| `401` | Unauthorized - Authentication required or failed |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource not found |
| `500` | Internal Server Error - Server error |

---

### Endpoints

#### 1. Register User

Creates a new user account and sends verification email.

**Endpoint:** `POST /api/v1/users/register`

**Request Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Validation Rules:**
- `name`: Required, string, min 2 characters
- `email`: Required, valid email format, unique
- `password`: Required, string, min 6 characters (recommended: 8+ with complexity)

**Success Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "success": true
}
```

**Error Responses:**

`400 Bad Request` - Missing required fields
```json
{
  "message": "all state",
  "success": false
}
```

`400 Bad Request` - User already exists
```json
{
  "message": "User already exists",
  "success": false
}
```

`400 Bad Request` - Registration failed
```json
{
  "message": "User not registered",
  "error": { ... },
  "success": false
}
```

**Notes:**
- Password is automatically hashed using bcrypt before storage
- Verification token is generated and stored in database
- Verification email is sent to the provided email address
- User must verify email before accessing protected resources

---

#### 2. Verify Email

Verifies user email address using the token sent via email.

**Endpoint:** `GET /api/v1/users/verify/:token`

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `token` | string | Verification token received via email |

**Success Response:** `200 OK`
```json
{
  "message": "User verified successfully",
  "success": true
}
```

**Error Responses:**

`400 Bad Request` - Invalid or missing token
```json
{
  "message": "Invalid token",
  "success": false
}
```

`400 Bad Request` - Verification failed
```json
{
  "message": "User verification failed",
  "error": { ... },
  "success": false
}
```

**Notes:**
- Token is single-use and expires after verification
- Verification token is removed from database after successful verification
- User's `isVerified` status is set to `true`

---

#### 3. User Login

Authenticates user and returns JWT token.

**Endpoint:** `POST /api/v1/users/login`

**Request Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required, string

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzhiYjEyMzQ1Njc4OTAiLCJyb2xlIjoi dXNlciIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDg2NDAwfQ.abc123...",
  "user": {
    "id": "6578bb1234567890",
    "name": "John Doe",
    "role": "user"
  }
}
```

**Error Responses:**

`400 Bad Request` - Missing credentials
```json
{
  "message": "All fields are required",
  "success": false
}
```

`400 Bad Request` - Invalid credentials
```json
{
  "message": "Invalid email or password",
  "success": false
}
```

**Notes:**
- Token is set as HttpOnly cookie automatically
- Token expires in 24 hours
- Token includes user ID and role in payload
- Password comparison uses bcrypt for security
- Only verified users should be allowed to login (recommended enhancement)

---

### Example Usage

**cURL Examples:**

```bash
# Register a new user
curl -X POST http://localhost:4000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'

# Verify email
curl -X GET http://localhost:4000/api/v1/users/verify/YOUR_VERIFICATION_TOKEN

# Login
curl -X POST http://localhost:4000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }' \
  -c cookies.txt
```

**JavaScript/Fetch Examples:**

```javascript
// Register
const registerUser = async () => {
  const response = await fetch('http://localhost:4000/api/v1/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123!'
    })
  });
  const data = await response.json();
  console.log(data);
};

// Login
const loginUser = async () => {
  const response = await fetch('http://localhost:4000/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email: 'john@example.com',
      password: 'SecurePass123!'
    })
  });
  const data = await response.json();
  console.log(data);
};
```

## 🗄 Database Schema

### User Model

```javascript
{
  name: String,                    // User's full name
  email: String,                  // Unique email address (indexed)
  password: String,                // Bcrypt hashed password
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,      // Single-use email verification token
  resetPasswordExpires: Date,      // Password reset token expiration
  createdAt: Date,                // Auto-generated timestamp
  updatedAt: Date                 // Auto-generated timestamp
}
```

### Schema Features

- **Automatic Password Hashing**: Passwords are hashed using bcrypt (10 salt rounds) before saving
- **Timestamps**: Automatic `createdAt` and `updatedAt` fields
- **Email Uniqueness**: Email field should be unique (recommended: add unique index)
- **Role Enumeration**: Restricted to "user" or "admin" values
- **Token Management**: Verification tokens are single-use and can be cleared after use

### Indexes (Recommended)

```javascript
// Add these indexes for better performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ verificationToken: 1 });
UserSchema.index({ createdAt: -1 });
```

## 📁 Project Structure

```
Authentication_programm-1/
├── controller/
│   └── user.controller.js          # Business logic for user operations
│                                    # - registerUser: User registration
│                                    # - verifyUser: Email verification
│                                    # - login: User authentication
│
├── middleware/
│   └── auth.middleware.js          # Authentication middleware
│                                    # - isLoggedIn: JWT token validation
│                                    # - Role-based access control
│
├── model/
│   └── User.model.js               # Mongoose schema and model
│                                    # - User schema definition
│                                    # - Password hashing middleware
│                                    # - Validation rules
│
├── routes/
│   └── user.routes.js              # API route definitions
│                                    # - POST /register
│                                    # - GET /verify/:token
│                                    # - POST /login
│
├── utils/
│   └── db.js                       # Database connection utility
│                                    # - MongoDB connection handler
│                                    # - Connection error handling
│
├── index.js                        # Application entry point
│                                    # - Express app configuration
│                                    # - Middleware setup
│                                    # - Route mounting
│                                    # - Server initialization
│
├── .env                            # Environment variables (not in repo)
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies and npm scripts
└── README.md                       # Project documentation
```

### Layer Responsibilities

| Layer | Responsibility | Files |
|-------|---------------|-------|
| **Routes** | Define API endpoints and HTTP methods | `routes/user.routes.js` |
| **Middleware** | Request processing, authentication, validation | `middleware/auth.middleware.js` |
| **Controllers** | Business logic, request handling, response formatting | `controller/user.controller.js` |
| **Models** | Data schema, validation, database operations | `model/User.model.js` |
| **Utils** | Reusable utilities, database connections | `utils/db.js` |
| **Entry Point** | Application initialization, server configuration | `index.js` |

## 💻 Development

### Development Mode

Start the development server with hot-reload:

```bash
npm start
```

The server will automatically restart on file changes using `nodemon`.

### Available Scripts

```bash
# Start development server
npm start

# Install dependencies
npm install

# Check for outdated packages
npm outdated

# Audit security vulnerabilities
npm audit
```

### Development Best Practices

1. **Environment Variables**: Always use `.env` file for configuration
2. **Code Formatting**: Use consistent code style (consider adding ESLint/Prettier)
3. **Error Handling**: Implement comprehensive error handling
4. **Logging**: Use structured logging (consider Winston or Pino)
5. **Testing**: Write unit and integration tests

### Code Style

- Use ES6+ features (arrow functions, destructuring, async/await)
- Follow RESTful API conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused (single responsibility)

## 🧪 Testing

### Test Setup

While this project doesn't include tests yet, here's a recommended testing structure:

```bash
# Install testing dependencies
npm install --save-dev jest supertest @types/jest

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Recommended Test Structure

```
tests/
├── unit/
│   ├── controller/
│   │   └── user.controller.test.js
│   └── middleware/
│       └── auth.middleware.test.js
├── integration/
│   └── api/
│       └── user.routes.test.js
└── fixtures/
    └── user.fixtures.js
```

### Example Test (Jest + Supertest)

```javascript
import request from 'supertest';
import app from '../index.js';

describe('POST /api/v1/users/register', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
```

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (32+ characters, random)
- [ ] Configure production MongoDB connection
- [ ] Set up proper CORS origins
- [ ] Enable HTTPS/SSL
- [ ] Configure production email service
- [ ] Set up logging and monitoring
- [ ] Implement rate limiting
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline

### Deployment Options

#### Option 1: PM2 Process Manager

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start index.js --name auth-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system reboot
pm2 startup
```

**PM2 Ecosystem File** (`ecosystem.config.js`):
```javascript
module.exports = {
  apps: [{
    name: 'auth-api',
    script: './index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 4000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

#### Option 2: Docker

**Dockerfile:**
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  auth-api:
    build: .
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - MONGO_URL=mongodb://mongo:27017/authdb
    depends_on:
      - mongo
  
  mongo:
    image: mongo:6
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

#### Option 3: Cloud Platforms

**Heroku:**
```bash
heroku create your-auth-api
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key
git push heroku main
```

**AWS/DigitalOcean/Azure:**
- Use managed Node.js hosting services
- Configure environment variables in platform dashboard
- Set up MongoDB Atlas or managed MongoDB service
- Configure load balancer and auto-scaling

### Environment-Specific Configuration

**Production `.env`:**
```env
NODE_ENV=production
PORT=4000
BASE_URL=https://api.yourdomain.com
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=<strong-random-secret-32-chars-minimum>
MAILTRAP_HOST=smtp.sendgrid.net
MAILTRAP_PORT=587
# ... other production configs
```

## 🔒 Security

### Implemented Security Features

| Feature | Implementation | Protection Against |
|---------|---------------|-------------------|
| **Password Hashing** | Bcrypt with 10 salt rounds | Password breaches, rainbow tables |
| **JWT Authentication** | Signed tokens with expiration | Unauthorized access |
| **HttpOnly Cookies** | Secure, HttpOnly cookie flags | XSS attacks, token theft |
| **Email Verification** | Cryptographically secure tokens | Fake accounts, spam |
| **CORS Configuration** | Restricted origin and methods | CSRF attacks, unauthorized domains |
| **Environment Variables** | Sensitive data in `.env` | Credential exposure |
| **Input Validation** | Required field validation | Injection attacks, malformed data |

### Security Best Practices

#### 1. Authentication & Authorization
- ✅ Use strong JWT secrets (minimum 32 characters, random)
- ✅ Implement token expiration (currently 24 hours)
- ✅ Use HTTPS in production (required for secure cookies)
- ⚠️ **Recommended**: Implement refresh tokens for better security
- ⚠️ **Recommended**: Add rate limiting to prevent brute force attacks
- ⚠️ **Recommended**: Implement account lockout after failed attempts

#### 2. Password Security
- ✅ Passwords hashed with bcrypt (10 rounds)
- ⚠️ **Recommended**: Enforce password complexity requirements
- ⚠️ **Recommended**: Implement password reset functionality
- ⚠️ **Recommended**: Add password history to prevent reuse

#### 3. Data Protection
- ✅ Sensitive data in environment variables
- ✅ Passwords never returned in API responses
- ⚠️ **Recommended**: Encrypt sensitive data at rest
- ⚠️ **Recommended**: Implement data sanitization
- ⚠️ **Recommended**: Add request size limits

#### 4. API Security
- ✅ CORS configured with specific origins
- ⚠️ **Recommended**: Implement rate limiting (express-rate-limit)
- ⚠️ **Recommended**: Add request validation (express-validator, joi)
- ⚠️ **Recommended**: Implement API versioning
- ⚠️ **Recommended**: Add request logging and monitoring

#### 5. Dependency Security
```bash
# Regularly audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

### Security Checklist for Production

- [ ] Change default JWT secret to strong random value
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure proper CORS origins (no wildcards)
- [ ] Set secure cookie flags (Secure, HttpOnly, SameSite)
- [ ] Implement rate limiting
- [ ] Add input validation and sanitization
- [ ] Set up security headers (helmet.js)
- [ ] Enable MongoDB authentication
- [ ] Use connection string with credentials
- [ ] Implement proper error handling (no stack traces in production)
- [ ] Set up security monitoring and alerting
- [ ] Regular dependency updates
- [ ] Implement logging and audit trails

### Recommended Security Packages

```bash
# Rate limiting
npm install express-rate-limit

# Security headers
npm install helmet

# Input validation
npm install express-validator

# Request sanitization
npm install express-mongo-sanitize
```

### Example: Enhanced Security Middleware

```javascript
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Security headers
app.use(helmet());

// MongoDB injection prevention
app.use(mongoSanitize());

// Apply rate limiting
app.use('/api/', limiter);
```

## ⚡ Performance

### Optimization Strategies

#### 1. Database Optimization
- **Indexes**: Add indexes on frequently queried fields (email, verificationToken)
- **Connection Pooling**: Mongoose handles connection pooling automatically
- **Query Optimization**: Use `.select()` to limit returned fields
- **Aggregation**: Use MongoDB aggregation for complex queries

#### 2. Caching
- **Token Caching**: Consider caching verified tokens (Redis)
- **User Data**: Cache frequently accessed user data
- **Response Caching**: Cache static responses where appropriate

#### 3. Code Optimization
- **Async/Await**: Already implemented for non-blocking operations
- **Error Handling**: Efficient error handling prevents unnecessary processing
- **Middleware Order**: Optimize middleware order for performance

#### 4. Monitoring
- Monitor response times
- Track database query performance
- Monitor memory usage
- Set up alerts for performance degradation

### Performance Metrics

| Metric | Target | Monitoring |
|--------|--------|-----------|
| Response Time | < 200ms | API monitoring tool |
| Database Query Time | < 50ms | MongoDB profiler |
| Uptime | 99.9% | Uptime monitoring |
| Error Rate | < 0.1% | Error tracking |

### Recommended Tools

- **APM**: New Relic, Datadog, or Application Insights
- **Logging**: Winston, Pino, or Bunyan
- **Monitoring**: PM2 Plus, Grafana, or CloudWatch

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Errors

**Error:** `Error connecting to MongoDB: ...`

**Solutions:**
- Verify MongoDB is running: `mongod --version`
- Check connection string in `.env` file
- Ensure MongoDB service is started: `brew services start mongodb-community` (macOS)
- Verify network connectivity to MongoDB instance
- Check MongoDB authentication credentials

#### 2. JWT Token Issues

**Error:** `Authentication failed, no token found`

**Solutions:**
- Ensure cookies are enabled in client
- Check CORS configuration allows credentials
- Verify `credentials: 'include'` in fetch requests
- Check cookie domain and path settings
- Ensure HTTPS in production (required for Secure cookies)

**Error:** `jwt malformed` or `invalid signature`

**Solutions:**
- Verify `JWT_SECRET` matches in all environments
- Check token expiration (tokens expire after 24 hours)
- Ensure token is properly formatted
- Verify token is being sent correctly (cookie vs header)

#### 3. Email Sending Failures

**Error:** `Email sending failed`

**Solutions:**
- Verify Mailtrap/email service credentials in `.env`
- Check SMTP host and port configuration
- Test email service connection separately
- Verify sender email is configured correctly
- Check firewall/network restrictions

#### 4. Password Hashing Issues

**Error:** `bcrypt hash error`

**Solutions:**
- Ensure bcrypt/bcryptjs is properly installed
- Check Node.js version compatibility
- Verify password is a string before hashing
- Check for circular dependencies

#### 5. CORS Errors

**Error:** `Access-Control-Allow-Origin` errors

**Solutions:**
- Verify `BASE_URL` in `.env` matches frontend URL
- Check CORS configuration in `index.js`
- Ensure `credentials: true` is set in CORS config
- Verify frontend includes `credentials: 'include'` in requests

#### 6. Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Solutions:**
```bash
# Find process using port 4000
lsof -ti:4000

# Kill process
kill -9 $(lsof -ti:4000)

# Or change PORT in .env file
```

#### 7. Module Not Found Errors

**Error:** `Cannot find module`

**Solutions:**
- Run `npm install` to install dependencies
- Check `package.json` for correct package names
- Verify Node.js version compatibility
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Debugging Tips

1. **Enable Verbose Logging**
   ```javascript
   // Add to index.js
   if (process.env.NODE_ENV !== 'production') {
     mongoose.set('debug', true);
   }
   ```

2. **Check Environment Variables**
   ```bash
   # Verify .env file is loaded
   node -e "require('dotenv').config(); console.log(process.env.MONGO_URL)"
   ```

3. **Test Database Connection**
   ```javascript
   // Test connection separately
   import mongoose from 'mongoose';
   mongoose.connect(process.env.MONGO_URL)
     .then(() => console.log('Connected'))
     .catch(err => console.error('Error:', err));
   ```

4. **Verify JWT Token**
   ```javascript
   // Decode token (without verification)
   const decoded = jwt.decode(token);
   console.log('Token payload:', decoded);
   ```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Contribution Process

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/Authentication_programm-1.git
   cd Authentication_programm-1
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed
   - Write tests for new features

4. **Commit Your Changes**
   ```bash
   git commit -m "feat: add password reset functionality"
   # Use conventional commits:
   # feat: new feature
   # fix: bug fix
   # docs: documentation changes
   # style: code style changes
   # refactor: code refactoring
   # test: adding tests
   # chore: maintenance tasks
   ```

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- Use ES6+ features
- Follow RESTful API conventions
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions focused and small
- Handle errors appropriately
- Write self-documenting code

### Pull Request Guidelines

- Provide clear description of changes
- Reference related issues
- Include tests if applicable
- Update documentation
- Ensure all tests pass
- Follow the existing code style

### Development Setup for Contributors

```bash
# Clone and setup
git clone <repo-url>
cd Authentication_programm-1
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm start
```

## 📚 Additional Resources

### Documentation
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [JWT.io](https://jwt.io/) - JWT Debugger and Documentation
- [Bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)

### Learning Resources
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Design](https://restfulapi.net/)
- [OWASP Security Guidelines](https://owasp.org/)

### Tools
- [Postman](https://www.postman.com/) - API Testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [JWT Debugger](https://jwt.io/) - Token Debugging

## 📝 License

This project is licensed under the **ISC License**.

```
Copyright (c) 2024

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

## 👥 Authors & Contributors

**Primary Developer**
- Developed with ❤️ for secure authentication solutions

**Contributors**
- See [Contributors](https://github.com/yourusername/Authentication_programm-1/graphs/contributors) page

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- MongoDB and Mongoose communities
- All open-source contributors whose packages made this possible

## 📞 Support

For support, please:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [Issues](https://github.com/yourusername/Authentication_programm-1/issues)
3. Create a new issue with detailed information

## 🗺 Roadmap

### Planned Features
- [ ] Password reset functionality
- [ ] Refresh token implementation
- [ ] Rate limiting middleware
- [ ] Comprehensive input validation
- [ ] Unit and integration tests
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Two-factor authentication (2FA)
- [ ] OAuth integration (Google, GitHub, etc.)
- [ ] Account management endpoints
- [ ] Admin dashboard API endpoints

### Known Limitations
- Basic input validation (recommend express-validator)
- No rate limiting (recommend express-rate-limit)
- No refresh token mechanism
- Limited error handling in some areas
- No comprehensive test coverage

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**

Made with ❤️ by the development community

[Report Bug](https://github.com/yourusername/Authentication_programm-1/issues) • [Request Feature](https://github.com/yourusername/Authentication_programm-1/issues) • [Documentation](#-api-documentation)

</div>

