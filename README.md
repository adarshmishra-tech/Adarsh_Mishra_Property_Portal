Property Portal - Full Stack Assessment
A responsive, full-stack property listing application built with Node.js, Express, and SQLite3. This project demonstrates user authentication, JWT-based authorization, and persistent data storage for "favourite" properties.

🚀 Features
User Authentication: Secure Register and Login flow using bcryptjs for password hashing and jsonwebtoken (JWT) for session management.

Property Dashboard: A dynamic grid of real estate listings fetched from a SQLite database.

Persistent Favourites: Users can "Add to Favourites" or "Unfavourite" properties. These selections are stored in a relational database and persist after logout/refresh.

Protected Routes: Backend middleware ensures that only authenticated users can modify their favourites.

RESTful API: Clean separation between the frontend client and the backend server.

🛠️ Tech Stack
Frontend: HTML5, CSS3 (Tailwind CSS for styling), Vanilla JavaScript (Fetch API).

Backend: Node.js, Express.js.

Database: SQLite3 (Relational database).

Security: JWT (JSON Web Tokens) and Bcrypt.

📂 Project Structure
Plaintext
property-portal/
├── client/                 # Frontend files
│   ├── index.html          # Main UI
│   └── app.js              # Frontend logic & API calls
├── server/                 # Backend files
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── auth.js             # Auth routes (Login/Register)
│   ├── properties.js       # Property & Favourite routes
│   ├── db.js               # Database schema & seeding
│   ├── index.js            # Server entry point
│   └── package.json        # Dependencies & scripts
└── README.md

⚙️ Installation & Setup
Follow these steps to run the project locally on your machine:

1. Prerequisites
Ensure you have Node.js installed.

2. Install Dependencies
Navigate to the server directory and install the necessary packages:

Bash
cd server
npm install
3. Start the Server
Run the development server using nodemon:

Bash
npm run dev
The server will start on http://localhost:5000. The database (database.sqlite) will be automatically created and seeded with sample properties and high-quality images.

4. Open the Client
Since the frontend is built with Vanilla JS, simply open the client/index.html file in any modern web browser.

Note: If you are using WSL, navigate to the folder in Windows Explorer and double-click the file.

🔑 Test Credentials
You can register a new account through the UI, or use the pre-seeded credentials:

Email: test@example.com

Password: password123

🧠 Implementation Details
The "Favourite" Logic
The application uses a Many-to-Many relationship between Users and Properties via a favorites join table. When a user clicks the favourite button:

The frontend sends a POST (to add) or DELETE (to remove) request to the server.

The authMiddleware verifies the JWT in the Authorization header to identify the user.

The server updates the SQLite database and returns a success message.

The UI re-fetches the properties to reflect the updated state.

Author: Adarsh Mishra

Date: March 2026