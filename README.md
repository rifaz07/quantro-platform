# Quantro — Paper Trading Platform

Quantro is a production-style full-stack paper trading platform that simulates real-world brokerage workflows using virtual capital.  
It implements transactional order execution, wallet ledger accounting, portfolio tracking, and a clean product-grade frontend.

---

## 🌐 Live Demo

| Service | URL |
|----------|------|
| Frontend | https://quantro-frontend.onrender.com |
| Backend API | https://quantro-platform.onrender.com |

> This is a demo system. Please use temporary credentials while testing.

---

## 🚀 Features

- **JWT Authentication** — secure register, login, protected routes
- **Wallet Management** — deposit & withdraw with MongoDB atomic sessions
- **Order Execution Engine** — BUY and SELL with transactional integrity
- **Weighted Average Price Logic** — realistic brokerage-style holdings calculation
- **Double-Entry Ledger System** — every financial action recorded with balance snapshot
- **Portfolio Dashboard** — holdings, wallet balance, transaction history
- **Watchlist Module** — simulated market instruments
- **Rate Limiting** — 100 requests / 15 minutes per IP
- **CORS Protection** — restricted to frontend origin

---

## System Design Highlights

- MongoDB **transaction sessions** ensure atomic financial operations
- Service-layer architecture separates controllers from business logic
- Order execution and wallet updates are handled inside a single database session
- Ledger-based transaction history for traceability
- Fully deployed on Render with environment isolation

---

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- Chart.js + react-chartjs-2
- Axios

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- express-rate-limit

---

## Project Structure
```
quantro-platform/
  backend/
    src/
      config/         # Database connection
      controllers/    # Route handlers
      middlewares/    # Auth + security middleware
      models/         # Mongoose schemas
      routes/         # API definitions
      services/       # Business logic (order engine)
      utils/          # Helpers
      app.js          # Express configuration
      server.js       # Entry point
    .env.example
  client/
    src/
      api/            # Axios modules
      components/     # UI components
      context/        # Auth context
      pages/          # Application pages
      routes/         # ProtectedRoute
      App.jsx
      main.jsx
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

---

### Clone Repository
```bash
git clone https://github.com/rifaz07/quantro-platform.git
cd quantro-platform
```

---

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

Fill in:
```
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run backend:
```bash
npm run dev
```

---

### Frontend Setup
```bash
cd ../client
npm install
```

Create `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Run frontend:
```bash
npm run dev
```

---

### Open App
```
http://localhost:5173
```

---

## Production Environment Variables

### Backend (Render)
```
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=https://quantro-frontend.onrender.com
NODE_ENV=production
```

### Frontend (Render)
```
VITE_API_URL=https://quantro-platform.onrender.com/api
```

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | ❌ | Register new user |
| POST | /api/auth/login | ❌ | Login and get JWT |
| GET | /api/wallet | ✅ | Get wallet balance |
| POST | /api/wallet/deposit | ✅ | Deposit funds |
| POST | /api/wallet/withdraw | ✅ | Withdraw funds |
| POST | /api/orders | ✅ | Place BUY/SELL order |
| GET | /api/holdings | ✅ | Fetch holdings |
| GET | /api/transactions | ✅ | Fetch ledger history |
| GET | /api/users/profile | ✅ | Fetch profile |

---

## Order Execution Flow

Every order runs inside a MongoDB transaction session.  
If any step fails, the entire operation rolls back.
```
POST /api/orders
  -> JWT authentication
  -> Input validation
  -> Start MongoDB session
     -> Check user balance
     -> Fetch existing holding
     -> Update wallet balance
     -> Recalculate weighted average
     -> Create ledger entry
     -> Create order record
  -> Commit session
  <- Return { order, balance }
```

---

## Known Limitations

- Order price is client-supplied (no real market validation)
- Watchlist uses static price data
- Floating point arithmetic used (no decimal precision library)

---

## Built By

**Rifaz Shaikh Razak**  
Full-Stack Product Engineer
