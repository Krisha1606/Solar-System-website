# 🌌 Cosmos Explorer (Solar System Simulator)

I’ve always been fascinated by space, but most astronomy websites feel like reading a static textbook. I wanted to build something that felt more like a cinematic experience—an interactive simulation where you can actually see the planets orbit and dive into the data yourself.

This is **Cosmos Explorer**, a 3D solar system experience built using WebGL and a whole lot of CSS.

---

## 🔗 Check it out live

🚀 **Live Site:** [Explore the Solar System here](https://solar-system-website-6blm3crna-krisha1606s-projects.vercel.app?_vercel_share=iGBADQNlrluMDW1p7Lj3QaPRo5b3ruob)

---

## ✨ Features

* **3D Solar System Explorer:** A fully restored **Three.js** engine that renders a real-time starfield and planetary lineup. You can zoom in, pan around, and watch the planets follow their orbital paths.
* **Universal Navigation:** A standardized, premium header across all pages for a seamless browsing experience.
* **Orbits & Time Control:** Real-world physics-based time progression. Speed up time to watch how the planets move around the sun in high-speed or real-time.
* **Planet Dashboard:** A clean, easy-to-use UI to switch between planets and see their stats (radius, distance, day length, etc.).
* **Auto-Generated Data Pages:** Powered by a **Python script** that auto-generates high-impact data pages for all eight planets using a NASA-inspired template.
* **NASA JPL Integration:** Displays live planetary positions synchronized with NASA's JPL Horizons system.
* **Interactive Quiz & Fun Facts:** Test your cosmic knowledge with an interactive quiz or explore a curated feed of space facts.

---

## 🛠 Tech I Used

I wanted to keep the tech stack lightweight but powerful enough to handle 3D rendering:

* **Core:** HTML5, Vanilla JavaScript, and CSS3.
* **Graphics:** **Three.js** for the WebGL space engine.
* **Motion:** **GSAP** for UI transitions and cinematic animations.
* **Automation:** **Python** for building the individual planet pages.
* **Deployment:** Vercel.

---

## 📂 Folder Structure

```text
📦 Solar-System-website
 ┣ 📂 js                        # 3D engine, NASA JPL sync & data logic
 ┣ 📂 pic                       # 8K Planet textures & branding visuals
 ┣ 📂 space photos              # Extra environmental assets
 ┣ 📜 index.html                # Immersive landing page
 ┣ 📜 style.css                 # Master design system & tokens
 ┣ 📜 planets.html              # Planet carousel dashboard
 ┣ 📜 orbit.html                # Full-screen 3D simulator
 ┣ 📜 quiz.html                 # Interactive trivia system
 ┣ 📜 funfacts.html             # Cosmic facts feed
 ┣ 📜 generate_planet_pages.py  # Python template generator
 ┣ 📜 [planet].html             # Dynamic planet detail pages
 ┗ 📜 README.md
```

---

## 💻 Running it on your computer

Since this project uses JavaScript modules and local file fetching, you'll need to run it through a local server (otherwise the 3D stuff won't load properly).

1. Clone the repo.
2. Open a terminal in the folder.
3. If you have Python, run: `python -m http.server 8080`
4. Go to `http://localhost:8080/index.html` in your browser.

---

## 🚀 What’s Next?

I’m still working on this! A few things I want to add in the future:
* Adding the moons and asteroid belts.
* Interactive 3D surface landings for select planets.
* Enhanced mobile-optimized controls.

---

## 💡 What I learned

Building this was a huge learning curve for me. It was my first time really diving into **Three.js** and managing complex UI layers on top of a 3D canvas. It taught me a lot about project structure, WebGL optimization, and how to automate repetitive tasks with Python.

**Built with 🚀 by Krisha Vaghani**
