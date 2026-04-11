# 🌌 Cosmos Explorer (Solar System Simulator)

I’ve always been fascinated by space, but most astronomy websites feel like reading a static textbook. I wanted to build something that felt more like a cinematic experience—an interactive simulation where you can actually see the planets orbit and dive into the data yourself.

This is **Cosmos Explorer**, a 3D solar system experience built using WebGL and a whole lot of CSS.

---

## 🔗 Check it out live

🚀 **Live Site:** [Explore the Solar System here](https://solar-system-website-je7dtkcoc-krisha1606s-projects.vercel.app?_vercel_share=3CxRp4fgpnnm9GqwFPxxBTN93Redy7mH)

---

## ✨ Features

* **3D Solar System:** I used **Three.js** to render a real-time starfield and planetary lineup. You can zoom in and pan around to get a feel for the scale.
* **Orbits & Time Control:** You can speed up time to watch how the planets move around the sun. It’s a great way to see the different orbital speeds in action.
* **Planet Dashboard:** A clean, easy-to-use UI to switch between planets and see their stats (radius, distance, day length, etc.).
* **Auto-Generated Data Pages:** Instead of hand-coding every single planet page, I wrote a **Python script** that auto-generates them using a template. It fills in all the facts, geology, and atmosphere data for me.
* **Live NASA-Inspired Data:** Displays dynamic stats like current distances and speeds, simulating the kind of data you'd see from JPL.
* **Interactive Quiz & Fun Facts:** A little something extra—test your knowledge with a quiz or just browse through the random cosmic facts feed.

---

## 🛠 Tech I Used

I wanted to keep the tech stack lightweight but powerful enough to handle 3D rendering:

* **Core:** HTML5, Vanilla JavaScript, and CSS3.
* **Graphics:** **Three.js** for the WebGL space engine.
* **Motion:** **GSAP** for the UI transitions and animations.
* **Automation:** **Python** for building the individual planet pages.
* **Deployment:** Vercel.

---

## 📂 Folder Structure

```text
📦 Solar-System-website
 ┣ 📂 js                        # 3D engine & data logic
 ┣ 📂 pic                       # Planet textures & visuals
 ┣ 📂 space photos              # Extra branding assets
 ┣ 📜 index.html                # Main landing page
 ┣ 📜 style.css                 # Master design system
 ┣ 📜 planets.html              # Planet carousel dashboard
 ┣ 📜 orbit.html                # The 3D simulator
 ┣ 📜 quiz.html                 # Trivia system
 ┣ 📜 funfacts.html             # Cosmic facts feed
 ┣ 📜 generate_planet_pages.py  # My page generator script
 ┣ 📜 [planet].html             # The generated planet pages
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
* Hooking it up to a real NASA API for 100% accurate live data.
* Adding the moons and asteroid belts.
* Making it feel smoother on mobile phones.

---

## 💡 What I learned

Building this was a huge learning curve for me. It was my first time really diving into **Three.js** and managing complex UI layers on top of a 3D canvas. It taught me a lot about project structure and how to automate repetitive tasks with Python.

**Built with 🚀 by Krisha Vaghani**
