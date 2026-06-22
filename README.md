# Chethan P - Interactive Portfolio

Welcome to my interactive portfolio! This is a dynamic, fully data-driven portfolio website built with the **MERN Stack** (MongoDB, Express, React, Node.js). It includes a beautifully designed public-facing frontend and a fully functional custom CMS (Content Management System) to update the content dynamically.

## 🚀 Features

### Public Frontend
- **Boot Sequence & Matrix Aesthetic**: A terminal-style boot-up sequence that transitions into a clean, modern, and dark-themed portfolio.
- **Dynamic Content rendering**: Every section—Education, Experience, Projects, Hobbies, Skills, and "The Story"—is fetched from a live database.
- **Skill Constellation & Logo Loop**: Custom CSS animations and interactive visuals.
- **Progressive Navigation**: A sleek, scroll-spy enabled navigation sidebar.
- **Dynamic Formatting**: Automatic bolding of important words in the story section.

### Edit Studio (Admin Panel)
- **Full CRUD Capabilities**: Add, edit, or delete any piece of information on the portfolio without touching the code.
- **Mobile Responsive**: The CMS works flawlessly on mobile, allowing on-the-go updates.
- **Sections Managed**:
  - Dashboard
  - Projects
  - Education
  - Experience
  - Hobbies
  - Media Accounts
  - Skills
  - Resume (Update the direct link to the PDF)
  - About (Bio, The Story, Social Links)
  - Site Settings (Maintenance mode, Hero message, Contact email)

## 🛠️ Tech Stack

**Frontend (Client)**
- React (Vite)
- Tailwind CSS
- Framer Motion (for smooth animations)
- Lucide React (Icons)
- React Router DOM

**Backend (Server)**
- Node.js & Express
- MongoDB (Atlas)
- Mongoose (ODM)
- JSON Web Tokens (JWT) & bcryptjs (Admin Auth)
- CORS & dotenv

## 📂 Project Structure

```text
portfolio_v2/
├── client/           # React Frontend Application
│   ├── public/       # Static assets (Favicon, Maps)
│   └── src/          # React components, pages, and admin panel
├── server/           # Express Backend Application
│   ├── config/       # Database connection setup
│   ├── models/       # Mongoose Schemas
│   └── routes/       # API endpoints for public & admin access
├── resources/        # Old assets, scripts, and miscellaneous files
└── README.md         # This file
```

## ⚙️ Running Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/chethxnnn/portfolio_v2.git
   cd portfolio_v2
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and add your MongoDB URI and a secret key:
   ```env
   MONGO_URI=mongodb+srv://<your_db_username>:<password>@cluster...
   JWT_SECRET=super_secret_string_here
   ```
   Start the backend server:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Public Site: `http://localhost:5173`
   - Edit Studio (Admin): `http://localhost:5173/admin`

## 🌐 Deployment

This project is configured for cloud deployment:
- **Frontend**: Deployed on [Vercel](https://vercel.com/) (using `vercel.json` for client-side routing).
- **Backend**: Deployed on [Render](https://render.com/) as a Node web service.
- **Database**: Hosted on [MongoDB Atlas](https://www.mongodb.com/atlas).

## 👨‍💻 Author

**Chethan P**
- GitHub: [@chethxnnn](https://github.com/chethxnnn)
- LinkedIn: [Chethan P](https://linkedin.com/in/chethan-p-dsatm)
