# TODO List Application

A full-stack TODO list application built with Next.js, TypeScript, Prisma, and Neon (serverless PostgreSQL). Features include user authentication, CRUD operations for todos, filtering, search, and a modern UI with Tailwind CSS.

## Prerequisites

Before you begin, ensure you have the following installed on your Mac/Linux environment:

- **Node.js** v20 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- A **Neon Database** account ([Sign up for free](https://neon.tech/))

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Neon Database

The project uses Neon (serverless PostgreSQL) as the database. You'll need a Neon database connection string:

1. **Create a Neon Account** (if you don't have one):
   - Visit [Neon.tech](https://neon.tech/)
   - Sign up for a free account

2. **Get Your Database Connection String**:
   - In the Neon dashboard, either create a new project or use an existing one
   - Navigate to the "Connection Details" section
   - Copy the connection string (it will look like: `postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb`)
   - You'll use this connection string in the next step

**Note:** The database schema will be automatically created when you run migrations in step 5, so you don't need to set up any tables manually.

### 4. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env  # If .env.example exists
```

Or create a new `.env` file with the following variables:

```env
# Database (Neon PostgreSQL connection string)
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# API URL (optional, defaults to empty string for relative URLs)
NEXT_PUBLIC_API_URL=""
```

**Important Notes:**
- Replace the `DATABASE_URL` with your actual Neon database connection string from step 3
- Replace `your-super-secret-jwt-key-change-this-in-production` with a strong, random secret key for production use
- You can generate a secure JWT secret using: `openssl rand -base64 32`

### 5. Run Database Migrations

Set up the database schema using Prisma migrations:

```bash
npm run prisma:migrate
```

This will:
- Create the database tables (User and Todo)
- Run all pending migrations
- Generate the Prisma Client

### 6. (Optional) Generate Prisma Client

If you need to regenerate the Prisma Client:

```bash
npm run prisma:generate
```

### 7. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

Open your browser and navigate to the URL to see the application.

## Available Scripts

### Development

- `npm run dev` - Start the development server on [http://localhost:3000](http://localhost:3000)
- `npm run build` - Build the application for production
- `npm start` - Start the production server (run `npm run build` first)

### Code Quality

- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check if code is properly formatted

### Database

- `npm run prisma:migrate` - Create and apply database migrations
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:studio` - Open Prisma Studio to view/edit database data

## Project Structure

```
todo-app/
├── app/                    # Next.js App Router pages and components
│   ├── api/               # API routes (REST endpoints)
│   │   ├── auth/         # Authentication endpoints
│   │   └── todos/        # Todo CRUD endpoints
│   ├── todos/            # Todos page and components
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── lib/                   # Shared utilities and libraries
│   ├── auth/             # Authentication utilities
│   ├── todos/            # Todo-related functions
│   ├── validation/       # Zod validation schemas
│   └── http/             # HTTP utilities
├── prisma/                # Prisma schema and migrations
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migration files
└── public/                # Static assets
```

## Features

### Core Features (Required)

- ✅ **Display TODO items** - View a list of todos with unique ID, title, and description
- ✅ **Add items** - Create new todo items
- ✅ **Edit items** - Update existing todo items
- ✅ **Delete items** - Remove todo items from the list
- ✅ **Multi-user support** - User authentication with login/logout
- ✅ **User isolation** - Each user sees only their own todos

### Bonus Features

- ✅ **Filtering** - Filter todos by status (All, Pending, Completed)
- ✅ **Search** - Text-based search by title with debouncing
- ✅ **Status toggle** - Mark todos as complete/incomplete
- ✅ **Responsive design** - Works on desktop and mobile devices
- ✅ **Dark mode support** - Built-in dark mode styling

## Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Neon (Serverless PostgreSQL)
- **ORM:** Prisma
- **State Management:** TanStack React Query
- **Authentication:** JWT with HTTP-only cookies
- **Validation:** Zod

## Database Schema

The application uses two main tables:

- **User** - Stores user accounts (id, email, password, timestamps)
- **Todo** - Stores todo items (id, title, description, status, userId, timestamps)

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Todos

- `GET /api/todos` - Get all todos for the authenticated user (supports query params: `status`, `title`)
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify the `DATABASE_URL` in your `.env` file is correct and matches your Neon database connection string

2. Ensure your Neon database is active (check the Neon dashboard)

3. Make sure the connection string includes `?sslmode=require` for secure connections

4. Test your connection string using a PostgreSQL client or the Neon SQL editor

### Prisma Client Generation

If you see errors about Prisma Client not being found:

```bash
npm run prisma:generate
```

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
PORT=3001 npm run dev
```

## License

This project was created as a coding assessment task.
