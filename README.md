## Bluedotbook API (TypeScript, Express, Mongoose)

Production-ready REST API migrated from CommonJS to TypeScript with ES Modules, JWT auth, and MongoDB via Mongoose.

### Stack

- **Runtime**: Node.js (ES Modules)
- **Server**: Express
- **DB/ODM**: MongoDB + Mongoose
- **Auth**: Passport JWT, bcrypt
- **Validation**: Joi
- **Lang**: TypeScript

### Requirements

- Node.js 18+ (recommended)
- MongoDB 5+

### Getting Started

1. Install dependencies

```
npm install
```

2. Configure environment variables
   Copy `sample.env` to `.env` and update values:

```
cp sample.env .env
```

Required variables:

- `PORT` (e.g. 9000)
- `MONGO_URL` (e.g. mongodb://localhost:27017/bluedotbook)
- `SECRET` (JWT secret)

3. Run in development (ts-node)

```
npm run dev
```

4. Build and run (compiled JS)

```
npm run build
npm start
```

Scripts:

- `dev`: Run with ts-node (ESM)
- `build`: Compile TypeScript to `dist/`
- `start`: Run compiled server from `dist/`
- `clean`: Remove `dist/`

### ES Modules note

This project targets ESM. When using compiled output (`dist/`), Node requires explicit `.js` extensions in relative imports. Ensure relative imports in source include `.js` so compiled files resolve correctly, or run via `npm run dev` (ts-node) during development.

### Project Structure

```
app/
  controllers/      # Express controllers
  routes/           # Express routers
  services/         # Business logic
  shared/
    config/         # DB & Passport config
    middleware/     # Error handling, auth, async wrapper
    models/         # Mongoose models
    types/          # Global/shared TypeScript interfaces
    utils/          # Helpers (pagination, search, ErrorResponse)
server.ts           # App entrypoint
```

### API Overview

- Auth: `/api/v1/auth`
  - `POST /register`
  - `POST /login`
- Products: `/api/v1/products`
  - `POST /` (auth)
  - `GET /`
  - `GET /:id`
  - `PUT /:id` (auth)
  - `DELETE /:id` (auth)
  - Categories
    - `POST /categories` (auth)
    - `GET /categories`
    - `GET /categories/:id`
    - `PUT /categories/:id` (auth)
    - `DELETE /categories/:id` (auth)
- Cart: `/api/v1/cart`
  - `POST /` (auth)
  - `GET /` (auth)
  - `GET /:id` (auth)
  - `PUT /:id` (auth)
  - `DELETE /:id` (auth)
- Users: `/api/v1/users` (auth)
  - `GET /`
  - `GET /:id`
  - `PUT /`

### Development Tips

- Run MongoDB locally or provide a remote `MONGO_URL`.
- Strict TypeScript is enabled. Use `as` only when necessary and prefer proper interfaces from `app/shared/types`.
- Use the included `ErrorResponse` for consistent API errors and `async` middleware to handle async routes.

### License

ISC
