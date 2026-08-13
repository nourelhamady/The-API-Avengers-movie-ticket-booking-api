# 🎬 Movie Ticket Booking System — Team Task Division

## Project Overview

A backend API for a cinema booking system where customers can browse movies, view showtimes, select seats, and book tickets. Cinema admins can manage movies and showtimes.

### Required Technologies

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JWT
- dotenv
- Swagger
- Render or Railway
- Public GitHub repository

---

# 👥 Team Division

The project is divided into 4 main parts:

| Person | Main Part | Main Responsibility |
|---|---|---|
| 👩‍💻 Person 1 (==>Mai) | Authentication & Users | Register, Login, JWT, bcrypt, Middleware, Roles | 
| 👩‍💻 Person 2 (==>Nour) | Movies | Movie CRUD, Search, Filtering | 
| 👩‍💻 Person 3 (==>Mawaheb) | Showtimes | Showtime CRUD, Date/Time validation | 
| 👩‍💻 Person 4 (==>Amal) | Bookings & Seats | Booking, Seats, Price, Cancellation | 

> Important: The four parts are connected. Everyone should agree on the database fields, API routes, and folder structure before starting.

---

# 👩‍💻 Person 1 — Authentication & Users

## What does this part mean?

This person is responsible for answering:

> "Who is this user, and is this user allowed to perform this action?"

There are two roles:

- Customer
- Cinema Admin

## Tasks

### 1. User Model

Create the `User` Mongoose model.

Fields:

```text
fullName
email
password
role
```

Role should be:

```text
Customer
Cinema Admin
```

### 2. Register

Create:

```text
POST /auth/register
```

The user sends:

```json
{
  "fullName": "Nour",
  "email": "nour@example.com",
  "password": "StrongPassword123"
}
```

The password must be hashed using `bcrypt` before saving it.

### 3. Login

Create:

```text
POST /auth/login
```

Check:

1. Email exists.
2. Password is correct.
3. Generate JWT.
4. Return the token.

### 4. JWT Authentication Middleware

Create middleware such as:

```text
authMiddleware
```

Its job:

```text
Request
   ↓
Read JWT
   ↓
Verify JWT
   ↓
Identify user
   ↓
Allow / Reject request
```

If there is no valid token:

```text
401 Unauthorized
```

### 5. Role Authorization

Create middleware/helper for roles.

Example:

```text
Customer → can create Booking
Admin → can create Movie
```

A Customer trying to create a Movie should receive:

```text
403 Forbidden
```

## Suggested Files

```text
src/
├── models/
│   └── User.ts
├── controllers/
│   └── authController.ts
├── routes/
│   └── authRoutes.ts
├── middleware/
│   ├── authMiddleware.ts
│   └── roleMiddleware.ts
└── utils/
    └── jwt.ts
```

## Person 1 Checklist

- [ ] User model
- [ ] Register endpoint
- [ ] Login endpoint
- [ ] bcrypt password hashing
- [ ] JWT generation
- [ ] JWT verification
- [ ] Auth middleware
- [ ] Role authorization
- [ ] Validate email
- [ ] Validate password strength
- [ ] Test endpoints in Postman

---

# 👩‍💻 Person 2 — Movies

## What does this part mean?

This person manages the movies inside the cinema.

For example:

```text
Avatar
Action
180 minutes
Now Showing
```

## Movie Model

Create:

```text
Movie
```

Fields:

```text
title
genre
duration
description
posterUrl
rating
status
```

Status:

```text
Now Showing
Coming Soon
```

## CRUD

### Create Movie

```text
POST /movies
```

Only Cinema Admin.

### Get All Movies

```text
GET /movies
```

Customers can browse movies.

### Get One Movie

```text
GET /movies/:id
```

### Update Movie

```text
PUT /movies/:id
```

Only Admin.

### Delete Movie

```text
DELETE /movies/:id
```

Only Admin.

## Search & Filtering

Support:

```text
GET /movies?title=Avatar
GET /movies?genre=Action
GET /movies?status=Now%20Showing
```

You can also combine filters.

Example:

```text
GET /movies?genre=Action&status=Now%20Showing
```

## Validation

- Title required
- Genre required
- Duration must be positive
- Required fields must exist
- Rating should be within a reasonable range
- Status must be valid

## Suggested Files

```text
src/
├── models/
│   └── Movie.ts
├── controllers/
│   └── movieController.ts
├── routes/
│   └── movieRoutes.ts
└── validators/
    └── movieValidator.ts
```

## Person 2 Checklist

- [ ] Movie model
- [ ] Create movie
- [ ] Get all movies
- [ ] Get movie by ID
- [ ] Update movie
- [ ] Delete movie
- [ ] Search by title
- [ ] Filter by genre
- [ ] Filter by status
- [ ] Validation
- [ ] Admin authorization
- [ ] Test with Postman

---

# 👩‍💻 Person 3 — Showtimes

## What does this part mean?

A Movie is the film itself.

A Showtime is when and where the movie will be shown.

For example:

