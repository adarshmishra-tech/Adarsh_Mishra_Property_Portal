Property Portal – Installation & Setup Guide (Updated with npm Fix)

Follow these steps to run the Property Portal locally using Node.js.

1️⃣ Clone & Navigate

Open your terminal or PowerShell and run:

# Clone the repository
git clone https://github.com/adarshmishra-tech/Adarsh_Mishra_Property_Portal.git

# Navigate into the project folder
cd Adarsh_Mishra_Property_Portal
2️⃣ Install Node.js & npm (if not installed or not recognized)

If node -v or npm -v does not work, follow these steps:

Step A: Install Node.js silently via PowerShell
# Download and install Node.js LTS version silently
Invoke-WebRequest "https://nodejs.org/dist/v20.4.0/node-v20.4.0-x64.msi" -OutFile "$env:TEMP\nodejs.msi"; Start-Process msiexec.exe -Wait -ArgumentList '/i', "$env:TEMP\nodejs.msi", '/quiet', '/norestart'

Step B: Add Node.js to PATH (temporary fix)
$env:Path += ";C:\Program Files\nodejs\"

⚠️ If Node.js is installed elsewhere, replace the path accordingly.

Step C: Verify Node.js and npm
node -v
npm -v

You should see the installed versions.

Step D: Permanent PATH fix (optional)
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\nodejs\", [EnvironmentVariableTarget]::Machine)

After this, you can close and reopen PowerShell and Node/npm will always be recognized.

3️⃣ Install Dependencies

Navigate to the server directory and install the required packages:

cd server
npm install

This installs all backend dependencies, including Express, SQLite3, and JWT.

💡 If npm fails, make sure Node.js is installed and PATH is set correctly (see Step 2).

4️⃣ Start the Server

Run the backend server:

node index.js

You should see:

🚀 Property Portal Server Running! on http://localhost:5000

The backend automatically serves the frontend files.

5️⃣ View the Application

Open your browser and go to:

http://localhost:5000
🔐 Testing the Application

Registration: Click “Don’t have an account? Register” on the login screen.
Database: Uses self-contained database.sqlite; no external database setup required.
Favorites: Click  Add to Favourites to save properties to your profile.
Security: Protected actions require a JWT token, validated automatically.
🛠️ Technical Stack
Backend: Node.js, Express.js (v5.0+ compatible)
Frontend: Vanilla JavaScript (ES6+), Tailwind CSS
Authentication: JWT & LocalStorage
Database: SQLite3 for persistent storage
