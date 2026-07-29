# 🚀 GearUp - Sports & Outdoor Gear Rental Management System

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge">
  <img src="https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge">
</p>

<p align="center">
A complete Role-Based Sports & Outdoor Gear Rental Management REST API built with Express.js, TypeScript, Prisma ORM and PostgreSQL.
</p>

---

# 📖 Table of Contents

- Project Overview
- Live API
- Features
- User Roles
- Tech Stack
- Project Architecture
- Installation
- Environment Variables
- Running the Project
- Available Scripts
- Project Structure
- Authentication
- API Documentation
- Order Lifecycle
- Payment Flow
- Error Handling
- License

---

# 📌 Project Overview

**GearUp** is a complete backend REST API designed for renting sports and outdoor equipment.

The system allows customers to browse equipment, place rental orders, complete online payments, and submit reviews after returning rented items.

Providers can manage their inventory, update rental order statuses, and maintain stock availability.

Administrators oversee the entire platform by managing users, categories, gear listings, and rental orders.

The entire application follows a **Module-Based Architecture** with **Role-Based Access Control (RBAC)** to ensure secure access to every protected endpoint.

---

# 🌐 Live API

```
https://gearup-xi.vercel.app
```

Base URL

```
https://gearup-xi.vercel.app/api
```

---

# ✨ Features

## 🌍 Public Features

- Browse all available gear
- View gear details
- User Registration
- User Login
- JWT Authentication

---

## 👤 Customer Features

- Register/Login
- Update Profile
- Browse Available Gear
- Rent Multiple Gear Items
- Track Rental Orders
- Make Online Payments
- View Payment History
- Leave Reviews After Returning Items

---

## 🏪 Provider Features

- Add New Gear
- Update Existing Gear
- Delete Gear
- Manage Inventory
- View Customer Orders
- Confirm Orders
- Mark Gear as Picked Up
- Mark Orders as Returned
- Cancel Orders

---

## 👨‍💼 Admin Features

- Manage Users
- Suspend/Activate Users
- Manage Categories
- View Every Rental
- View Every Gear Listing
- Monitor Entire Platform

---

# 👥 User Roles

GearUp follows **Role-Based Access Control (RBAC).**

There are **three different user roles**.

| Role | Description |
|-------|-------------|
| CUSTOMER | Rent sports equipment |
| PROVIDER | Manage gear inventory and rental orders |
| ADMIN | Manage the whole platform |

---

## CUSTOMER Permissions

- Register
- Login
- Update Profile
- Browse Gear
- Create Rental Orders
- Make Payments
- View Payments
- Track Rental Orders
- Submit Reviews

---

## PROVIDER Permissions

- Add Gear
- Update Gear
- Delete Gear
- View Incoming Orders
- Update Rental Status

---

## ADMIN Permissions

- Manage Users
- Suspend Users
- Activate Users
- Manage Categories
- View Every Rental
- View Every Gear Listing

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL

## ORM

- Prisma ORM

## Authentication

- JWT (JSON Web Token)

## Password Encryption

- bcryptjs

## Payment Gateway

- Stripe

## Environment

- dotenv

## API Testing

- Postman

## Deployment

- Vercel

---

# 📦 NPM Packages

## Dependencies

```json
{
  "@prisma/adapter-pg": "^7.9.0",
  "@prisma/client": "^7.9.0",
  "bcryptjs": "^3.0.3",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "http-status": "^2.1.0",
  "jsonwebtoken": "^9.0.3",
  "pg": "^8.22.0",
  "stripe": "^22.3.2"
}
```

---

## Development Dependencies

```json
{
  "@types/cookie-parser": "^1.4.10",
  "@types/cors": "^2.8.19",
  "@types/express": "^5.0.6",
  "@types/jsonwebtoken": "^9.0.10",
  "@types/node": "^26.1.1",
  "@types/pg": "^8.20.0",
  "prisma": "^7.9.0",
  "tsx": "^4.23.1",
  "typescript": "^7.0.2"
}
```

---

# 🏗 Project Architecture

The project follows a **Module-Based Architecture**, where each feature is organized into its own module.

Example:

