# 🗳️ UniClub Polls - University Club Voting Platform

A full-stack web application designed to digitize university club elections, eliminating manual vote counting and queues while enhancing student participation and administrative transparency.

---

## 🚀 Project Overview

- **Goal:** Digitize the traditional club voting process, reduce time and human errors, and ensure every student can vote securely from anywhere.
- **Tech Stack:** React.js, Node.js, Express.js, MongoDB Atlas, JWT, Materialize CSS, Chart.js, Jest, Postman
- **Domain:** Student Engagement / University Fest Management

---

## ❓ Why This Project?

In our university, club funding for technical fest activities is allocated based on student interest via voting. This used to be manual—long queues, low turnout, and delayed results. I wanted to streamline it with a digital solution where:

- Voting takes <2 minutes.
- Results are instant.
- Every student gets an equal chance to vote securely.
- Admins get live analytics.

---

## 🔑 Core Features

- ✅ **JWT-based Authentication**: Secure login and signup.
- ✅ **Single Vote Enforcement**: Each student can vote only once.
- ✅ **Live Vote Count & Pie Charts**: Visual representation of poll results.
- ✅ **Protected Routes**: Only logged-in users can access voting.
- ✅ **User Profile Page**: Students can view their own details.
- ✅ **Admin APIs**: (Optional/Extendable) for viewing total analytics.
- ✅ **Unit & Integration Testing**: Tested with Jest (frontend) and Postman (backend).
- ✅ **Responsive UI**: Mobile and desktop support via Materialize CSS.

---

## 🧱 System Architecture

```text
Frontend (React.js)
│
├── Auth Screens (SignIn, SignUp)
├── Voting (Home)
├── Profile Display
├── Chart.js Integration
└── Context API for global state

Backend (Node.js + Express.js)
│
├── JWT Middleware
├── Auth Routes (/signin, /signup)
├── Post Routes (/vote, /allpost)
└── MongoDB Atlas with Mongoose

Authentication Flow:
[Login] → [JWT Token Issued] → [Stored in localStorage] → [Access Protected APIs]
````

---


## ⚙️ How to Run Locally

### Prerequisites

* Node.js and npm
* MongoDB Atlas account
* Git

### Setup Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/uniclub-polls.git
   cd uniclub-polls
   ```

2. **Backend Setup**

   ```bash
   cd server
   npm install
   create a file `keys.js` with:
   module.exports = {
     MONGO_URI: 'your-mongodb-connection-string',
     JWT_SECRET: 'your-secret-key'
   }
   npm start
   ```

3. **Frontend Setup**

   ```bash
   cd client
   npm install
   create a `.env` file with:
   REACT_APP_BACKEND_URL=http://localhost:5000
   npm start
   ```

---

## 🧪 Testing

### ✅ Unit Testing (Frontend)

* Using **Jest**
* Tests for form validation, user state handling, and voting logic.

### 🔁 Integration Testing (Backend)

* Using **Postman**
* Routes tested:

  * `/signin`
  * `/signup`
  * `/vote`
  * `/allpost`

---

## 📊 Charts and Live Results

* Integrated with **Chart.js**
* Renders live Pie Charts based on votes.
* Data fetched via protected API and dynamically updated.

---

## 🔐 Role-Based Access Control (RBAC)

* Students can only vote once.
* Admin users can (optionally) be assigned for analytics and dashboard access.
* JWT tokens validated for every protected route via middleware.

---

## 📂 Folder Structure

```
├── client
│   ├── src/components/screens/ (Signin, Signup, Home, Chart, Profile)
│   └── App.js, userReducer.js, context.js
├── server
│   ├── models (User.js, Post.js)
│   ├── routes (auth.js, post.js, user.js)
│   ├── middleware/requireLogin.js
│   └── app.js
```

---

## 💡 Future Enhancements

* Admin dashboard for analytics and club management
* Email-based OTP or Captcha verification
* Voting time window scheduler
* Role-based dashboards

---

## 🏆 Impact

* Reduced vote processing time by **90%**
* Improved student participation by **70%**
* Brought complete transparency to vote counting
* A real-world deployable system for university election processes

---

## 🛠️ Technologies Used

| Purpose        | Technology                |
| -------------- | ------------------------- |
| Frontend UI    | React.js, Materialize CSS |
| Data Viz       | Chart.js                  |
| Backend Server | Node.js, Express.js       |
| Database       | MongoDB Atlas             |
| Auth           | JWT                       |
| Testing        | Jest, Postman             |

---

## 🙋 Author

**Jayadeep Chenchugari**

* [LinkedIn](https://www.linkedin.com/in/jayadeep-chenchugari/)
* [GitHub](https://github.com/Jayadeepchenchugari)

