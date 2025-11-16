# **Sweet Shop Management System – TDD Kata**

This project is a full-stack implementation of the **Sweet Shop Management System** assigned as a TDD Kata.
It includes a fully tested backend built with **Node.js**, **Express**, **JWT authentication**, **MongoDB**, and a modern frontend built with **React + Vite**, featuring dark mode, animations, a premium UI theme, and protected routes.

The goal was to build a complete production-style application while following **Test-Driven Development**, clean architecture, and transparent AI-assisted development practices.
<img width="1919" height="876" alt="image" src="https://github.com/user-attachments/assets/2c7c4e7c-d51f-4d18-90ca-3574ece36d90" />
<img width="1905" height="868" alt="image" src="https://github.com/user-attachments/assets/1c63a8f6-393a-46e2-8938-f89646419be8" />

---<img width="1917" height="868" alt="image" src="https://github.com/user-attachments/assets/a2a19856-5f8b-4096-a4a2-5bbf7e412311" />
<img width="1919" height="858" alt="image" src="https://github.com/user-attachments/assets/f2c1a021-8eeb-44ba-b9fc-5d9e6333e695" />


## **🚀 Tech Stack**

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Jest + Supertest (TDD)
* dotenv

### **Frontend**

* React (Vite)
* React Router
* Framer Motion
* React Toastify
* Confetti animations
* Dark Mode (custom implementation)
* Premium CSS theme

---

## **📂 Project Structure**

```
TDD-Kata-Sweet-Shop-Management-System/
│
├── server/
│   ├── index.js
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── tests/
│   ├── jest.setup.js
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api.js
    │   ├── App.jsx
    │   ├── theme.js
    │   ├── styles.css
    │   └── main.jsx
    └── package.json
```

---

# **🧪 Test-Driven Development**

The backend was developed using a **Red → Green → Refactor** workflow.

### **Key TDD Areas**

* Authentication tests
* Sweet creation and purchase tests
* Database cleanup between runs
* Supertest-based integration tests
* Verified JWT validation
* Ensured test isolation

### **Run Tests**

```bash
cd server
npm test
```

---

# **🔐 Features**

### **Authentication**

* Register & Login
* JWT-protected routes
* Admin role support

### **Sweets Module**

* Add sweet (protected)
* List sweets
* Search sweets (name/category/price)
* Update sweet
* Delete sweet (admin only)
* Purchase sweet
* Restock sweet (admin only)

### **Frontend Features**

* Modern premium UI theme
* Dark/Light mode toggle
* Floating candy background
* Confetti after successful purchase
* Page transitions
* Loading skeletons
* Empty states
* Protected routes
* Responsive layout

---

# **⚙️ Setup Instructions**

## **Backend Setup**

```bash
cd server
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
PORT=5000
```

Run backend:

```bash
npm start
```

---

## **Frontend Setup**

```bash
cd client
npm install
npm run dev
```

By default frontend runs on:

```
http://localhost:5173
```

---

# **🔗 API Endpoints**

### **Auth**

| Method | Route              | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

### **Sweets**

| Method | Route                    | Protected | Description |
| ------ | ------------------------ | --------- | ----------- |
| POST   | /api/sweets              | Yes       | Add sweet   |
| GET    | /api/sweets              | No        | List sweets |
| GET    | /api/sweets/search       | No        | Search      |
| PUT    | /api/sweets/:id          | Yes       | Update      |
| DELETE | /api/sweets/:id          | Admin     | Delete      |
| POST   | /api/sweets/:id/purchase | Yes       | Purchase    |
| POST   | /api/sweets/:id/restock  | Admin     | Restock     |

---

# **🖼️ Screenshots (Add Your Images Here)**

### **Home Page**

*(insert screenshot)*

### **Admin Dashboard**

*(insert screenshot)*

### **Dark Mode**

*(insert screenshot)*

### **Purchase Confetti Animation**

*(insert screenshot)*

---

# **🧠 My AI Usage (Required Section)**

The project was primarily designed, structured, and implemented manually.
AI tools were used **only as secondary assistance**, mainly for:

* Debugging test environment issues
* Refining CSS animations
* Polishing frontend UI transitions
* Getting suggestions for minor optimizations

All architectural decisions, core backend logic, test cases, and major UI implementation were written and reasoned by the project author.

### **AI Tools Used**

* Chat-based AI assistant (for small guidance & debugging help)

### **How AI Was Used**

* Asked for suggestions when stuck with Jest + Supertest setup
* Requested ideas for UI polish (not code generation)
* Confirmed edge cases for purchase/restock flow

### **Impact Assessment**

AI was helpful for saving time during debugging, but **the main engineering work, logic, and implementation were done manually**.

Per assignment requirements, all commits where AI suggestions influenced the changes include:

```
Co-authored-by: Chatgpt AI , Claude AI , Gemini 

```

---