```
src/
│
├── app/
│
├── modules/
│   │
│   ├── auth/
│   ├── user/
│   ├── provider/
│   ├── gear/
│   ├── rental/
│   ├── payment/
│   ├── review/
│   ├── category/
│   └── admin/
│
├── middleware/
│
├── config/
│
├── routes/
│
├── utils/
│
└── server.ts
```

Every module contains its own

- Controller
- Service
- Route
- Validation
- Interface
- Constants

making the project highly scalable and easy to maintain.

---

# 🔐 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Protected Routes
- Input Validation
- Secure Environment Variables
- Cookie Parser
- CORS Enabled

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/gearup.git
```

Go to the project

```bash
cd gearup
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Database Migration

```bash
npx prisma migrate dev
```

Start Development Server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_ACCESS_SECRET=your_jwt_secret

JWT_ACCESS_EXPIRES_IN=7d

STRIPE_SECRET_KEY=your_stripe_secret_key

CLIENT_URL=http://localhost:3000
```

> Replace every value with your own credentials before running the application.

---

# ▶️ Running the Project

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Production

```bash
npm start
```

---

# 📜 Available Scripts

| Script | Description |
|----------|-------------|
| npm run dev | Starts development server using TSX |
| npm run build | Builds the TypeScript project |
| npm start | Starts the production server |
| npm test | Runs tests (currently placeholder) |
| npm run stripe:webhook | Listen for Stripe webhook events |

---

# 📂 Project Structure

```
gearup/
│
├── prisma/
├── src/
│
├── app/
│   ├── modules/
│   ├── middleware/
│   ├── config/
│   ├── routes/
│   ├── interfaces/
│   ├── utils/
│   └── constants/
│
├── package.json
├── tsconfig.json
├── prisma.schema
├── .env
└── README.md
```

---

# 🔑 Default Admin Credentials

Use the following credentials to access all **Admin-only** APIs.

**Email**

```text
admin@gmail.com
```

**Password**

```text
12345
```

---

## ✅ Next Part

The next section will include:

- Authentication Guide
- JWT Usage
- Register API
- Login API
- Profile APIs
- Public Gear APIs
- Complete request & response examples
- Authorization guide
- HTTP status codes
# 🔐 Authentication

Most endpoints in GearUp are protected using **JWT (JSON Web Token)** authentication.

After a successful login, the server returns a JWT access token. Include this token in the Authorization header when accessing protected routes.

Example:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# 🔒 Authorization Rules

| Role | Accessible Modules |
|-------|--------------------|
| Public | Authentication, Public Gear |
| CUSTOMER | Profile, Rentals, Payments, Reviews |
| PROVIDER | Provider Dashboard, Gear Management, Provider Orders |
| ADMIN | Users, Categories, All Rentals, All Gear |

---

# 📌 Authentication APIs

Base URL

```
https://gearup-xi.vercel.app/api
```

---

# 👤 Register User

Register a new customer or provider account.

### Endpoint

```http
POST /auth/register
```

### Full URL

```http
https://gearup-xi.vercel.app/api/auth/register
```

### Authorization

```
Public
```

### Request Body

```json
{
  "name": "hossain",
  "email": "hossain@gmail.com",
  "phone": "+8801712345678",
  "password": "12345",
  "role": "CUSTOMER"
}
```

### Available Roles

```text
CUSTOMER
PROVIDER
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "name": "hossain",
    "email": "hossain@gmail.com",
    "role": "CUSTOMER"
  }
}
```

---

# 🔑 Login

Login using email and password.

### Endpoint

```http
POST /auth/login
```

### Full URL

```http
https://gearup-xi.vercel.app/api/auth/login
```

### Authorization

```
Public
```

### Request Body

```json
{
  "email": "admin@gmail.com",
  "password": "12345"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_ACCESS_TOKEN"
}
```

Save this token because it will be required for all protected endpoints.

---

# 🙋 Get Logged-in User Profile

Returns the profile information of the currently authenticated user.

### Endpoint

```http
GET /auth/me
```

### Full URL

```http
https://gearup-xi.vercel.app/api/auth/me
```

### Authorization

```
Bearer Token Required
```

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "Admin",
    "email": "admin@gmail.com",
    "phone": "+8801712345678",
    "role": "ADMIN"
  }
}
```

