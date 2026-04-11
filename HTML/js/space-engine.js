/**
 * 3D Space Engine - Solar System Explorer
 * Powered by Three.js & NASA/JPL Data
 */

class SpaceEngine {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.options = Object.assign({
            sunScale: 5,
            planetScale: 1,
            distanceScale: 0.000001, // 1 unit = 1,000,000 km
            timeScale: 1, // Real-time multiplier
            autoRotate: true,
            showOrbits: true
        }, options);

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.planets = {};
        this.orbits = {};
        this.currentTime = new Date();
        this.targetBody = null; // New: tracking target
        
        this.init();
    }

    async init() {
        this.setupScene();
        this.setupLights();
        this.setupStars();
        
        if (this.options.focusPlanet) {
            await this.createSinglePlanet(this.options.focusPlanet);
        } else {
            this.createSun();
            await this.createPlanets();
        }
        
        this.setupInteractions();
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }

    async createSinglePlanet(planetId) {
        // Mock constant or find in our list
        const planetConfigs = {
            'mercury': { name: 'Mercury', id: '199', size: 10, texture: 'pic/hd_planets/mercury.png' },
            'venus':   { name: 'Venus',   id: '299', size: 10, texture: 'pic/hd_planets/venus.png' },
            'earth':   { name: 'Earth',   id: '399', size: 10, texture: 'pic/hd_planets/earth.png' },
            'mars':    { name: 'Mars',    id: '499', size: 10, texture: 'pic/hd_planets/mars.png' },
            'jupiter': { name: 'Jupiter', id: '599', size: 10, texture: 'pic/hd_planets/jupiter.png' },
            'saturn':  { name: 'Saturn',  id: '699', size: 10, texture: 'pic/hd_planets/saturn.png', hasRings: true },
            'uranus':  { name: 'Uranus',  id: '799', size: 10, texture: 'pic/hd_planets/uranus.png' },
            'neptune': { name: 'Neptune', id: '899', size: 10, texture: 'pic/hd_planets/neptune.png' }
        };

        const config = planetConfigs[planetId.toLowerCase()];
        if (!config) return;

        const geometry = new THREE.SphereGeometry(config.size, 64, 64);
        const texture = new THREE.TextureLoader().load(config.texture);
        const material = new THREE.MeshStandardMaterial({ map: texture });
        const planet = new THREE.Mesh(geometry, material);
        
        if (config.hasRings) this.addSaturnRings(planet);
        
        this.scene.add(planet);
        this.planets[config.name] = planet;
        this.camera.position.set(0, 0, 30);
    }


    setupScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 10000);
        this.camera.position.set(0, 350, 600); // Tilted view for depth

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // OrbitControls should be included in the HTML via script tag
        if (typeof THREE.OrbitControls !== 'undefined') {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.autoRotate = this.options.autoRotate;
            this.controls.autoRotateSpeed = 0.5;
            this.controls.enableZoom = true; // Always allow zoom in Explorer mode
            this.controls.enablePan = true;  // Always allow pan in Explorer mode 
            this.controls.minDistance = 50;
            this.controls.maxDistance = 3000; // Large enough to see all orbits
        }
    }

    setupLights() {
        // Sun acts as a PointLight
        const sunLight = new THREE.PointLight(0xffffff, 4, 3000); // Brighter light, further reach
        this.scene.add(sunLight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Slightly brighter ambient
        this.scene.add(ambientLight);
    }

    setupStars() {
        const vertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = THREE.MathUtils.randFloatSpread(2000);
            const y = THREE.MathUtils.randFloatSpread(2000);
            const z = THREE.MathUtils.randFloatSpread(2000);
            vertices.push(x, y, z);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
        const points = new THREE.Points(geometry, material);
        this.stars = points;
        this.scene.add(this.stars);
    }


    createSun() {
        const geometry = new THREE.SphereGeometry(30, 64, 64);
        const texture = new THREE.TextureLoader().load('space photos/sun rbg.png');
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            emissive: new THREE.Color(0xff4400),
            emissiveIntensity: 2
        });
        this.sun = new THREE.Mesh(geometry, material);
        this.scene.add(this.sun);

        // SUN HALO (Sphere-based, removes square boxes)
        const haloGeo = new THREE.SphereGeometry(45, 64, 64);
        const haloMat = new THREE.MeshBasicMaterial({
            color: 0xffaa00,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide // Glow outward
        });
        const sunHalo = new THREE.Mesh(haloGeo, haloMat);
        this.sun.add(sunHalo);

        // Core secondary glow for intensity
        const coreHaloGeo = new THREE.SphereGeometry(35, 64, 64);
        const coreHaloMat = new THREE.MeshBasicMaterial({
            color: 0xff7700,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        const coreHalo = new THREE.Mesh(coreHaloGeo, coreHaloMat);
        this.sun.add(coreHalo);
    }


    async createPlanets() {
        const planetConfigs = [
            { name: 'Mercury', id: '199', size: 8, dist: 58,  color: 0x8c8c8c, orbSpeed: 4.7, axialRot: 0.004, texture: 'pic/hd_planets/mercury.png' },
            { name: 'Venus',   id: '299', size: 16, dist: 108, color: 0xe3bb76, orbSpeed: 3.5, axialRot: -0.002, texture: 'pic/hd_planets/venus.png' },
            { name: 'Earth',   id: '399', size: 18, dist: 150, color: 0x2271b3, orbSpeed: 3.0, axialRot: 0.01, texture: 'pic/hd_planets/earth.png' },
            { name: 'Mars',    id: '499', size: 12, dist: 228, color: 0xe27b58, orbSpeed: 2.4, axialRot: 0.01, texture: 'pic/hd_planets/mars.png' },
            { name: 'Jupiter', id: '599', size: 55, dist: 400, color: 0xd39c7e, orbSpeed: 1.3, axialRot: 0.04, texture: 'pic/hd_planets/jupiter.png' },
            { name: 'Saturn',  id: '699', size: 45, dist: 600, color: 0xc5ab6e, orbSpeed: 0.9, axialRot: 0.038, texture: 'pic/hd_planets/saturn.png', hasRings: true },
            { name: 'Uranus',  id: '799', size: 30, dist: 800, color: 0xbbe1e4, orbSpeed: 0.6, axialRot: -0.01, texture: 'pic/hd_planets/uranus.png' },
            { name: 'Neptune', id: '899', size: 28, dist: 1000, color: 0x6081ff, orbSpeed: 0.5, axialRot: 0.01, texture: 'pic/hd_planets/neptune.png' }
        ];

        for (const config of planetConfigs) {
            const geometry = new THREE.SphereGeometry(config.size, 64, 64);
            const texture = new THREE.TextureLoader().load(config.texture);
            const material = new THREE.MeshStandardMaterial({ 
                map: texture,
                emissive: new THREE.Color(config.color),
                emissiveIntensity: 0.3 // Increased pop
            });
            const planet = new THREE.Mesh(geometry, material);
            
            planet.userData = { 
                name: config.name, 
                id: config.id,
                baseDist: config.dist,
                orbSpeed: config.orbSpeed,
                axialRot: config.axialRot,
                orbitAngle: Math.random() * Math.PI * 2 
            };

            this.addAtmosphericGlow(planet, config.color, config.size);
            
            // Add internal point light to make the planet 'glow' slightly in 3D
            const pLight = new THREE.PointLight(config.color, 1, config.size * 3);
            planet.add(pLight);

            if (config.hasRings) this.addSaturnRings(planet, config.size);

            this.scene.add(planet);
            this.planets[config.name] = planet;

            if (this.options.showOrbits) {
                this.createOrbitLine(config.dist, config.color);
            }
        }
    }


    addAtmosphericGlow(planet, color, size) {
        const glowGeo = new THREE.SphereGeometry(size * 1.2, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        planet.add(glow);
    }

    addSaturnRings(planet, size) {
        const ringGeo = new THREE.RingGeometry(size * 1.4, size * 2.2, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa, // Lighter rings
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
        });
        const rings = new THREE.Mesh(ringGeo, ringMat);
        rings.rotation.x = Math.PI / 2.5;
        planet.add(rings);
    }

    createOrbitLine(radius, color) {
        // Glowing Elliptical Path
        const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.99, 0, 2 * Math.PI, false, 0); 
        const points = curve.getPoints(128);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Inner Glow
        const material = new THREE.LineBasicMaterial({ 
            color: color, 
            transparent: true, 
            opacity: 0.4,
            blending: THREE.AdditiveBlending 
        });
        const orbit = new THREE.Line(geometry, material);
        orbit.rotation.x = Math.PI / 2;
        this.scene.add(orbit);

        // Outer faint trail
        const outerMat = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.1 });
        const outerOrbit = new THREE.Line(geometry, outerMat);
        outerOrbit.rotation.x = Math.PI / 2;
        outerOrbit.scale.set(1.005, 1.005, 1);
        this.scene.add(outerOrbit);
    }

    setupInteractions() {
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.hoveredPlanet = null;

        // Tooltip element (must exist in HTML or we create one)
        this.tooltip = document.getElementById('cursor-tooltip') || this.createTooltip();

        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('click', () => this.onClick());
    }

    createTooltip() {
        const div = document.createElement('div');
        div.id = 'cursor-tooltip';
        div.className = 'cursor-tooltip';
        document.body.appendChild(div);
        return div;
    }

    onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates (-1 to +1)
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / this.container.clientWidth) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / this.container.clientHeight) * 2 + 1;

        // Tooltip position
        this.tooltip.style.left = (event.clientX + 15) + 'px';
        this.tooltip.style.top = (event.clientY + 15) + 'px';

        this.checkHover();
    }

    checkHover() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(Object.values(this.planets));

        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (this.hoveredPlanet !== object) {
                this.hoveredPlanet = object;
                this.tooltip.innerHTML = `<strong>${object.userData.name}</strong> Click to explore`;
                this.tooltip.classList.add('visible');
                document.body.style.cursor = 'pointer';
            }
        } else {
            if (this.hoveredPlanet) {
                this.hoveredPlanet = null;
                this.tooltip.classList.remove('visible');
                document.body.style.cursor = 'default';
            }
        }
    }

    onClick() {
        if (this.hoveredPlanet) {
            const planetName = this.hoveredPlanet.userData.name.toLowerCase();
            window.location.href = `${planetName}.html`;
        }
    }

    // Update rotations and orbits
    focusBody(name) {
        if (!name || name === 'Sun') {
            this.targetBody = null;
            // Smoothly move back to center
            const duration = 2000;
            const startPos = this.controls.target.clone();
            const endPos = new THREE.Vector3(0, 0, 0);
            
            const startCamera = this.camera.position.clone();
            const endCamera = new THREE.Vector3(0, 350, 600);

            const startTime = Date.now();
            const animateFocus = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Use easeInOutCubic
                const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                this.controls.target.lerpVectors(startPos, endPos, ease);
                this.camera.position.lerpVectors(startCamera, endCamera, ease);
                
                if (progress < 1) requestAnimationFrame(animateFocus);
            };
            animateFocus();
            return;
        }

        const planet = this.planets[name];
        if (planet) {
            this.targetBody = planet;
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const ts = parseFloat(this.options.timeScale) || 0;
        const deltaTime = 0.01 * ts;

        // Update rotations and orbits
        Object.values(this.planets).forEach(planet => {
            // Axial rotation
            planet.rotation.y += (planet.userData.axialRot || 0.005) * (ts > 1 ? 2 : 1);
            
            if (planet.userData.jplPosition && ts <= 1) {
                // Use JPL data for "Real-Time" or slow speeds
                const scale = 149.6;
                planet.position.x = planet.userData.jplPosition.x * scale;
                planet.position.y = planet.userData.jplPosition.z * scale;
                planet.position.z = planet.userData.jplPosition.y * scale; 
            } else {
                // Use Physics-based Speed for "Dynamic" forward motion
                const speedMult = 0.001 * (planet.userData.orbSpeed || 30);
                planet.userData.orbitAngle = (planet.userData.orbitAngle || 0) + (deltaTime * speedMult);
                
                const radius = planet.userData.baseDist || 100;
                planet.position.x = Math.cos(planet.userData.orbitAngle) * radius;
                planet.position.z = Math.sin(planet.userData.orbitAngle) * radius * 0.99;
            }
        });

        if (this.sun) this.sun.rotation.y += 0.001;

        // Camera Tracking Logic
        if (this.targetBody && this.controls) {
            const targetPos = new THREE.Vector3();
            this.targetBody.getWorldPosition(targetPos);
            this.controls.target.lerp(targetPos, 0.1); 
        }

        if (this.controls) this.controls.update();
        if (this.stars) this.stars.rotation.y += 0.0001;
        
        this.renderer.render(this.scene, this.camera);
    }



    onWindowResize() {
        if (!this.container) return;
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    /**
     * Sycs all planets with real-time data from JPL
     */
    async syncWithJPL() {
        console.log("Syncing with NASA JPL Horizons...");
        const syncPromises = Object.values(this.planets).map(async (planet) => {
            const pos = await window.JPLFetcher.getPlanetPosition(planet.userData.id);
            if (pos) {
                planet.userData.jplPosition = pos;
            }
        });

        await Promise.all(syncPromises);
        console.log("JPL Sync Complete");
    }
}
