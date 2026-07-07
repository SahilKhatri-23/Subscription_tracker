# 🎯 Subscription Tracker API

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-FF6B6B?logo=jsonwebtokens)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Code Quality](https://img.shields.io/badge/Code%20Quality-Professional-brightgreen)](https://github.com/)

A **RESTful Backend API** for securely managing recurring subscriptions with JWT authentication, MongoDB integration, and enterprise-grade security features.

[Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Folder Structure](#-folder-structure)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [API Documentation](#-api-documentation)
- [API Endpoints](#-api-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Sample Requests & Responses](#-sample-requests--responses)
- [Database Schema](#-database-schema)
- [Error Response Format](#-error-response-format)
- [Security Features](#-security-features)
- [Future Improvements](#-future-improvements)
- [Deployment](#-deployment)
- [API Testing with Postman](#-api-testing-with-postman)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🎯 Project Overview

**Subscription Tracker API** is a comprehensive backend solution for managing recurring subscriptions (Netflix, Spotify, Gym memberships, AWS services, etc.). The API provides secure user authentication, subscription CRUD operations, billing cycle tracking, and renewal date management—all wrapped in a production-ready package with enterprise-grade security.

### Key Benefits:

- 🔐 **Security-First**: JWT-based authentication, bcrypt password hashing, rate limiting
- ⚡ **Performance**: Optimized MongoDB queries, efficient middleware stack
- 📊 **Scalability**: MVC architecture ready for microservices migration
- 🛡️ **Reliability**: Centralized error handling, input validation on all endpoints

---

## ✨ Features

> **Note:** Email automation features (verification emails, reminders, notifications) are **planned for future releases**. See [Future Improvements](#-future-improvements) for the roadmap.

| Feature                     | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| 👤 **User Registration**    | Create new user accounts with email validation          |
| 🔑 **JWT Authentication**   | Secure token-based authentication system                |
| 🔒 **Password Hashing**     | Industry-standard bcrypt encryption                     |
| 🛣️ **Protected Routes**     | Role-based access control for secured endpoints         |
| 📝 **CRUD Operations**      | Complete Create, Read, Update, Delete for subscriptions |
| 📅 **Billing Tracking**     | Track subscription renewal dates and billing cycles     |
| ✔️ **Input Validation**     | Express Validator integration for all endpoints         |
| 🚨 **Error Handling**       | Global error middleware with consistent response format |
| 🌍 **CORS Support**         | Cross-Origin Resource Sharing enabled                   |
| 🍪 **Cookie Management**    | Secure cookie handling for session management           |
| 🔐 **Environment Security** | Dotenv integration for secure configuration             |
| ⚠️ **Rate Limiting**        | Arcjet integration for DDoS & brute-force protection    |

---

## 🛠️ Tech Stack

### Backend Framework

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework

### Database

- **MongoDB** - NoSQL document database
- **Mongoose** - MongoDB object modeling

### Authentication & Security

- **JWT (JSON Web Tokens)** - Token-based authentication
- **bcrypt** - Password hashing library
- **Arcjet** - Security middleware for rate limiting

### Utilities

- **dotenv** - Environment variable management
- **Express Validator** - Input validation middleware
- **Cookie Parser** - Cookie parsing middleware
- **CORS** - Cross-Origin Resource Sharing
- **ESLint** - Code quality & style enforcement

---

## 🏗️ System Architecture

```
┌─────────────┐
│   Client    │ (Web/Mobile Application)
└──────┬──────┘
       │
       │ HTTP Requests
       ▼
┌─────────────────────────────────────────────┐
│         Express.js Server                   │
│  ┌──────────────────────────────────────┐   │
│  │  Routes (auth, user, subscription)   │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  Middlewares (Auth, Error, Arcjet)   │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  Controllers (Business Logic)        │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  Models (Data Schema - Mongoose)     │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
       │
       │ Database Queries
       ▼
┌─────────────────────────────┐
│  MongoDB Database           │
│  (Collections & Documents)  │
└─────────────────────────────┘
```

### MVC Architecture Pattern

- **Models** - Define data schema and database interactions
- **Views** - JSON API responses (REST standard)
- **Controllers** - Handle business logic and route handlers

---

## 📁 Folder Structure

```
subscription-tracker/
├── 📄 app.js                      # Express app initialization & middleware setup
├── 📄 package.json                # Project dependencies & scripts
├── 📄 eslint.config.js            # ESLint configuration
├── 📄 README.md                   # Project documentation
│
├── 📁 config/
│   ├── env.js                     # Environment variable configuration
│   └── arcjet.js                  # Arcjet security middleware setup
│
├── 📁 controllers/
│   ├── auth.controller.js         # Authentication logic (register, login, logout)
│   ├── user.controller.js         # User profile management
│   └── subscription.controller.js # Subscription CRUD operations
│
├── 📁 routes/
│   ├── auth.routes.js             # Authentication endpoints
│   ├── user.routes.js             # User management endpoints
│   └── subscription.routes.js     # Subscription management endpoints
│
├── 📁 models/
│   ├── user.model.js              # User schema (email, password, profile)
│   └── subscription.model.js      # Subscription schema (name, amount, date)
│
├── 📁 middlewares/
│   ├── auth.middleware.js         # JWT verification & authorization
│   ├── error.middleware.js        # Global error handler
│   └── arcjet.middleware.js       # Rate limiting & security checks
│
└── 📁 database/
    └── mongodb.js                 # MongoDB connection setup
```

---

## 📥 Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/subscription-tracker.git
cd subscription-tracker
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env.development.local
   ```
2. Edit `.env.development.local` and add your actual configuration values
3. **⚠️ IMPORTANT:** Never commit `.env` files to Git! They're already in `.gitignore`

(See [Environment Variables](#-environment-variables) section for detailed configurations)

### Step 4: Start the Server

```bash
npm run dev
```

Your API is now running! ✅

---

## 🔧 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/subscription-tracker
# For MongoDB Atlas Cloud:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/subscription-tracker

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Arcjet Configuration
ARCJET_KEY=your_arcjet_key

# Application
APP_NAME=Subscription Tracker API
APP_VERSION=1.0.0
```

### Important Security Notes:

⚠️ **Never commit `.env` files to version control!**

✅ **What's Already Protected:**

- All `.env*` files are in `.gitignore` and won't be pushed to GitHub
- `.env.example` IS committed - it shows developers what variables are needed

**Your Workflow:**

1. Copy `.env.example` → `.env.development.local`
2. Add your actual secrets to `.env.development.local`
3. Git automatically ignores it ✅

**Additional Security Best Practices:**

- ✅ Use strong JWT_SECRET (min 32 characters - generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- ✅ Use environment-specific values for development vs production
- ✅ Rotate secrets periodically
- ✅ For production, use secret management services (AWS Secrets Manager, HashiCorp Vault)
- ✅ Never hardcode secrets in code
- ✅ Add personal API keys to `.env.*.local` - they're in `.gitignore`

---

## 🚀 Running the Project

### Development Mode

```bash
npm run dev
```

Runs the server with auto-reload using `nodemon`.

### Production Mode

```bash
npm start
```

Runs the server in standard mode.

### Other Scripts

```bash
# Run ESLint to check code quality
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Run tests (if configured)
npm test
```

---

## 🌐 API Documentation

### API Base URL

```
Local Development:  http://localhost:5000
Production:         https://api.yourdomain.com
```

### Response Format

All API responses follow a consistent JSON structure:

**Success Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

---

## 📚 API Endpoints

### Authentication Endpoints

| Method | Endpoint                  | Description                    | Auth Required |
| ------ | ------------------------- | ------------------------------ | ------------- |
| `POST` | `/api/auth/register`      | Register a new user            | ❌ No         |
| `POST` | `/api/auth/login`         | Login user & get JWT token     | ❌ No         |
| `POST` | `/api/auth/logout`        | Logout user & invalidate token | ✅ Yes        |
| `POST` | `/api/auth/refresh-token` | Refresh JWT token              | ✅ Yes        |

### User Endpoints

| Method   | Endpoint              | Description              | Auth Required |
| -------- | --------------------- | ------------------------ | ------------- |
| `GET`    | `/api/users/profile`  | Get current user profile | ✅ Yes        |
| `PUT`    | `/api/users/profile`  | Update user profile      | ✅ Yes        |
| `DELETE` | `/api/users/account`  | Delete user account      | ✅ Yes        |
| `GET`    | `/api/users/settings` | Get user settings        | ✅ Yes        |
| `PUT`    | `/api/users/settings` | Update user settings     | ✅ Yes        |

### Subscription Endpoints

| Method   | Endpoint                     | Description                | Auth Required |
| -------- | ---------------------------- | -------------------------- | ------------- |
| `POST`   | `/api/subscriptions`         | Create a new subscription  | ✅ Yes        |
| `GET`    | `/api/subscriptions`         | Get all user subscriptions | ✅ Yes        |
| `GET`    | `/api/subscriptions/:id`     | Get subscription details   | ✅ Yes        |
| `PUT`    | `/api/subscriptions/:id`     | Update subscription        | ✅ Yes        |
| `DELETE` | `/api/subscriptions/:id`     | Delete subscription        | ✅ Yes        |
| `GET`    | `/api/subscriptions/active`  | Get active subscriptions   | ✅ Yes        |
| `GET`    | `/api/subscriptions/expired` | Get expired subscriptions  | ✅ Yes        |

### Health Check

| Method | Endpoint      | Description       | Auth Required |
| ------ | ------------- | ----------------- | ------------- |
| `GET`  | `/api/health` | API health status | ❌ No         |

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     JWT Authentication Flow                     │
└─────────────────────────────────────────────────────────────────┘

1. USER REGISTRATION
   ┌────────────────────────────────────────────┐
   │ POST /api/auth/register                    │
   │ Body: { email, password, name }            │
   └────────────────────────────────────────────┘
                        ↓
   ┌────────────────────────────────────────────┐
   │ Password hashed with bcrypt (10 salt rounds)│
   │ User stored in MongoDB                     │
   └────────────────────────────────────────────┘
                        ↓
   ┌────────────────────────────────────────────┐
   │ Response: { success: true, message: ... }  │
   └────────────────────────────────────────────┘

2. USER LOGIN
   ┌────────────────────────────────────────────┐
   │ POST /api/auth/login                       │
   │ Body: { email, password }                  │
   └────────────────────────────────────────────┘
                        ↓
   ┌────────────────────────────────────────────┐
   │ Validate credentials                       │
   │ Compare password with bcrypt               │
   └────────────────────────────────────────────┘
                        ↓
   ┌────────────────────────────────────────────┐
   │ Generate JWT Token (expires in 7 days)     │
   │ Store in httpOnly cookie                   │
   └────────────────────────────────────────────┘
                        ↓
   ┌────────────────────────────────────────────┐
   │ Response: {                                │
   │   success: true,                           │
   │   token: "eyJhbGc...",                     │
   │   user: { id, email, name }                │
   │ }                                          │
   └────────────────────────────────────────────┘

3. PROTECTED REQUEST (Using JWT)
   ┌────────────────────────────────────────────┐
   │ GET /api/subscriptions                     │
   │ Headers: {                                 │
   │   Authorization: "Bearer eyJhbGc..."       │
   │ }                                          │
   └────────────────────────────────────────────┘
                        ↓
   ┌────────────────────────────────────────────┐
   │ Auth Middleware:                           │
   │ - Extract token from header                │
   │ - Verify token signature                   │
   │ - Check expiration                         │
   └────────────────────────────────────────────┘
                        ↓
        ┌─────────────┬──────────────┐
        │             │              │
      VALID        EXPIRED      INVALID
        │             │              │
        ✅            ❌             ❌
   Continue       Reject         Reject
```

---

## 📤 Sample Requests & Responses

<details>
<summary><b>1️⃣ User Registration</b></summary>

**Request:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

**Response (Success):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "65a4c8f2b1c2d3e4f5g6h7i8",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Response (Error):**

```json
{
  "success": false,
  "message": "User already exists",
  "errors": ["Email already registered"]
}
```

</details>

<details>
<summary><b>2️⃣ User Login</b></summary>

**Request:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "65a4c8f2b1c2d3e4f5g6h7i8",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

</details>

<details>
<summary><b>3️⃣ Create Subscription</b></summary>

**Request:**

```bash
curl -X POST http://localhost:5000/api/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "Netflix Premium",
    "category": "Entertainment",
    "amount": 15.99,
    "currency": "USD",
    "billingCycle": "monthly",
    "renewalDate": "2024-02-15",
    "description": "Monthly Netflix subscription"
  }'
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Subscription created successfully",
  "data": {
    "subscription": {
      "_id": "65a4c9f3b1c2d3e4f5g6h7i9",
      "userId": "65a4c8f2b1c2d3e4f5g6h7i8",
      "name": "Netflix Premium",
      "category": "Entertainment",
      "amount": 15.99,
      "currency": "USD",
      "billingCycle": "monthly",
      "renewalDate": "2024-02-15",
      "status": "active",
      "createdAt": "2024-01-15T11:45:00Z"
    }
  }
}
```

</details>

<details>
<summary><b>4️⃣ Get All Subscriptions</b></summary>

**Request:**

```bash
curl -X GET http://localhost:5000/api/subscriptions \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Subscriptions retrieved successfully",
  "data": {
    "subscriptions": [
      {
        "_id": "65a4c9f3b1c2d3e4f5g6h7i9",
        "name": "Netflix Premium",
        "amount": 15.99,
        "billingCycle": "monthly",
        "renewalDate": "2024-02-15",
        "status": "active"
      },
      {
        "_id": "65a4c9f4b1c2d3e4f5g6h7j0",
        "name": "Spotify Premium",
        "amount": 9.99,
        "billingCycle": "monthly",
        "renewalDate": "2024-02-10",
        "status": "active"
      }
    ],
    "totalCount": 2,
    "activeCount": 2
  }
}
```

</details>

<details>
<summary><b>5️⃣ Update Subscription</b></summary>

**Request:**

```bash
curl -X PUT http://localhost:5000/api/subscriptions/65a4c9f3b1c2d3e4f5g6h7i9 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "amount": 17.99,
    "renewalDate": "2024-03-15"
  }'
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Subscription updated successfully",
  "data": {
    "subscription": {
      "_id": "65a4c9f3b1c2d3e4f5g6h7i9",
      "name": "Netflix Premium",
      "amount": 17.99,
      "renewalDate": "2024-03-15",
      "updatedAt": "2024-01-15T12:00:00Z"
    }
  }
}
```

</details>

<details>
<summary><b>6️⃣ Delete Subscription</b></summary>

**Request:**

```bash
curl -X DELETE http://localhost:5000/api/subscriptions/65a4c9f3b1c2d3e4f5g6h7i9 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Subscription deleted successfully",
  "data": {
    "deletedId": "65a4c9f3b1c2d3e4f5g6h7i9"
  }
}
```

</details>

---

## 📊 Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  profileImage: String,
  bio: String,
  createdAt: Date (default: now),
  updatedAt: Date (default: now),
  lastLogin: Date,
  isActive: Boolean (default: true),
  verificationToken: String,
  isEmailVerified: Boolean (default: false)
}
```

**Indexes:**

- `email` - Unique index for fast lookups
- `createdAt` - For sorting by registration date

### Subscription Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User, required),
  name: String (required),
  category: String (Entertainment, Software, Fitness, etc.),
  description: String,
  amount: Number (required, decimal),
  currency: String (default: "USD"),
  billingCycle: String (monthly, yearly, quarterly, weekly),
  renewalDate: Date (required),
  startDate: Date (default: now),
  status: String (active, paused, cancelled),
  autoRenew: Boolean (default: true),
  notifications: {
    enabled: Boolean,
    daysBefore: Number (default: 3)
  },
  tags: [String],
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

**Indexes:**

- `userId` - For fast user-specific queries
- `renewalDate` - For sorting by upcoming renewals
- `status` - For filtering active subscriptions

---

## ⚠️ Error Response Format

All errors follow a consistent format for easy client-side handling:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": ["Specific error detail 1", "Specific error detail 2"],
  "statusCode": 400
}
```

### Common Error Codes

| Status Code | Message               | Cause                                     |
| ----------- | --------------------- | ----------------------------------------- |
| `400`       | Bad Request           | Invalid input data                        |
| `401`       | Unauthorized          | Missing or invalid JWT token              |
| `403`       | Forbidden             | Insufficient permissions                  |
| `404`       | Not Found             | Resource doesn't exist                    |
| `409`       | Conflict              | Resource already exists (duplicate email) |
| `429`       | Too Many Requests     | Rate limit exceeded                       |
| `500`       | Internal Server Error | Unexpected server error                   |

### Example Error Responses

**Validation Error (400):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Email must be valid", "Password must be at least 8 characters"],
  "statusCode": 400
}
```

**Authentication Error (401):**

```json
{
  "success": false,
  "message": "Authentication failed",
  "errors": ["Invalid credentials"],
  "statusCode": 401
}
```

**Not Found Error (404):**

```json
{
  "success": false,
  "message": "Resource not found",
  "errors": ["Subscription with ID 65a4c9f3b1c2d3e4f5g6h7i9 not found"],
  "statusCode": 404
}
```

---

## 🔒 Security Features

### 🛡️ Authentication & Authorization

- ✅ JWT-based stateless authentication
- ✅ Secure password hashing with bcrypt (10 salt rounds)
- ✅ Protected routes with middleware validation
- ✅ Token expiration (7 days default)
- ✅ Refresh token mechanism

### 🚨 Rate Limiting & DDoS Protection

- ✅ Arcjet integration for request rate limiting
- ✅ IP-based rate limiting
- ✅ Brute-force attack prevention
- ✅ Configurable request thresholds

### 📝 Input Validation

- ✅ Express Validator on all endpoints
- ✅ Email format validation
- ✅ Password strength requirements
- ✅ Type checking and sanitization

### 🌐 HTTP Security Headers

- ✅ CORS configuration
- ✅ Cookie security (httpOnly, Secure, SameSite)
- ✅ Environment-based configuration

### 📋 Best Practices

- ✅ Never logging sensitive data
- ✅ Environment variables for secrets
- ✅ HTTPS enforced in production
- ✅ MongoDB connection string secured
- ✅ Regular security updates for dependencies

### 🔐 Additional Security Measures

```javascript
// Example: Secure Password Validation
const validatePassword = (password) => {
  const requirements = {
    minLength: 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password),
  };
  return Object.values(requirements).every((val) => val === true);
};
```

---

## 🚀 Future Improvements

- [ ] **Email Verification** - Verify user email before account activation
- [ ] **Two-Factor Authentication (2FA)** - SMS/TOTP-based 2FA
- [ ] **Payment Gateway Integration** - Stripe/PayPal for automatic billing
- [ ] **Subscription Reminders** - Email/SMS notifications before renewal
- [ ] **Analytics Dashboard** - Monthly spending analytics
- [ ] **Multi-Currency Support** - Real-time currency conversion
- [ ] **Budget Alerts** - Notify users when spending exceeds limits
- [ ] **Subscription Recommendations** - AI-based suggestions
- [ ] **Mobile App Integration** - iOS/Android app support
- [ ] **Export Features** - Export subscription data as CSV/PDF
- [ ] **Shared Subscriptions** - Family/group subscription sharing
- [ ] **API Rate Limiting Dashboard** - Visual rate limit monitoring
- [ ] **Webhook Support** - Event-driven integrations
- [ ] **Advanced Search & Filters** - Full-text search capabilities
- [ ] **Audit Logs** - Track user actions and changes

---

## 📦 Deployment

### Option 1: Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# Deploy
git push heroku main
```

### Option 2: Deploy to AWS EC2

```bash
# 1. Launch EC2 instance (Ubuntu 20.04)
# 2. Connect via SSH
ssh -i your-key.pem ec2-user@your-instance-ip

# 3. Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18

# 4. Clone and setup project
git clone https://github.com/yourusername/subscription-tracker.git
cd subscription-tracker
npm install

# 5. Install PM2 for process management
npm install -g pm2
pm2 start app.js --name "subscription-tracker"
pm2 startup
pm2 save

# 6. Configure Nginx as reverse proxy
sudo apt install nginx
# Configure /etc/nginx/sites-available/default
sudo systemctl restart nginx
```

### Option 3: Deploy to Vercel (with serverless functions)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 4: Docker Deployment

**Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**docker-compose.yml:**

```yaml
version: "3.8"

services:
  api:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/subscription-tracker
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

**Deploy with Docker:**

```bash
docker-compose up -d
```

---

## 🧪 API Testing with Postman

### Import Collection Steps:

1. **Download Postman** - [Get Postman](https://www.postman.com/downloads/)

2. **Import Collection**
   - Open Postman → Click "Import"
   - Paste the following or select file:

   ```
   https://raw.githubusercontent.com/yourusername/subscription-tracker/main/postman-collection.json
   ```

3. **Setup Environment Variables**
   - Click "Environments" → "Create New"
   - Add variables:
     ```
     base_url: http://localhost:5000
     token: (will be auto-filled after login)
     ```

4. **Test Endpoints**
   - Run Auth → Register request
   - Copy token from response
   - Set environment variable `token`
   - Test other protected endpoints

### Quick Test Commands:

```bash
# Start API
npm run dev

# In another terminal, test endpoints
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test@123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123456"}'

# Create Subscription (use token from login)
curl -X POST http://localhost:5000/api/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name":"Netflix","amount":15.99,"billingCycle":"monthly","renewalDate":"2024-02-15"}'
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. **Fork the Repository**

   ```bash
   git clone https://github.com/yourusername/subscription-tracker.git
   ```

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow ESLint rules: `npm run lint`
   - Write clean, documented code
   - Add comments for complex logic

4. **Commit with Clear Messages**

   ```bash
   git commit -m "feat: add amazing feature"
   ```

   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance

5. **Push to Your Fork**

   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**
   - Describe your changes clearly
   - Reference related issues
   - Add screenshots for UI changes

### Code Standards

- ✅ Use ES6+ syntax
- ✅ Follow ESLint configuration
- ✅ Add comments for complex functions
- ✅ Test before submitting PR
- ✅ Keep commits atomic

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary:

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ Liability limited
- ❌ Warranty not provided

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

### Connect With Me

- 🐦 [Twitter](https://twitter.com/yourhandle)
- 💼 [LinkedIn](https://linkedin.com/in/yourprofile)
- 📧 [Email](mailto:your.email@example.com)

---

<div align="center">

### ⭐ If you found this project helpful, please consider giving it a star!

**Made with ❤️ by [Your Name]**

[Back to Top](#-subscription-tracker-api)

</div>
