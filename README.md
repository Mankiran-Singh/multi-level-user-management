📌 Multi-Level User Management System (MEAN Stack)

A secure MEAN stack application implementing authentication, authorization, hierarchical user management, wallet balance transfer, and transaction tracking, with optional Dockerized setup.

🚀 Features
🔐 Authentication & Security

User Registration & Login

JWT authentication stored in HTTP-only cookies

CAPTCHA validation during login (session-based, expires in 5 minutes)

Secure Logout

Protected routes using Auth Guards

👥 User Hierarchy & Permissions

Supports N-level user hierarchy

Each user can:

Create only next-level users

View only their own downline

Change password of direct children

Permissions enforced on backend (secure)

💰 Wallet & Transactions

Self wallet recharge

Credit balance to direct children only

Automatic debit from sender on credit

Transaction ledger with:

Credit / Debit

Sender / Receiver

Timestamp

Wallet statement visible per user

👑 Admin Capabilities

View all next-level users

View full downline hierarchy of any user

Credit any user (deducts from parent automatically)

View balance summary

🎨 Frontend (Angular + Material)

Login with CAPTCHA

Register (initial admin)

Dashboard with balance & actions

Create user, credit wallet, recharge wallet

Downline view

Wallet statement (table view)

Reusable Back button

Navbar with Logout

Route Guards (Auth & Admin)

🐳 Dockerized Setup (Bonus)

Dockerized Backend

Dockerized Frontend

Orchestrated using Docker Compose

MongoDB Atlas used (no local DB container)

🧱 Tech Stack
Layer	Technology
Frontend	Angular, Angular Material
Backend	Node.js, Express
Database	MongoDB Atlas
Auth	JWT + Cookies + Sessions
Security	CAPTCHA
DevOps	Docker, Docker Compose
📂 Project Structure
multi-level-user-system/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── src/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   └── src/
├── docker-compose.yml
└── README.md

⚙️ Environment Variables (Backend)

Create backend/.env:

PORT=5050
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
MONGO_URI=your_mongodb_atlas_uri

🧪 Running Without Docker (Local Dev)
Backend
cd backend
npm install
npm run dev


Backend runs at:

http://localhost:5050

Frontend
cd frontend
npm install
ng serve


Frontend runs at:

http://localhost:4200

🐳 Running with Docker (Recommended)
Prerequisites

Docker

Docker Desktop

Run Application

From project root:

docker compose up --build

Access URLs
Service	URL
Frontend	http://localhost:4200

Backend	http://localhost:5050
🧪 API Overview
Method	Endpoint	Description
POST	/auth/register	Register initial admin
POST	/auth/login	Login with CAPTCHA
POST	/auth/logout	Logout
GET	/auth/captcha	Get CAPTCHA
GET	/users/me	Current user
POST	/users/create	Create next-level user
GET	/users/downline	View downline
POST	/wallet/recharge	Self recharge
POST	/wallet/credit	Credit child wallet
GET	/wallet/statement	Wallet transactions
🔒 Authorization Logic (Important)

Hierarchy-based permissions, not role-only

Any user can:

Manage their own downline

Admin has:

Cross-hierarchy visibility & credit access

Backend strictly enforces all rules

🎯 Design Decisions

JWT stored in HTTP-only cookies (secure)

CAPTCHA tied to session

No tokens stored in localStorage

Dropdown-based user selection for wallet credit

Reusable UI components for consistency



📝 Notes

MongoDB Atlas used instead of local DB

Email: admin@test.com
Password: 123456
