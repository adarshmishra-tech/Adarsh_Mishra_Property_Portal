Property Portal - Installation & Setup Guide

Follow these steps to run the Property Portal locally using Node.js.

1️⃣ Clone & Navigate

Open your terminal and run:

 Clone the repository
git clone https://github.com/adarshmishra-tech/Adarsh_Mishra_Property_Portal.git

 Navigate into the project folder
cd Adarsh_Mishra_Property_Portal
2️⃣ Install Dependencies

Navigate to the server directory and install the required packages:

cd server
npm install

This will install all backend dependencies, including Express, SQLite3, and JWT.

3️⃣ Start the Server

Run the backend server:

node index.js

You should see the following output:
🚀 Property Portal Server Running! on http://localhost:5000

The backend automatically serves the frontend files.

4️⃣ View the Application

Open your browser and navigate to:

http://localhost:5000

🔐 Testing the Application
Registration:
If you don’t have an account, click “Don’t have an account? Register” on the login screen.
Database:
The app uses a self-contained SQLite database (database.sqlite).
No external database setup or migrations are required.
Favorites:
Once registered and logged in, click the ⭐ Add to Favourites button to save properties to your profile.
Security:
All protected actions (like favouriting) require a JWT token, which the server validates automatically.
🛠️ Technical Stack
Backend: Node.js, Express.js (v5.0+ compatible)
Frontend: Vanilla JavaScript (ES6+), Tailwind CSS
Authentication: JWT (JSON Web Tokens) & LocalStorage
Database: SQLite3 for persistent storage