---

# ✏️ Update Profile

Update your own profile.

### Endpoint

```http
PATCH /auth/my-profile
```

### Full URL

```http
https://gearup-xi.vercel.app/api/auth/my-profile
```

### Authorization

```
Bearer Token Required
```

### Request Body

```json
{
  "name": "admin",
  "email": "yournewemail@gmail.com",
  "phone": "+01961111111111"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

---

# 🌍 Public Gear APIs

These endpoints can be accessed without logging in.

---

# 📦 Get All Gear

Returns every available gear item.

### Endpoint

```http
GET /gear
```

### Full URL

```http
https://gearup-xi.vercel.app/api/gear
```

### Authorization

```
Public
```

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "id": "gear_id",
      "name": "Rickshaw",
      "brand": "Burton",
      "model": "Custom X",
      "pricePerDay": 45,
      "availableStock": 2,
      "condition": "GOOD",
      "isAvailable": true,
      "image": "/images/gear/snowboard.jpg"
    }
  ]
}
```

---

# 🔍 Get Gear By ID

Returns a single gear item.

### Endpoint

```http
GET /gear/:id
```

### Full URL

```http
https://gearup-xi.vercel.app/api/gear/id_of_the_gear_item
```

### Authorization

```
Public
```

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "gear_id",
    "name": "Rickshaw",
    "description": "Versatile snowboard with hybrid camber profile.",
    "brand": "Burton",
    "model": "Custom X",
    "pricePerDay": 45,
    "availableStock": 2,
    "condition": "GOOD",
    "image": "/images/gear/snowboard.jpg",
    "isAvailable": true,
    "categoryId": "cms4rxifi0004nguioz8dmsxo"
  }
}
```

---

# 📖 API Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# ❌ Error Response Format

All API errors follow a consistent structure.

```json
{
  "success": false,
  "message": "Unauthorized Access",
  "error": {
    "statusCode": 401
  }
}
```

---

# 🔐 Protected Route Example

Include your JWT token in every protected request.

```http
GET /api/auth/me
```

Headers

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# 📌 Endpoints Covered in Part 2

### Authentication

- ✅ Register User
- ✅ Login
- ✅ Get Profile
- ✅ Update Profile

### Public

- ✅ Get All Gear
- ✅ Get Gear By ID

---

## ✅ Next Part (Part 3)

The next section will include:

- Provider APIs
- Add Gear
- Update Gear
- Delete Gear
- Provider Orders
- Update Rental Status
- Customer Rental APIs
- Create Rental
- Get Rentals
- Track Rental by ID
- Complete request and response examples

# 👨‍💻 Provider APIs

> **Authorization Required:** `PROVIDER`

Every endpoint in this section requires a valid **JWT Bearer Token** from a user with the **PROVIDER** role.

Example Header

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# ➕ Add New Gear

Providers can create a new gear listing.

### Endpoint

```http
POST /provider/gear
```

### Full URL

```http
https://gearup-xi.vercel.app/api/provider/gear
```

### Authorization

```
PROVIDER
```

### Request Body

```json
{
  "name": "Rickshaw",
  "description": "Versatile snowboard with hybrid camber profile, sintered base, and carbon fiber reinforcement. Suitable for all terrain types.",
  "brand": "Burton",
  "model": "Custom X",
  "pricePerDay": 45,
  "availableStock": 2,
  "condition": "GOOD",
  "image": "/images/gear/snowboard.jpg",
  "categoryId": "cms4rxifi0004nguioz8dmsxo",
  "isAvailable": true
}
```

### Success Response

```json
{
  "success": true,
  "message": "Gear added successfully"
}
```

---

# ✏️ Update Gear

Update any existing gear owned by the provider.

### Endpoint

```http
PUT /provider/gear/:id
```

### Full URL

```http
https://gearup-xi.vercel.app/api/provider/gear/id_of_the_gear_item
```

### Authorization

```
PROVIDER
```

### Sample Request

```json
{
  "name": "Mountain Bike",
  "description": "Updated description",
  "brand": "Trek",
  "model": "Marlin 8",
  "pricePerDay": 60,
  "availableStock": 5,
  "condition": "EXCELLENT",
  "image": "/images/gear/bike.jpg",
  "categoryId": "cms4rxifi0004nguioz8dmsxo",
  "isAvailable": true
}
```

### Success Response

```json
{
  "success": true,
  "message": "Gear updated successfully"
}
```

---

# ❌ Delete Gear

Delete a gear item.

### Endpoint

```http
DELETE /provider/gear/:id
```

### Full URL

```http
https://gearup-xi.vercel.app/api/provider/gear/id_of_the_gear_item
```

### Authorization

```
PROVIDER
```

### Success Response

```json
{
  "success": true,
  "message": "Gear deleted successfully"
}
```

---

# 📦 Get Provider Orders

Returns every rental order related to the logged-in provider.

### Endpoint

```http
GET /provider/orders
```

### Full URL

```http
https://gearup-xi.vercel.app/api/provider/orders
```

### Authorization

```
PROVIDER
```

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "id": "rental_order_id",
      "customer": "Hossain",
      "status": "PLACED",
      "startDate": "2026-08-01",
      "endDate": "2026-08-05"
    }
  ]
}
```