```text
Movie: Avatar

Showtime 1:
Hall 1
August 20
5:00 PM
100 EGP

Showtime 2:
Hall 2
August 20
8:00 PM
120 EGP
```

One movie can have many showtimes.

## Showtime Model

Fields:

```text
movie
hallNumber
date
startTime
endTime
ticketPrice
totalCapacity
```

`movie` should reference the `Movie` model.

Example:

```text
movie: ObjectId
```

## CRUD

### Create Showtime

```text
POST /showtimes
```

Only Admin.

### Get All Showtimes

```text
GET /showtimes
```

Customers can view available showtimes.

### Get Showtime by ID

```text
GET /showtimes/:id
```

### Update Showtime

```text
PUT /showtimes/:id
```

Only Admin.

### Delete Showtime

```text
DELETE /showtimes/:id
```

Only Admin.

## Validation

A showtime must:

- Belong to an existing movie
- Be in the future
- Have a valid date
- Have a valid start/end time
- Have a positive ticket price
- Have a positive capacity
- Have end time after start time

## Important Rule

A Showtime with confirmed bookings should not be deleted.

Example:

```text
Showtime
   ↓
Confirmed Bookings
   ↓
❌ Cannot delete
```

## Suggested Files

```text
src/
├── models/
│   └── Showtime.ts
├── controllers/
│   └── showtimeController.ts
├── routes/
│   └── showtimeRoutes.ts
└── validators/
    └── showtimeValidator.ts
```

## Person 3 Checklist

- [ ] Showtime model
- [ ] Movie reference
- [ ] Create showtime
- [ ] Get all showtimes
- [ ] Get showtime by ID
- [ ] Update showtime
- [ ] Delete showtime
- [ ] Future date validation
- [ ] Time validation
- [ ] Capacity validation
- [ ] Prevent deleting showtime with confirmed bookings
- [ ] Admin authorization
- [ ] Test with Postman

---

# 👩‍💻 Person 4 — Bookings & Seats

## What does this part mean?

This is the part customers use to buy/reserve tickets.

Example:

```text
Customer
   ↓
Chooses Showtime
   ↓
Chooses Seats
   ↓
Creates Booking
```

Example:

```json
{
  "showtime": "SHOWTIME_ID",
  "selectedSeats": ["A5", "A6"]
}
```

## Booking Model

Fields:

```text
customer
showtime
selectedSeats
totalPrice
bookingStatus
```

Status:

```text
Pending
Confirmed
Cancelled
```

## Create Booking

```text
POST /bookings
```

Only Customer.

The backend should:

1. Check that the showtime exists.
2. Check that the showtime is upcoming.
3. Check that the selected seats are valid.
4. Check that the seats are not already booked.
5. Calculate the total price.
6. Create the booking.

Example:

```text
Ticket price = 100
Seats = A5, A6

Total = 200
```

## Prevent Duplicate Seats

If:

```text
Customer A → A5
```

then:

```text
Customer B → A5
```

must fail.

```text
❌ Seat A5 is already booked
```

## Prevent Duplicate Seats in One Booking

This should fail:

```json
{
  "selectedSeats": ["A5", "A5"]
}
```

## View Own Bookings

```text
GET /bookings
```

A Customer should only see their own bookings.

## Get Booking by ID

```text
GET /bookings/:id
```

The Customer should only access their own booking.

## Cancel Booking

For example:

```text
PATCH /bookings/:id/cancel
```

Only the owner of the booking can cancel it.

Cancellation should only be allowed before the movie starts.

After cancellation:

```text
A5 → Available again
A6 → Available again
```

## Price Calculation

Example:

```text
Ticket price = 150
Selected seats = 3

150 × 3 = 450
```

The server should calculate the price instead of trusting the price sent by the client.

## Suggested Files

```text
src/
├── models/
│   └── Booking.ts
├── controllers/
│   └── bookingController.ts
├── routes/
│   └── bookingRoutes.ts
└── validators/
    └── bookingValidator.ts
```

## Person 4 Checklist

- [ ] Booking model
- [ ] Create booking
- [ ] Get own bookings
- [ ] Get booking by ID
- [ ] Cancel booking
- [ ] Seat validation
- [ ] Prevent duplicate seats
- [ ] Prevent already-booked seats
- [ ] Calculate total price
- [ ] Check showtime capacity
- [ ] Check future showtime
- [ ] Customer authorization
- [ ] Test with Postman

---

# 🔗 How the Four Parts Connect

The final database relationship should look approximately like this:

```text
User
 │
 │ customer
 ↓
Booking
 │
 │ references
 ↓
Showtime
 │
 │ references
 ↓
Movie
```

Example:

```text
Nour
 ↓
Booking #123
 ↓
Avatar — 8:00 PM — Hall 2
 ↓
Avatar Movie
```

---

# 📁 Suggested Project Structure

