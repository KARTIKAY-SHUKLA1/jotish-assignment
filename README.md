# Jotish Employee Hub 
### Frontend Internship Assignment — ReactJS Application

A polished, production-grade employee management portal built for the Jotish Frontend Internship Assignment.

---
##  Live Application

🔗 https://jotish-assignment-iv11.vercel.app/ 

> **Login credentials:**  
> Username: `testuser`  
> Password: `Test123`

---

##  Demo Video

 Watch the full project walkthrough here:  
👉 https://drive.google.com/file/d/12SkK9htBG3qAZmLF0YghlJ-R8XHLCrEi/view?usp=sharing


##  Screens

| Screen | Description |
|--------|-------------|
| **Login** | Credential-based auth with password toggle & validation |
| **Employee List** | Live API data, real-time search, department filter, sort |
| **Employee Detail** | Full profile with contact & personal info |
| **Photo Capture** | Live camera feed using `getUserMedia` API |
| **Photo Result** | Preview & download captured photo |
| **Salary Chart**  | Interactive bar chart — top 10 salaries by department |
| **City Map**  | Leaflet dark map with employee cluster pins across India |

---

## Tech Stack

- **ReactJS** — Frontend framework
- **Recharts** — Salary bar chart
- **Leaflet.js** — Interactive city map
- **getUserMedia API** — Live camera capture
- **CSS-in-JS** — Custom dark theme with Jotish gold branding

---

##  Project Structure

```
src/
├── components/
│   ├── NavBar.jsx        ← Sticky navigation bar
│   └── Spinner.jsx       ← Loading spinner
├── constants/
│   └── data.js           ← API config, colors, fallback data
├── context/
│   └── AuthContext.jsx   ← Auth state management
├── hooks/
│   └── useRoute.js       ← Custom hash-based router
├── pages/
│   ├── LoginPage.jsx     ← Screen 1
│   ├── ListPage.jsx      ← Screen 2
│   ├── DetailPage.jsx    ← Screen 3 (with camera)
│   ├── PhotoPage.jsx     ← Screen 4
│   ├── ChartPage.jsx     ← Bonus: Salary chart
│   └── MapPage.jsx       ← Bonus: City map
├── App.jsx               ← Root with routing logic
└── index.js              ← Entry point
```

---

##  Setup & Run

```bash
# 1. Clone the repo
git clone https://github.com/KARTIKAY-SHUKLA1/jotish-assignment.git
cd jotish-assignment

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

App runs at **http://localhost:3000**

---

##  API

**Endpoint:** `POST https://backend.jotish.in/backend_dev/gettabledata.php`

```json
{ "username": "test", "password": "123456" }
```

The app fetches live data from this API and falls back to mock data if unavailable.

---

##  Key Features

- 🔐 **Auth guard** — Protected routes, session-based login
- 🔍 **Real-time search** — Filter by name, city, email
- 🏷️ **Department filter** — One-click filtering with color coding
- 📊 **Sort** — By name, salary, or age
- 📸 **Live camera** — Captures photo using device webcam
- 🗺️ **Interactive map** — Dark Leaflet map with clickable city pins
- 📱 **Responsive** — Works on all screen sizes
- ⭐ **Jotish-themed UI** — Gold/amber palette matching brand identity

---

## Screenshots

See the `/screenshots` folder for all screen captures.

---

*Built by Kartikay Shukla*