---

# 🔄 Update Rental Order Status

Providers can update the status of a rental order.

### Endpoint

```http
PATCH /provider/orders/:id
```

### Full URL

```http
https://gearup-xi.vercel.app/api/provider/orders/id_of_the_rental_order
```

> **Note:** Replace `:id` with the actual rental order ID.

### Authorization

```
PROVIDER
```

### Available Status

```text
CONFIRMED
PICKED_UP
RETURNED
CANCELLED
```

### Request Body

```json
{
  "status": "CONFIRMED"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Rental order status updated successfully"
}
```

---

# 👤 Customer APIs

> **Authorization Required:** `CUSTOMER`

All endpoints below require a valid **CUSTOMER** account.

---

# 🛒 Create Rental Order

Create a new rental order.

### Endpoint

```http
POST /rentals
```

### Full URL

```http
https://gearup-xi.vercel.app/api/rentals
```

### Authorization

```
CUSTOMER
```

### Request Body

```json
{
  "startDate": "2026-08-01",
  "endDate": "2026-08-05",
  "items": [
    {
      "gearItemId": "f40fb54f-3073-433a-aaf6-0dc9dc4afafd",
      "quantity": 2
    },
    {
      "gearItemId": "813b134b-49d7-469d-9373-f20b945fa80e",
      "quantity": 2
    }
  ]
}
```

### Success Response

```json
{
  "success": true,
  "message": "Rental order created successfully"
}
```

---

# 📋 Get Customer Rental Orders

Returns every rental order of the logged-in customer.

### Endpoint

```http
GET /rentals
```

### Full URL

```http
https://gearup-xi.vercel.app/api/rentals
```

### Authorization

```
CUSTOMER
```

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "id": "rental_order_id",
      "status": "PLACED",
      "startDate": "2026-08-01",
      "endDate": "2026-08-05",
      "totalAmount": 180
    }
  ]
}
```

---

# 📍 Track Rental Order

Retrieve a specific rental order by its ID.

### Endpoint

```http
GET /rentals/:id
```

### Full URL

```http
https://gearup-xi.vercel.app/api/rentals/id_of_the_rental_order
```

### Authorization

```
CUSTOMER
```

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "rental_order_id",
    "status": "CONFIRMED",
    "startDate": "2026-08-01",
    "endDate": "2026-08-05",
    "items": [
      {
        "gearItemId": "gear_id",
        "quantity": 2
      }
    ]
  }
}
```

---

# 📦 Rental Order Status Flow

Every rental order follows the lifecycle below.

```text
PLACED
   │
   ▼
CONFIRMED
   │
   ▼
PICKED_UP
   │
   ▼
RETURNED
```

Or

```text
PLACED
   │
   ▼
CANCELLED
```

---

# 🔒 Authorization Summary

