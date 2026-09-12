# 🌟 MtaaniHub

**Local Marketplace Platform for Tanzania**

*Kila huduma, kila biashara, karibu yako.*

## 📋 Project Overview

MtaaniHub is a modern marketplace platform that connects customers with nearby services and businesses. Users can search for products and services in their area, view ratings, and connect with sellers.

## 🎯 Features

### Customer Features
- 🔍 Search products/services by location
- 📱 Browse categories (phones, repairs, food, etc.)
- ⭐ View seller ratings and reviews
- 💬 Message sellers
- ❤️ Save favorites
- 📦 Track orders/bookings

### Seller Features
- 📝 Create and manage listings
- 💰 View earnings and analytics
- 📊 Manage subscriptions
- ✅ Track orders/bookings
- 💬 Communicate with customers
- 🎖️ Get verified badge

### Admin Features
- 👥 Manage users and sellers
- ✔️ Verify businesses
- 📋 Approve advertisements
- 🚫 Handle reports and suspensions
- 📊 View platform analytics

## 🛠 Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Redux Toolkit
- Axios

**Backend:**
- Node.js + Express
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

**Deployment:**
- Vercel (Frontend)
- Render/Railway (Backend)

## 📁 Project Structure

```
MtaaniHub/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
├── server/              # Node.js Backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/MtaaniHub.git
   cd MtaaniHub
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Add your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm start
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 💰 Monetization

1. **Free Listings** - Basic free listings for sellers
2. **Premium Listings** - TSh 5,000-20,000/month for featured placement
3. **Featured Ads** - Premium placement on homepage
4. **Commission** - Small percentage on platform transactions
5. **Business Subscriptions** - Monthly packages with analytics and verified badge

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md

## 📧 Contact

For inquiries: hello@mtaanihub.tz
