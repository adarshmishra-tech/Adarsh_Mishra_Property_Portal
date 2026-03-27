const API_URL = 'http://localhost:5000/api';
let isLoginMode = true;

// 1. Auth Toggle logic
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? 'Login to Portal' : 'Create Account';
}

// 2. Handle Login/Register
async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const endpoint = isLoginMode ? '/auth/login' : '/auth/register';

    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name: email.split('@')[0] })
        });
        const data = await res.json();

        if (res.ok) {
            if (isLoginMode) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                showDashboard();
            } else {
                alert("Account created! Please login.");
                toggleAuthMode();
            }
        } else {
            alert(data.error);
        }
    } catch (err) { console.error(err); }
}

// 3. Load Dashboard
async function showDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('dashboard-section').classList.remove('hidden');
    document.getElementById('user-name').innerText = user.name;
    document.getElementById('user-role').innerText = user.role;

    loadProperties();
}

// 4. Fetch & Render Properties
async function loadProperties() {
    const token = localStorage.getItem('token');
    const [propRes, favRes] = await Promise.all([
        fetch(`${API_URL}/properties`),
        fetch(`${API_URL}/properties/favourites`, { headers: { 'Authorization': `Bearer ${token}` } })
    ]);

    const allProps = await propRes.json();
    const favProps = await favRes.json();
    const favIds = favProps.map(f => f.id);

    const container = document.getElementById('property-list');
    container.innerHTML = allProps.map(p => `
        <div class="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg transition hover:scale-[1.02]">
            <img src="${p.imageUrl}" class="w-full h-48 object-cover opacity-80">
            <div class="p-5">
                <h3 class="text-xl font-semibold">${p.address}</h3>
                <p class="text-blue-400 font-bold text-lg mt-1">$${p.price.toLocaleString()}</p>
                <button onclick="toggleFavorite(${p.id})" 
                    class="mt-4 w-full py-2 rounded font-medium transition ${favIds.includes(p.id) ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-gray-700 hover:bg-gray-600'}">
                    ${favIds.includes(p.id) ? '❤️ Favourited' : '🤍 Add to Favourites'}
                </button>
            </div>
        </div>
    `).join('');
}

// 5. Toggle Favourite
async function toggleFavorite(id) {
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/properties/favourites/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    loadProperties(); // Refresh list
}

function logout() {
    localStorage.clear();
    location.reload();
}

// Initial Check
if (localStorage.getItem('token')) showDashboard();
