# 🛍️ Ecomzy

![Node](https://img.shields.io/badge/Node.js-18.x-blue)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

Ecomzy is a full-stack ecommerce platform built with:
- 🚀 **React + Tailwind CSS** frontend
- 🔥 **Express + MongoDB** backend
- 💳 Basic cart, authentication (JWT), user profile & orders dropdown.

It follows a clean **monorepo structure** to keep backend & frontend isolated but together in a single repository.

---

## 📂 Project Structure

/Ecomzy
├── backend # Express / MongoDB REST API
└── frontend # React + Tailwind UI

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1️⃣ Clone this repository

```bash
git clone https://github.com/dibendughosal/Ecomzy.git
cd Ecomzy
2️⃣ Install dependencies
bash
Copy
Edit
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
3️⃣ Setup environment variables
📝 Backend .env
Create a file named .env inside the backend folder:

ini
Copy
Edit
MONGO_URI=mongodb://localhost:27017/ecomzy
JWT_SECRET=yourSecretKey
PORT=5000
4️⃣ Run the application
🚀 Start backend server
bash
Copy
Edit
cd backend
npm run start
Runs on: http://localhost:5000

🚀 Start frontend app (in a new terminal)
bash
Copy
Edit
cd frontend
npm run start
Runs on: http://localhost:3000

🌐 Usage
📦 User Authentication: Register / Login with JWT.

🛒 Shopping Cart: Add / remove items to cart, stored in Redux store.

👤 Profile & Orders: Protected dropdown when logged in.

🔍 Search bar: Responsive search layout (UI only).

🖥 Mobile + Desktop: Fully responsive with Tailwind CSS.

🛠️ Tech Stack
Layer	Technology
Frontend	React, Redux Toolkit, Tailwind CSS, react-hot-toast
Backend	Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
Tools	Concurrently, dotenv, nodemon

🗂️ API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user, returns JWT
GET	/api/user/me	Get current user by token

🚀 Deployment
🐳 MongoDB Atlas or local MongoDB

🚀 Render / Railway / EC2 for backend

⚡ Vercel / Netlify for frontend

✅ License
This project is licensed under the MIT License.

🙌 Author
Dibendu Ghosal

Made with ❤️ for learning & building.