# 🍬 Sweet Shop Management System

A full-stack e-commerce application designed to manage a sweet shop's inventory, handle customer orders in real-time, and track stock levels. Built using the **MERN Stack** (MongoDB, Express, React, Node.js) with a focus on modern development practices.



## 🚀 Project Overview

This project was built as part of a **Full-Stack TDD Kata**. It demonstrates a complete flow of data from a MongoDB database to a responsive React frontend, secured by JWT authentication. It features a dynamic shopping cart, real-time stock updates, and cloud-based image management.

## ✨ Key Features

### 👤 Customer Features
- **Browse Catalog:** View a rich gallery of sweets with images, prices, and live stock status.
- **Smart Filtering:** Search sweets by name, category (Barfi, Laddu, Syrup, etc.), or price range.
- **Shopping Cart:** Add items to the cart with a quantity selector.
- **Real-Time Purchase:** Checkout logic ensures stock is deducted immediately from the database.
- **Stock Protection:** "Add to Cart" is disabled if an item is out of stock.

### 🛡️ Admin Features (Protected)
- **Dashboard:** View the complete inventory list.
- **Add Products:** Upload new sweets with **automatic image uploading to Cloudinary**.
- **Edit Products:** Update details (Price, Name, Image) of existing items.
- **Inventory Management:** Delete obsolete items or **Restock** quantities instantly.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js (Vite), Tailwind CSS, Context API, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JSON Web Tokens (JWT) |
| **Storage** | Cloudinary (Image Hosting) |
| **HTTP Client** | Axios |

---

## ⚙️ Setup & Installation

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/Sweet-Shop-Management.git](https://github.com/YOUR_USERNAME/Sweet-Shop-Management.git)


For Backend Step
cd backend
npm install
PORT=5000
envfileContain 
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_secret_key_here
cd backend
npm install
npm run dev 

For Frontend 
cd frontend
npm install
npm run dev


