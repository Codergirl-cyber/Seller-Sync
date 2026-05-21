# SellerSync 🚀

A modern SaaS platform for Instagram sellers to manage products, track orders, monitor revenue, and organize business operations from one dashboard.

Built as a full-stack web application with authentication, inventory management, order tracking, analytics, and persistent cloud storage.

## Live Demo

🔗 Live: https://seller-sync-nine.vercel.app/ 
🔗 GitHub: https://github.com/Codergirl-cyber/Seller-Sync

---

## Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Products
![Products](./screenshots/products.png)

### Orders
![Orders](./screenshots/orders.png)

### Transactions
![Transactions](./screenshots/transactions.png)

---

## Features

### Authentication
- Email/password signup & login
- Google OAuth login
- Persistent sessions
- Authentication state handling
- Protected app access

### Dashboard
- Revenue overview
- Total products
- Orders tracking
- Pending orders summary
- Analytics cards
- Activity section

### Product Management
- Add products
- Delete products
- Stock management
- Search products
- Inventory status tracking

### Orders
- Create orders
- Automatic stock reduction
- Payment status tracking
- Delivery status tracking
- Customer purchase history
- Pending order alerts

### Transactions
- Transaction management
- Status updates
- Revenue summaries
- Net income calculations

### UI / UX
- Responsive design
- Loading skeletons
- Empty states
- Framer Motion animations
- Error boundaries
- Shared component system

---

## Tech Stack

Frontend:
- React 19
- Vite
- Framer Motion
- Lucide React

Backend / Database:
- Supabase
- Supabase Auth
- PostgreSQL
- RPC functions

Styling:
- CSS
- Custom design system

---

## Architecture

SellerSync uses:

- React frontend
- Supabase backend-as-a-service
- Client-side state management
- Auth context provider
- Protected application shell
- RPC-based order processing

Flow:

User Login
↓
Dashboard
├── Products
├── Orders
├── Transactions
└── Settings

---

## Installation

Clone the repository:

```bash
git clone YOUR_REPO_URL
