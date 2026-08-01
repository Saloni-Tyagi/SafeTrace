# 🛡️ SafeTrace

SafeTrace is a full-stack personal safety and complaint management web application. It lets users report vehicle-related complaints, manage emergency contacts, and trigger location-based SOS alerts — with a dedicated admin dashboard to track and resolve reported issues.

## ✨ Features

- **Authentication** — Secure user registration and login with hashed passwords (bcrypt) and JWT-based sessions stored in HTTP-only cookies.
- **Complaint Reporting** — Users can file complaints against vehicles with a category, description, and status tracking (`Pending → In Progress → Resolved/Rejected`).
- **Emergency Contacts** — Add, edit, and delete trusted emergency contacts tied to each user account.
- **SOS Alerts** — Send real-time location-based SOS alerts (latitude/longitude) and view alert history.
- **Admin Dashboard** — Admins can view all complaints across users, update statuses, and remove resolved/invalid entries.
- **Role-based Access Control** — Separate middleware guards for authenticated users vs. admin-only routes.

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Backend    | Node.js, Express.js                  |
| Database   | MongoDB with Mongoose ODM            |
| Views      | EJS (server-side rendering)          |
| Auth       | JWT, bcrypt, HTTP-only cookies       |
| Security   | Helmet, express-rate-limit           |
| Styling    | Custom CSS (Poppins font, card-based UI) |

## 📂 Project Structure

```
SafeTrace/
├── config/           # Database connection
├── controllers/      # Route logic (auth, complaints, contacts, alerts, admin, profile)
├── middleware/        # Auth & admin route guards
├── models/            # Mongoose schemas (User, Complaint, Contact, Alert)
├── public/css/        # Stylesheets
├── routes/            # Express route definitions
├── views/              # EJS templates
├── server.js           # App entry point
└── .env.example        # Environment variable template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository
```bash
   git clone https://github.com/Saloni-Tyagi/SafeTrace.git
   cd SafeTrace
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root directory (use `.env.example` as a reference):
```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
```

4. Start the server
```bash
   npm start
```

5. Visit `http://localhost:3000` in your browser.

## 🔐 Security Notes

- Passwords are hashed with bcrypt before storage.
- JWT tokens are stored in HTTP-only, SameSite cookies to reduce XSS/CSRF risk.
- Helmet sets secure HTTP headers by default.
- Login/register routes are rate-limited to slow down brute-force attempts.

## 📸 Screenshots

*(Add a few screenshots of the dashboard, complaint form, and admin panel here — this section matters a lot for resume visibility.)*

## 🗺️ Future Improvements

- Email/SMS notifications for SOS alerts
- Password reset flow
- Pagination for admin complaint list
- Unit/integration tests

## 👤 Author

**Saloni Tyagi**
[linkedin.com/in/saloni-tyagi-12a676315](#) · [https://github.com/Saloni-Tyagi](#) 

## 📄 License

This project is licensed under the ISC License.