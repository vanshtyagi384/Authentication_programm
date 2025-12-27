# 🔐 Authentication API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20.19.4-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.20.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**A secure and scalable Node.js authentication microservice with email verification**

[Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Docker](#-docker-deployment) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

A production-ready RESTful authentication API built with **Express.js** and **MongoDB**. This microservice provides comprehensive authentication and authorization capabilities including user registration, email verification, JWT-based authentication, and role-based access control (RBAC).

### Key Highlights

- 🚀 **Production-Ready** - Built with enterprise-grade security and error handling
- 🔒 **Secure by Default** - Password hashing, JWT tokens, HttpOnly cookies, and email verification
- 📦 **Modular Architecture** - Clean separation of concerns with MVC pattern
- 🐳 **Docker Support** - Complete Docker and Docker Compose configuration
- 🔄 **Scalable Design** - Stateless authentication suitable for microservices
- 📧 **Email Integration** - Automated email verification workflow

## ✨ Features

### Authentication & Authorization
- ✅ **User Registration** - Secure user registration with validation
- ✅ **Email Verification** - Cryptographically secure token-based email verification
- ✅ **JWT Authentication** - Industry-standard JSON Web Token implementation
- ✅ **Password Security** - Bcrypt hashing with salt rounds for password encryption
- ✅ **Role-Based Access Control (RBAC)** - Support for user and admin roles
- ✅ **Cookie-Based Sessions** - HttpOnly, Secure cookies for enhanced XSS protection

### Infrastructure
- ✅ **CORS Configuration** - Configurable Cross-Origin Resource Sharing
- ✅ **MongoDB Integration** - Production-ready database solution with Mongoose ODM
- ✅ **Environment-Based Configuration** - Secure environment variable management
- ✅ **Docker Support** - Complete containerization with Docker and Docker Compose
- ✅ **Error Handling** - Comprehensive error handling with appropriate HTTP status codes

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 20.19.4+ | JavaScript runtime environment |
| **Express.js** | 5.1.0 | Web framework for Node.js |
| **MongoDB** | 6.20.0 | NoSQL document database |
| **Mongoose** | 8.19.0 | MongoDB object modeling and ODM |
| **jsonwebtoken** | 9.0.2 | JWT token generation and verification |
| **bcryptjs** | 3.0.2 | Password hashing with bcrypt algorithm |
| **nodemailer** | 7.0.6 | Email delivery service integration |
| **dotenv** | 17.2.3 | Environment variable management |
| **cookie-parser** | 1.4.7 | HTTP cookie parsing middleware |
| **cors** | 2.8.5 | Cross-Origin Resource Sharing middleware |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.19.4 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Email Service** (Mailtrap, SendGrid, or similar for email verification)
- **Docker** (optional, for containerized deployment)

## 🚀 Installation

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/vanshtyagi384/Authentication_programm.git
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
   Edit the `.env` file with your configuration (see [Configuration](#-configuration))

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:4000`

### Option 2: Docker Deployment

For Docker deployment, see the [Docker Deployment Guide](./DOCKER_DEPLOYMENT.md) or use the quick start:

```bash
# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f
```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development
BASE_URL=http://localhost:4000

# Database Configuration
MONGO_URL=mongodb://localhost:27017/authdb
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
⚠️ **Important**: Never commit your `.env` file to version control. Always use strong, unique values for `JWT_SECRET` in production (minimum 32 characters).

## 📡 API Documentation

### Base URL
```
http://localhost:4000/api/v1/users
```

### Endpoints

#### 1. Register User

Creates a new user account and sends verification email.

**Endpoint:** `POST /api/v1/users/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "success": true
}
```

**Error Response:** `400 Bad Request`
```json
{
  "message": "User already exists",
  "success": false
}
```

---

#### 2. Verify Email

Verifies user email address using the token sent via email.

**Endpoint:** `GET /api/v1/users/verify/:token`

**URL Parameters:**
- `token` - Verification token received via email

**Success Response:** `200 OK`
```json
{
  "message": "User verified successfully",
  "success": true
}
```

---

#### 3. User Login

Authenticates user and returns JWT token.

**Endpoint:** `POST /api/v1/users/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6578bb1234567890",
    "name": "John Doe",
    "role": "user"
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "message": "Invalid email or password",
  "success": false
}
```

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

## 🐳 Docker Deployment

This project includes complete Docker support. For detailed Docker deployment instructions, see [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md).

### Quick Start with Docker

```bash
# Create .env file
cp .env.example .env

# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Docker Services

- **auth-api** - Authentication API service (port 4000)
- **mongodb** - MongoDB database service (port 27017)

## 📁 Project Structure

```
Authentication_programm-1/
├── controller/
│   └── user.controller.js          # Business logic for user operations
│
├── middleware/
│   └── auth.middleware.js          # Authentication middleware
│
├── model/
│   └── User.model.js               # Mongoose schema and model
│
├── routes/
│   └── user.routes.js              # API route definitions
│
├── utils/
│   └── db.js                      # Database connection utility
│
├── index.js                        # Application entry point
├── package.json                    # Dependencies and scripts
├── Dockerfile                      # Docker image configuration
├── docker-compose.yml              # Docker Compose configuration
├── DOCKER_DEPLOYMENT.md            # Docker deployment guide
└── README.md                       # Project documentation
```

## 💻 Development

### Available Scripts

```bash
# Start production server
npm start

# Start development server with hot-reload
npm run dev

# Install dependencies
npm install
```

### Development Best Practices

1. **Environment Variables**: Always use `.env` file for configuration
2. **Code Style**: Follow existing code style and conventions
3. **Error Handling**: Implement comprehensive error handling
4. **Testing**: Write tests for new features (recommended)

## 🔒 Security Features

- ✅ **Password Hashing** - Passwords hashed using bcrypt before storage
- ✅ **JWT Tokens** - Secure token-based authentication with expiration
- ✅ **HttpOnly Cookies** - Prevents XSS attacks
- ✅ **Email Verification** - Users must verify email before access
- ✅ **CORS Configuration** - Controlled cross-origin resource sharing
- ✅ **Environment Variables** - Sensitive data in environment variables

### Security Best Practices

1. Always use HTTPS in production
2. Use strong JWT secrets (minimum 32 characters)
3. Regularly update dependencies for security patches
4. Implement rate limiting (recommended)
5. Add comprehensive input validation (recommended)

## 🧪 Testing

While this project doesn't include tests yet, here's a recommended testing structure:

```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test
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
- [ ] Configure backup strategy

### Deployment Options

- **Docker**: Use `docker-compose.yml` for containerized deployment
- **PM2**: Process manager for Node.js applications
- **Cloud Platforms**: Heroku, AWS, DigitalOcean, Azure
- **Kubernetes**: For container orchestration

## 🔧 Troubleshooting

### Common Issues

**MongoDB Connection Errors**
- Verify MongoDB is running
- Check connection string in `.env` file
- Ensure network connectivity

**JWT Token Issues**
- Verify `JWT_SECRET` matches in all environments
- Check token expiration (24 hours)
- Ensure cookies are enabled in client

**Email Sending Failures**
- Verify email service credentials in `.env`
- Check SMTP host and port configuration
- Test email service connection separately

For more troubleshooting tips, see [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md).

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- Use ES6+ features
- Follow RESTful API conventions
- Use meaningful variable names
- Add comments for complex logic
- Handle errors appropriately

## 📝 License

This project is licensed under the **ISC License**.

## 👤 Author

**vanshtyagi384**

- GitHub: [@vanshtyagi384](https://github.com/vanshtyagi384)
- Email: vanshtyagi.tyagi012@gmail.com

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- MongoDB and Mongoose communities
- All open-source contributors whose packages made this possible

## 📞 Support

For support, please:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [Issues](https://github.com/vanshtyagi384/Authentication_programm/issues)
3. Create a new issue with detailed information

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**

Made with ❤️ by vanshtyagi384

[Report Bug](https://github.com/vanshtyagi384/Authentication_programm/issues) • [Request Feature](https://github.com/vanshtyagi384/Authentication_programm/issues)

</div>