| Endpoint | Role |
|----------|------|
| POST /provider/gear | PROVIDER |
| PUT /provider/gear/:id | PROVIDER |
| DELETE /provider/gear/:id | PROVIDER |
| GET /provider/orders | PROVIDER |
| PATCH /provider/orders/:id | PROVIDER |
| POST /rentals | CUSTOMER |
| GET /rentals | CUSTOMER |
| GET /rentals/:id | CUSTOMER |

---

## ✅ Next Part (Part 4)

The final part will include:

- 👨‍💼 Admin APIs
- 💳 Payment APIs
- ⭐ Review APIs
- 📊 Complete RBAC Matrix
- 🔄 Complete System Workflow
- 📁 HTTP Response Format
- 🚨 Error Handling
- 🤝 Contributing
- 📄 License
- 🎯 Final Professional GitHub README Ending


# 👨‍💼 Admin APIs

> **Authorization Required:** `ADMIN`

All endpoints in this section are accessible **only** to users with the **ADMIN** role.

Include your JWT token in the request header.

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# 👥 Get All Users

Returns all registered users.

### Endpoint

```http
GET /admin/users
```

### Full URL

```http
https://gearup-xi.vercel.app/api/admin/users
```

### Authorization

```
ADMIN
```

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "id": "user_id",
      "name": "Hossain",
      "email": "hossain@gmail.com",
      "role": "CUSTOMER",
      "status": "ACTIVE"
    }
  ]
}
```

---

# 🔄 Update User Status

Suspend or activate a user.

### Endpoint

```http
PATCH /admin/users/:id
```

### Full URL

```http
https://gearup-xi.vercel.app/api/admin/users/id_of_user
```

### Authorization

```
ADMIN
```

### Request Body

```json
{
  "status": "ACTIVE"
}
```

### Available Status

```text
ACTIVE
SUSPENDED
```

### Success Response

```json
{
  "success": true,
  "message": "User status updated successfully"
}
```

---

# 📦 Get All Gear Listings

Returns every gear listing available on the platform.

### Endpoint

```http
GET /admin/gear
```

### Full URL

```http
https://gearup-xi.vercel.app/api/admin/gear
```

### Authorization

```
ADMIN
```

---

# 📋 Get All Rental Orders

Returns every rental order placed by customers.

### Endpoint

```http
GET /admin/rentals
```

### Full URL

```http
https://gearup-xi.vercel.app/api/admin/rentals
```

### Authorization

```
ADMIN
```

---

# 🗂 Category Management

---

## ➕ Add Category

### Endpoint

```http
POST /admin/category
```

### Full URL

```http
https://gearup-xi.vercel.app/api/admin/category
```

### Authorization

```
ADMIN
```

### Request Body

```json
{
  "name": "Water Sports",
  "description": "Kayaks, paddleboards, life jackets, and snorkeling equipment"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Category created successfully"
}
```

---

## 📋 Get All Categories

### Endpoint

```http
GET /admin/category
```

### Full URL

```http
https://gearup-xi.vercel.app/api/admin/category
```

### Authorization

```
ADMIN
```

---

## ✏️ Update Category

### Endpoint

```http
PATCH /admin/category/:id
```

### Full URL

```http
https://gearup-xi.vercel.app/api/admin/category/category_id
```

### Authorization

```
ADMIN
```

### Request Body

```json
{
  "name": "Water Sport",
  "description": "change the description"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Category updated successfully"
}
```

---

## ❌ Delete Category

### Endpoint

```http
DELETE /admin/category/:id
```

### Full URL

```http
https://gearup-xi.vercel.app/api/admin/category/category_id
```

### Authorization

```
ADMIN
```

### Success Response

```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

---

# 💳 Payment APIs

> **Authorization Required:** `CUSTOMER`

Payments are available only for authenticated customers.

---

# 💰 Create Payment Session

Creates a Stripe payment session for a rental order.

### Endpoint

```http
POST /payments/create
```

### Full URL

```http
https://gearup-xi.vercel.app/api/payments/create
```

### Authorization

```
CUSTOMER
```

### Request Body

```json
{
  "rentalOrderId": "00f0ac25-0490-480d-94b2-1328a0a4c578"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Payment session created successfully"
}
```

