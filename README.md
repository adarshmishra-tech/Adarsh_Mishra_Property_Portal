Installation & Setup (Recruiter Guide)
Follow these steps to run the Property Portal locally using Node.js.

1. Clone & Navigate
Open your terminal and run:


git clone https://github.com/adarshmishra-tech/Adarsh_Mishra_Property_Portal.git

cd Adarsh_Mishra_Property_Portal

2. Install Dependencies
Navigate to the server directory and install the required packages:

cd server
npm install

3. Start the Server
Run the backend. This will automatically serve the frontend as well:

PowerShell
node index.js
Note: You should see: 🚀 Property Portal Server Running!

4. View the Application
Open your browser and navigate to:
http://localhost:5000

🔐 Testing the Application
Registration: If you don't have an account, click "Don't have an account? Register" on the login screen.

Database: The app uses a self-contained SQLite database (database.sqlite). No external database setup or "Migrations" are required.

Favorites: Once registered and logged in, you can click the ⭐ Add to Favourites button to save properties to your profile.

Security: All protected actions (like favoriting) require a JWT Token, which the server validates automatically.

🛠️ Technical Stack
Backend: Node.js, Express.js (v5.0+ compatible).

Frontend: Vanilla JavaScript (ES6+), Tailwind CSS.

Auth: JWT (JSON Web Tokens) & LocalStorage.

Data: SQLite3 for persistent storage.
