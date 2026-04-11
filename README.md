# 🌌 Cosmos Explorer (Solar System Explorer)

An interactive **3D Solar System simulation and digital astronomy experience** built to make space exploration engaging, visual, and real-time.

Instead of static learning, this project allows users to **explore planets, simulate orbits, and interact with space data directly in the browser.**

---

## 🔗 Live Demo

🚀 **Explore it here:**
👉 **[Cosmos Explorer Live](https://solar-system-website-je7dtkcoc-krisha1606s-projects.vercel.app?_vercel_share=3CxRp4fgpnnm9GqwFPxxBTN93Redy7mH)**

---

## ✨ Key Highlights

* 🌍 Real-time 3D solar system using WebGL
* ⏳ Time control to simulate planetary motion
* 🪐 Interactive planet exploration UI
* 📊 NASA-inspired data visualization
* 🎮 Smooth animations & immersive experience

---

## 🚀 Features

* **3D Solar System Visualization**
  Built with Three.js for smooth rendering, zooming, and camera control.

* **Orbit Explorer (Simulation Mode)**
  Speed up time to observe real orbital mechanics.

* **Interactive Planet Dashboard**
  Clean UI to navigate between all planets.

* **Auto-Generated Planet Pages**
  Python script dynamically generates all planet detail pages.

* **Live Data Simulation**
  Displays dynamic values like distance & velocity (inspired by NASA/JPL data).

* **Space Quiz System**
  Animated quiz with scoring and interaction.

* **Fun Facts Feed**
  Continuous stream of interesting space facts.

---

## 🛠 Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript
* **3D Engine:** Three.js (WebGL)
* **Animations:** GSAP
* **Scripting:** Python (for page generation)
* **Deployment:** Vercel

---

## 📂 Project Structure

```text
📦 Solar-System-website
 ┣ 📂 js
 ┣ 📂 pic
 ┣ 📂 space photos
 ┣ 📜 index.html
 ┣ 📜 style.css
 ┣ 📜 planets.html
 ┣ 📜 orbit.html
 ┣ 📜 quiz.html
 ┣ 📜 funfacts.html
 ┣ 📜 generate_planet_pages.py
 ┣ 📜 [planet].html
 ┗ 📜 README.md
```

---

## 💻 Run Locally

```bash
git clone <your-repository-url>
cd Solar-System-website
python -m http.server 8080
```

👉 Open: http://localhost:8080/index.html

---

## 🔧 Planet Page Generator

Edit planet data in:

```text
generate_planet_pages.py
```

Then run:

```bash
python generate_planet_pages.py
```

---

## 🚀 Future Improvements

* 🌐 Real NASA API integration (live data instead of simulation)
* 🛰️ Add moons and asteroid belts
* 📱 Mobile optimization for 3D interactions
* 👤 User login + progress tracking

---

## 💡 What I Learned

* Working with **Three.js and 3D rendering**
* Managing complex UI interactions
* Structuring large frontend projects
* Deploying performant web apps using Vercel

---

## 👨‍💻 Author

Built with curiosity and passion for space exploration 🚀
