# Cosmos Explorer (Solar System Explorer)

Hey! Welcome to the **Cosmos Explorer** project. This is a 3D Solar System simulation and digital astronomy encyclopedia that I built to make learning about space a lot more interactive and fun.

Instead of just reading a textbook, this site lets you fly around planets, see actual orbital mechanics in action, and explore data pulled from NASA sources—all right in the browser.

---

## 🚀 What It Does

- **3D Solar System Visualization:** Renders the solar system using WebGL so you can pan, zoom, and look around.
- **Orbit Sandbox:** You can literally speed up time and watch how the planets orbit the sun over days, months, and years.
- **Interactive Planetary Dashboard:** A smooth carousel layout that lets you browse all the celestial bodies.
- **Automatic Planet Generators:** A Python script generates the HTML for all 8 planet pages automatically, filling them with geology info, atmosphere charts, and fun facts.
- **Live Data:** Hooked up to simulate fetching live data (like distances and speeds) from JPL/NASA.
- **Space Quiz:** Tests your knowledge with a GSAP-animated quiz system.
- **Fun Facts Feed:** A scrolling feed of cool astronomy and space exploration facts.


---

## 🛠 What I Used (Tech Stack)

I wanted to keep the stack simple but powerful enough to handle 3D and heavy UI interactions:

- **Frontend Core:** HTML5, CSS3, and Vanilla JavaScript.
- **UI Design:** Heavy use of modern CSS glassmorphism, flexbox, grid, and cool font pairings (Orbitron & Inter).
- **3D Rendering:** `Three.js` (WebGL) for the actual outer space simulations.
- **Animations:** `GSAP` to make the UI feel smooth and alive.
- **Backend / Generators:**
  - **Python:** Used a python script (`generate_planet_pages.py`) to auto-build all the planet detail pages instead of typing them out manually.


---

## 📂 Folder Structure

Here's a quick look at where everything lives:

```text
📦 Solar-System-website
 ┣ 📂 js                        # Logic (Three.js space engine, API fetching)
 ┣ 📂 pic                       # All the images of planets
 ┣ 📂 space photos              # Additional planetary assets
 ┣ 📜 index.html                # Main entry point (formerly home.html)
 ┣ 📜 style.css                 # Master design system (formerly home.css)
 ┣ 📜 planets.html              # 2D planet carousel dashboard
 ┣ 📜 orbit.html                # 3D orbit simulator
 ┣ 📜 quiz.html                 # Trivia system
 ┣ 📜 funfacts.html             # Cosmic facts archive
 ┣ 📜 generate_planet_pages.py  # Python generator for planet pages
 ┣ 📜 [planet].html             # Auto-generated planet pages
 ┗ 📜 README.md
```

---

## 💻 Running It Locally

Because it uses JavaScript modules and local file fetching, you'll need to run it through a local web server (otherwise your browser will block the scripts).

1. **Clone the repo:**
   ```bash
   git clone <your-repository-url>
   cd Solar-System-website
   ```
2. **Start a local server:**
   If you have Python installed, just run:
   ```bash
   python -m http.server 8080
   ```
3. **Check it out:** 
   Open your browser and head to `http://localhost:8080/index.html`.
4. **Generating Planet Pages:** 
   If you want to edit the planet info, just edit the data block cleanly inside `generate_planet_pages.py` and run it with `python generate_planet_pages.py`. It'll automatically rebuild all 8 planet pages for you instantly.

---

Hope you enjoy exploring the solar system as much as I enjoyed building it!
