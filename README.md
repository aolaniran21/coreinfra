# Project Name

## Setup and Running Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/aolaniran21/coreinfra.git
cd greatbrands
```

### 2. Install Dependencies

Ensure you have Node.js and Docker installed, then run:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
PORT=3000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_TEST_NAME=your_test_db
DB_HOST=your_db_host
JWT_SECRET=your_jwt_secret
NODE_ENV=production
JWT_EXPIRES_IN=1h
```

### 4. Start the Database with Docker

If using PostgreSQL and Redis locally via Docker, execute:

```bash
docker-compose up -d
```

This will start PostgreSQL for database storage and Redis for distributed locking and caching.

### 5. Run Migrations and Seed Data

Execute the following commands to set up the database:

```bash
cd src
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 6. Start the Application

To start the application, run:

```bash
npm run dev
```

### 7. Access the API

Once running, the API will be available at: [http://localhost:3000](http://localhost:3000)

## Design Choices

- **Microservices & Modular Architecture**: Separation of concerns for Authentication, Events, Bookings, and Waiting Lists ensures scalability and maintainability.
- **RESTful API**: Stateless design with proper HTTP status codes for meaningful responses.
- **Concurrency Handling with Redis**: Prevents race conditions and ensures safe concurrent ticket bookings.
- **Authentication**: JWT-based authentication for secure user access with middleware for protected routes.

## API Documentation

### Authentication

#### User Signup

`POST /register`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (201 Created):**

```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### User Login

`POST /login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (200 OK):**

```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### Card Management

#### Cequest a Card

`POST /api/cards/request`

**Request Body:**

```json
{
  "name": "Tech Conference 2025",
  "totalTickets": 100
}
```

**Response (201 Created):**

```json
{
  "message": "Card created successfully",
  "card": {
    "id": 1,
    "name": "Tech Conference 2025",
    "totalTickets": 100,
    "availableTickets": 100
  }
}
```

#### Get a Card

`GET /api/cards/:id`

**Response (200 OK):**

```json
{
  "eventId": 1,
  "name": "Tech Conference 2025",
  "availableTickets": 10,
  "waitingListCount": 5
}
```

## Swagger Doc

To run unit and integration tests, use:

```bash
https://coreinfra.fly.dev/api-docs/
```
