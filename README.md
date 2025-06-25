# EasyTravels

A full-featured tour and travel booking platform with integrated frontend and backend services.

---

## 🚀 Features

* **User authentication** (sign up, log in, log out)
* **Protected routes**, ensuring only authenticated users can access key pages
* **Trip browsing and booking**—explore available tours, view details, and book
* **MongoDB-based backend** for storing users, tours, and bookings
* **Modern frontend** with responsive design and dynamic UI
* **Modular code structure** separating client, server, and shared logic

---

## 📂 Project Structure

```
EasyTravels/
├── backend/          # Express.js or Java-based API server
│   ├── src/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── config/
│   └── package.json or pom.xml
├── frontend/         # React, Angular, or Vanilla JS UI
│   ├── public/
│   ├── src/
│   └── package.json
├── database/         # MongoDB initialization scripts (optional)
├── .gitignore
└── README.md
```

---

## 🧱 Prerequisites

* Node.js (v14+)
* MongoDB (v4+) or cloud-hosted MongoDB
* (If using Java backend) Java 11+ and Maven

---

## ⬇️ Installation & Setup

1. **Clone** the repo:

   ```bash
   git clone https://github.com/CodeVoyagerXX/EasyTravels.git
   cd EasyTravels
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install             # or mvn install if Java/Maven
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables:**

   Create a `.env` in `backend/`:

   ```dotenv
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/easytravels
   JWT_SECRET=your_jwt_secret
   ```

   Adjust ports or secrets as needed.

5. **Start services:**

   ```bash
   # Backend
   cd backend && npm start

   # Frontend (in separate terminal)
   cd frontend && npm start
   ```

6. **Open in browser:**

   * Frontend: `http://localhost:3000`
   * API (optional): `http://localhost:5000/api`

---

## 🧪 Development

* Frontend:

  * `npm run start`: run dev server with hot reload
  * `npm run build`: production-ready build
* Backend:

  * `npm run dev`: development mode with auto-reload (via nodemon)
  * `npm test`: run unit/integration tests

---

## 🔐 Auth Flow

1. Users sign up or log in via frontend forms.
2. Backend issues JWT on successful login.
3. Protected endpoints validate token before data access.
4. Frontend stores token (localStorage or cookies) to maintain session.

---

## 📦 Technologies Used

* **Frontend**: React or Angular (or vanilla JS), CSS framework
* **Backend**: Express.js (or Spring Boot if Java)
* **Database**: MongoDB for storing user data, tours, bookings
* **Auth**: JWT + bcrypt for secure password hashing

---

## 🌐 API Endpoints

* `POST /api/auth/signup` – create a new user
* `POST /api/auth/login` – obtain JWT
* `GET /api/tours` – list all tours
* `GET /api/tours/:id` – tour details
* `POST /api/bookings` – create a new booking
* `GET /api/bookings` – view user's bookings (protected)

*(Update this section to match your actual endpoints and HTTP payloads.)*

---

## ♻️ Contributing

Contributions are welcome! To propose changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to your fork (`git push origin feature-name`)
5. Open a Pull Request—make sure to document and test new features

---

## 🗜️ License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.