```text
movie-ticket-api/
│
├── src/
│   ├── config/
│   │   └── db.ts
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Movie.ts
│   │   ├── Showtime.ts
│   │   └── Booking.ts
│   │
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── movieController.ts
│   │   ├── showtimeController.ts
│   │   └── bookingController.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── movieRoutes.ts
│   │   ├── showtimeRoutes.ts
│   │   └── bookingRoutes.ts
│   │
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   └── roleMiddleware.ts
│   │
│   ├── validators/
│   │   ├── authValidator.ts
│   │   ├── movieValidator.ts
│   │   ├── showtimeValidator.ts
│   │   └── bookingValidator.ts
│   │
│   ├── utils/
│   │   └── jwt.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🤝 Shared Project Tasks

These are not owned by only one person. The team should coordinate them.

## 1. Express & TypeScript Setup

Create:

```text
package.json
tsconfig.json
src/app.ts
src/server.ts
```

## 2. MongoDB Connection

Use:

```text
MONGODB_URI
```

from `.env`.

Example:

```text
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
PORT=3000
```

Do NOT push `.env` to GitHub.

## 3. Swagger

Document all endpoints:

```text
/auth
/movies
/showtimes
/bookings
```

Every person should document the endpoints they create.

## 4. GitHub

Use separate branches:

```text
main

feature/auth
feature/movies
feature/showtimes
feature/bookings
```

Each person works on their own branch.

Then merge into `main`.

## 5. Deployment

At the end, deploy the complete API to:

- Render
- or Railway

Make sure environment variables are configured on the hosting platform.

---

# 🔄 Recommended Work Order

Do not wait until the end to connect everything.

### Phase 1 — Setup

```text
1. Create GitHub repository
2. Create Node + TypeScript + Express project
3. Connect MongoDB
4. Create folder structure
5. Configure dotenv
```

### Phase 2 — Parallel Development

```text
Person 1 → Auth
Person 2 → Movies
Person 3 → Showtimes
Person 4 → Bookings
```

### Phase 3 — Integration

Connect:

```text
User
 ↓
Movie
 ↓
Showtime
 ↓
Booking
```

### Phase 4 — Testing

Test all scenarios in Postman.

Important scenarios:

```text
Register Customer
Register Admin
Login
Create Movie
Create Showtime
Browse Movies
Browse Showtimes
Create Booking
Book same seat twice
Cancel Booking
Try Customer accessing Admin route
Try invalid JWT
```

### Phase 5 — Swagger

Make sure every endpoint is documented.

### Phase 6 — Deployment

Deploy to Render/Railway.

### Phase 7 — Final Testing

Test the live URL, not only localhost.

---

# 🧪 Important Business Rules

The final project must enforce:

- [ ] A seat cannot be booked by more than one customer for the same showtime.
- [ ] Customers cannot book duplicate seats in one reservation.
- [ ] Bookings can only be made for upcoming showtimes.
- [ ] Customers can cancel bookings before the movie starts.
- [ ] Cancelled bookings release their seats.
- [ ] Cinema Admins can manage movies and showtimes.
- [ ] Customers can only manage their own bookings.
- [ ] Showtimes cannot be deleted if they have confirmed bookings.
- [ ] Total booked seats cannot exceed capacity.
- [ ] Only authenticated users can access protected routes.
- [ ] Only Admins can manage movies/showtimes.
- [ ] Passwords must never be stored as plain text.

---

# ✅ Final Submission Checklist

## Backend

- [ ] Node.js
- [ ] TypeScript
- [ ] Express.js
- [ ] MongoDB
- [ ] Mongoose
- [ ] At least 2 models
- [ ] Full CRUD
- [ ] Register
- [ ] Login
- [ ] bcrypt
- [ ] JWT
- [ ] Protected routes
- [ ] Role-based authorization
- [ ] Middleware
- [ ] dotenv
- [ ] Validation
- [ ] Search/filtering
- [ ] Swagger

## GitHub

- [ ] Public repository
- [ ] Clean folder structure
- [ ] `.gitignore`
- [ ] `.env` NOT uploaded
- [ ] README
- [ ] All branches merged

## Deployment

- [ ] Render/Railway deployment
- [ ] MongoDB connection works online
- [ ] Environment variables configured
- [ ] API live URL works
- [ ] Swagger works on live URL

---

# 🎯 Simple Explanation of the Whole Project

Think of the system like this:

```text
ADMIN
  │
  ├── Creates Movies
  │
  └── Creates Showtimes
           │
           ↓
        CUSTOMER
           │
           ├── Browses Movies
           │
           ├── Browses Showtimes
           │
           └── Books Seats
                    │
                    ↓
                 BOOKING
```

So each team member owns one major part, but the four parts connect through MongoDB references and the API.

## Final Division

```text
👩 Person 1
Authentication + Users
        ↓
"Who are you?"

👩 Person 2
Movies
        ↓
"What movies are available?"

👩 Person 3
Showtimes
        ↓
"When and where is the movie?"

👩 Person 4
Bookings + Seats
        ↓
"Which seats did the customer book?"
```

This division keeps the workload relatively balanced while making the integration between the four parts clear.
