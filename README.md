# Todo API — Node.js Monolithic Backend

A full-featured REST API for managing todos, built with Express.js and MongoDB. Covers authentication, CRUD operations, and clean architectural separation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Security | Bcrypt (password hashing) |

---

## Folder Structure

```
├── server.js              # Entry point — initializes app, DB, routes
├── routes/                # Traffic cops — maps URLs to controllers
├── controllers/           # Brain — core logic for each endpoint
├── services/              # Workhorses — reusable business logic (optional)
├── models/                # Data shape — Mongoose schemas (User, Todo)
├── middleware/            # Bouncers — auth, validation, error handling
├── config/                # Setup — DB connection and environment config
└── utils/                 # Helpers — JWT generation, password hashing
```

### What each layer does

**`server.js`** — Initializes Express, connects to MongoDB, registers middleware, mounts routes, and starts the server.

**`routes/`** — Contains no business logic. Simply maps an incoming HTTP method + path to the correct controller. For example: `POST /api/auth/login` → `authController.login`.

**`controllers/`** — Processes the incoming `req`, calls models or services for data, and sends back a formatted `res`. This is where your endpoint logic lives.

**`services/`** — Optional but recommended for larger apps. Extracts complex, multi-step operations (e.g. save user + send email + generate token) out of controllers to keep them lean.

**`models/`** — Defines Mongoose schemas for your collections:
- `User` — `username`, `email`, `password`
- `Todo` — `title`, `completed`, `userId`

**`middleware/`** — Functions that run before a request hits the controller:
- `auth` — validates JWT token, attaches `req.user`
- `validation` — checks request body for required/valid fields
- `errorHandler` — catches unhandled errors globally

**`config/`** — Holds `db.js` for the MongoDB connection setup and any environment-level configuration.

**`utils/`** — Stateless helper functions used across the app: token generation, password hashing, etc.

---

## Request Lifecycle

Here's what happens on a `GET /api/todos` request:

```
Client
  │  Sends HTTP GET /api/todos with JWT in Authorization header
  ▼
server.js
  │  Routes request to todo.routes.js
  ▼
routes/todo.routes.js
  │  Protected route — passes to auth middleware first
  ▼
middleware/auth.js
  │  Verifies JWT → extracts user ID → sets req.user → calls next()
  ▼
controllers/todo.controller.js
  │  Calls Todo model to query DB for current user's todos
  ▼
models/Todo.js
  │  Fetches matching documents from MongoDB → returns to controller
  ▼
controllers/todo.controller.js
  │  Formats data → sends res.json(todos)
  ▼
Client
     Receives JSON todo list
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
git clone <your-repo-url>
cd todo-api
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tododb
JWT_SECRET=your_jwt_secret_here
```

### Run the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server starts at `http://localhost:5000`.

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and receive JWT | No |

### Todos

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/todos` | Get all todos for user | Yes |
| `POST` | `/api/todos` | Create a new todo | Yes |
| `PUT` | `/api/todos/:id` | Update a todo | Yes |
| `DELETE` | `/api/todos/:id` | Delete a todo | Yes |

### Authentication

Pass the JWT in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_token>
```

---

## Architecture Notes

This project uses a **monolithic architecture** — all modules (auth, todos, users) run within a single application process. This keeps deployment simple and is well-suited for small-to-medium scale applications.

The layered structure (routes → controllers → services → models) is designed so the app can grow without becoming a mess. Adding a new feature means adding files in the right folders, not rewiring the whole app.