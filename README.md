#  FixIt – IT Support Community Platform

FixIt is a community-driven platform designed specifically for IT support individuals to ask questions, share knowledge, troubleshoot issues, and collaborate—similar to Reddit, but focused entirely on IT support.

---

##  Features

*  **Authentication**

  * User signup and login
  * Secure authentication system

*  **Home Feed**

  * View posts from the community
  * Discover trending IT issues and discussions

*  **Dashboard**

  * Personalized user overview
  * Manage posts and activity

*  **Direct Messaging (DM)**

  * One-on-one communication between users

*  **Communities**

  * Join or create IT-focused groups (e.g., Networking, Cybersecurity, Frontend)
  * Share posts within specific communities

*  **Post & Interaction**

  * Create, edit, and delete posts
  * Comment and engage with others

---

##  Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (with Mongoose)

---

## 📁 Project Structure

```
fixit/
│
├── client/ (Next.js frontend)
│   ├── app/
│   ├── components/
│   └── pages/
│
├── server/ (Express backend)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/fixit.git
cd fixit
```

### 2. Install dependencies

#### Frontend

```
cd client
npm install
```

#### Backend

```
cd server
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the server folder and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 4. Run the application

#### Start backend

```
cd server
npm run dev
```

#### Start frontend

```
cd client
npm run dev
```

---

## 🔗 API Endpoints (Sample)

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login user
* `GET /api/posts` – Fetch posts
* `POST /api/posts` – Create post
* `GET /api/communities` – Fetch communities

---

##  Future Improvements

*  Notifications system
*  Upvotes/Downvotes
*  Role-based access (admin/moderators)
*  Mobile responsiveness improvements
*  Advanced search & filtering

---

##  Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

##  License

This project is licensed under the MIT License.

---

##  Inspiration

Inspired by Reddit, but tailored specifically for IT support professionals to create a focused, helpful, and collaborative environment.

---

##  Author

Pheobe Nyawanda
GitHub: https://github.com/Neriah333