---

# 💵 Get Payment History

Returns all payments made by the authenticated customer.

### Endpoint

```http
GET /payments
```

### Full URL

```http
https://gearup-xi.vercel.app/api/payments
```

### Authorization

```
CUSTOMER
```

---

# 🧾 Get Payment Details

Returns details for a specific payment.

### Endpoint

```http
GET /payments/:id
```

### Full URL

```http
https://gearup-xi.vercel.app/api/payments/payment_id
```

### Authorization

```
CUSTOMER
```

---

# ⭐ Review APIs

Customers can leave reviews **only after the rental order has been marked as `RETURNED`**.

---

# ✍️ Create Review

### Endpoint

```http
POST /reviews
```

### Full URL

```http
https://gearup-xi.vercel.app/api/reviews
```

### Authorization

```
CUSTOMER
```

### Request Body

```json
{
  "rentalOrderId": "00f0ac25-0490-480d-94b2-1328a0a4c578",
  "gearItemId": "f40fb54f-3073-433a-aaf6-0dc9dc4afafd",
  "rating": 5,
  "comment": "Excellent quality. Highly recommended."
}
```

### Success Response

```json
{
  "success": true,
  "message": "Review submitted successfully"
}
```

---

# 🔐 Complete Role-Based Access Control (RBAC)

| Feature | Public | Customer | Provider | Admin |
|----------|:------:|:--------:|:--------:|:------:|
| Register | ✅ | ✅ | ✅ | ❌ |
| Login | ✅ | ✅ | ✅ | ✅ |
| Browse Gear | ✅ | ✅ | ✅ | ✅ |
| View Gear Details | ✅ | ✅ | ✅ | ✅ |
| Update Profile | ❌ | ✅ | ✅ | ✅ |
| Create Rental | ❌ | ✅ | ❌ | ❌ |
| View Own Rentals | ❌ | ✅ | ❌ | ❌ |
| Create Payment | ❌ | ✅ | ❌ | ❌ |
| Payment History | ❌ | ✅ | ❌ | ❌ |
| Leave Review | ❌ | ✅ | ❌ | ❌ |
| Add Gear | ❌ | ❌ | ✅ | ❌ |
| Update Gear | ❌ | ❌ | ✅ | ❌ |
| Delete Gear | ❌ | ❌ | ✅ | ❌ |
| Provider Orders | ❌ | ❌ | ✅ | ❌ |
| Update Rental Status | ❌ | ❌ | ✅ | ❌ |
| Manage Users | ❌ | ❌ | ❌ | ✅ |
| Manage Categories | ❌ | ❌ | ❌ | ✅ |
| View All Rentals | ❌ | ❌ | ❌ | ✅ |
| View All Gear | ❌ | ❌ | ❌ | ✅ |

---

# 🔄 Complete System Workflow

```text
User Registration
        │
        ▼
User Login
        │
        ▼
Browse Available Gear
        │
        ▼
Create Rental Order
        │
        ▼
Provider Confirms Order
        │
        ▼
Customer Makes Payment
        │
        ▼
Provider Marks PICKED_UP
        │
        ▼
Customer Uses Gear
        │
        ▼
Provider Marks RETURNED
        │
        ▼
Customer Leaves Review
```

---

# 📂 Standard API Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

---

### Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "error": {
    "statusCode": 400
  }
}
```

---

# 🚨 Common HTTP Status Codes

| Status | Description |
|---------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute this project according to the license terms.

---

# 👨‍💻 Author

**Saif Hossain Jibon**

Backend Developer | CSE Student | Express.js | TypeScript | Prisma | PostgreSQL

---

# ⭐ Support the Project

If you found this project helpful:

- ⭐ Star the repository
- 🍴 Fork the project
- 🐛 Report issues
- 💡 Suggest improvements
- 📢 Share it with others

---

# 🎉 Thank You

Thank you for checking out **GearUp**!

We hope this project helps you understand how to build a scalable, secure, and production-ready REST API using **Express.js**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, **JWT Authentication**, **Stripe Payments**, and **Role-Based Access Control (RBAC)**.

Happy Coding! 🚀
