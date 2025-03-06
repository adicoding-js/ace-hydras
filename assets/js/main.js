// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize 3D models
    initHeroModel();
    initTeamModels();
    initTrophyModel();
    
    // Initialize animations
    initAnimations();
    
    // Initialize player cards
    initPlayerCards();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading time (replace with actual asset loading)
    setTimeout(() => {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loadingScreen.style.display = 'none';
            }
        });
    }, 2000);
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });
    
    // Scale effect on clickable elements
    const clickables = document.querySelectorAll('a, button, .gallery-item, .team-member');
    
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3
            });
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Animate bars to form X
        const bars = document.querySelectorAll('.bar');
        
        if (nav.classList.contains('active')) {
            gsap.to(bars[0], {
                transform: 'translateY(9px) rotate(45deg)',
                duration: 0.3
            });
            
            gsap.to(bars[1], {
                opacity: 0,
                duration: 0.3
            });
            
            gsap.to(bars[2], {
                transform: 'translateY(-9px) rotate(-45deg)',
                duration: 0.3
            });
        } else {
            gsap.to(bars[0], {
                transform: 'translateY(0) rotate(0)',
                duration: 0.3
            });
            
            gsap.to(bars[1], {
                opacity: 1,
                duration: 0.3
            });
            
            gsap.to(bars[2], {
                transform: 'translateY(0) rotate(0)',
                duration: 0.3
            });
        }
    });
}

// 3D Models
function initHeroModel() {
    // Create scene, camera, and renderer
    const container = document.getElementById('hero-canvas-container');
    
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create a football placeholder (sphere)
    // Note: This would be replaced with your custom 3D model
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.2,
        roughness: 0.8
    });
    
    // Create pattern for football
    const texture = new THREE.TextureLoader().load('assets/images/football-texture.svg', (texture) => {
        material.map = texture;
        material.needsUpdate = true;
    });
    
    const football = new THREE.Mesh(geometry, material);
    scene.add(football);
    
    // Position camera
    camera.position.z = 6;
    
    // Add orbit controls for testing
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the football
        football.rotation.y += 0.005;
        football.rotation.x += 0.002;
        
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Add mouse interaction
    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        const y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
        
        gsap.to(football.rotation, {
            x: y * 0.5,
            y: x * 0.5,
            duration: 1
        });
    });
}

function initTeamModels() {
    // Get all team member model containers
    const modelContainers = document.querySelectorAll('.member-model-container');
    
    modelContainers.forEach((container) => {
        const modelId = container.getAttribute('data-model');
        
        // Create scene, camera, and renderer for each container
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Create placeholder models (would be replaced with your custom models)
        // For demonstration, we'll use simple geometries
        let playerModel;
        
        // Different placeholder for each player
        if (modelId === 'player1') {
            const geometry = new THREE.BoxGeometry(1, 2, 1);
            const material = new THREE.MeshStandardMaterial({ color: 0x1e3a8a });
            playerModel = new THREE.Mesh(geometry, material);
        } else if (modelId === 'player2') {
            const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
            const material = new THREE.MeshStandardMaterial({ color: 0xff6b00 });
            playerModel = new THREE.Mesh(geometry, material);
        } else {
            const geometry = new THREE.ConeGeometry(0.7, 2, 32);
            const material = new THREE.MeshStandardMaterial({ color: 0x4ade80 });
            playerModel = new THREE.Mesh(geometry, material);
        }
        
        scene.add(playerModel);
        
        // Position camera
        camera.position.z = 5;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate the model
            playerModel.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    });
}

function initTrophyModel() {
    const container = document.querySelector('.about-model-container');
    
    if (!container) return;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create a trophy placeholder
    // Base
    const baseGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1.5;
    
    // Stem
    const stemGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 0.8, roughness: 0.2 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = -0.3;
    
    // Cup
    const cupGeometry = new THREE.CylinderGeometry(0.8, 0.5, 1, 32);
    const cupMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 0.8, roughness: 0.2 });
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.position.y = 1;
    
    // Group all parts
    const trophy = new THREE.Group();
    trophy.add(base);
    trophy.add(stem);
    trophy.add(cup);
    scene.add(trophy);
    
    // Position camera
    camera.position.z = 5;
    
    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the trophy
        trophy.rotation.y += 0.01;
        
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Animations
function initAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from('.hero-content h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5
    });
    
    gsap.from('.hero-content p', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.7
    });
    
    gsap.from('.cta-buttons', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.9
    });
    
    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        gsap.from(header, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Team members animation
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach((member, index) => {
        gsap.from(member, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: '.team-container',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Match cards animation
    const matchCards = document.querySelectorAll('.match-card');
    
    matchCards.forEach((card, index) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: '.matches-container',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Gallery items animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        gsap.from(item, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: '.gallery-container',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // About section animation
    gsap.from('.about-content', {
        x: -100,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.about-container',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    gsap.from('.about-model-container', {
        x: 100,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.about-container',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    // Contact section animation
    gsap.from('.contact-form', {
        x: -100,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    gsap.from('.contact-info', {
        x: 100,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
}

// Player card interactions
function initPlayerCards() {
    const playerCards = document.querySelectorAll('.player-card');
    
    playerCards.forEach(card => {
        card.addEventListener('click', function() {
            const playerModelId = this.getAttribute('data-model');
            showPlayerDetails(playerModelId);
        });
    });
}

function showPlayerDetails(playerId) {
    // Get player details from the player ID
    const playerInfo = getPlayerInfo(playerId);
    
    // Create modal for player details
    const modal = document.createElement('div');
    modal.classList.add('player-modal');
    
    // Create modal content
    modal.innerHTML = `
        <div class="player-modal-content">
            <span class="close-modal">&times;</span>
            <div class="player-detail-container">
                <div class="player-model-container" id="modal-${playerId}"></div>
                <div class="player-info">
                    <h2>${playerInfo.name}</h2>
                    <div class="player-number">${playerInfo.number}</div>
                    <div class="player-position">${playerInfo.position}</div>
                    
                    <div class="player-stats">
                        <div class="stat-item">
                            <span class="stat-label">Pace</span>
                            <div class="stat-bar">
                                <div class="stat-fill" style="width: ${playerInfo.stats.pace}%"></div>
                            </div>
                            <span class="stat-value">${playerInfo.stats.pace}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Shooting</span>
                            <div class="stat-bar">
                                <div class="stat-fill" style="width: ${playerInfo.stats.shooting}%"></div>
                            </div>
                            <span class="stat-value">${playerInfo.stats.shooting}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Passing</span>
                            <div class="stat-bar">
                                <div class="stat-fill" style="width: ${playerInfo.stats.passing}%"></div>
                            </div>
                            <span class="stat-value">${playerInfo.stats.passing}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Dribbling</span>
                            <div class="stat-bar">
                                <div class="stat-fill" style="width: ${playerInfo.stats.dribbling}%"></div>
                            </div>
                            <span class="stat-value">${playerInfo.stats.dribbling}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Defense</span>
                            <div class="stat-bar">
                                <div class="stat-fill" style="width: ${playerInfo.stats.defense}%"></div>
                            </div>
                            <span class="stat-value">${playerInfo.stats.defense}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close modal on X click
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
    
    // Load 3D model for player in modal
    if (typeof loadPlayerModel === 'function') {
        loadPlayerModel(`modal-${playerId}`);
    }
}

// Function to load player 3D models
function loadPlayerModel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get the player ID from the container ID
    const playerId = containerId.replace('modal-', '');
    
    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Set camera position
    camera.position.z = 5;
    
    // Create a placeholder model (sphere) for now
    // This would be replaced with actual player models when available
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Get player info for custom coloring
    const playerInfo = getPlayerInfo(playerId);
    
    // Create a jersey material with team colors
    const material = new THREE.MeshPhongMaterial({ 
        color: 0xe53935,  // Team color
        flatShading: false,
        shininess: 50
    });
    
    const playerModel = new THREE.Mesh(geometry, material);
    scene.add(playerModel);
    
    // Add jersey number using a simple approach (not using TextGeometry)
    if (playerInfo && playerInfo.number) {
        // Create a black circle as background for the number
        const circleGeometry = new THREE.CircleGeometry(0.3, 32);
        const circleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circle.position.set(0, 0, 1.01);
        scene.add(circle);
    }
    
    // Add orbit controls for interaction
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        playerModel.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // To load actual models when available, use this code:
    /*
    const loader = new THREE.GLTFLoader();
    loader.load('assets/models/players/' + playerId + '.glb', (gltf) => {
        const model = gltf.scene;
        
        // Scale if needed
        model.scale.set(1.5, 1.5, 1.5);
        
        // Position if needed
        model.position.set(0, -1, 0);
        
        // Add to scene
        scene.add(model);
        
        // Remove placeholder
        scene.remove(playerModel);
    }, undefined, (error) => {
        console.error('Error loading 3D model:', error);
    });
    */
}

// Player information database
function getPlayerInfo(playerId) {
    const players = {
        player1: {
            name: 'HAMAAD',
            number: 7,
            position: 'Right Wing (Captain)',
            stats: {
                pace: 88,
                shooting: 85,
                passing: 80,
                dribbling: 90,
                defense: 45
            }
        },
        player2: {
            name: 'USMAN',
            number: 11,
            position: 'Left Wing',
            stats: {
                pace: 90,
                shooting: 80,
                passing: 75,
                dribbling: 85,
                defense: 40
            }
        },
        player3: {
            name: 'HUZAIF',
            number: 6,
            position: 'Left Central Midfielder',
            stats: {
                pace: 75,
                shooting: 70,
                passing: 85,
                dribbling: 80,
                defense: 75
            }
        },
        player4: {
            name: 'ZEYAN',
            number: 8,
            position: 'Right Central Midfielder',
            stats: {
                pace: 78,
                shooting: 75,
                passing: 88,
                dribbling: 82,
                defense: 70
            }
        },
        player5: {
            name: 'ADITYA',
            number: 10,
            position: 'Central Attacking Midfielder',
            stats: {
                pace: 82,
                shooting: 80,
                passing: 90,
                dribbling: 88,
                defense: 60
            }
        },
        player6: {
            name: 'WAAHID',
            number: 9,
            position: 'Striker',
            stats: {
                pace: 85,
                shooting: 90,
                passing: 70,
                dribbling: 80,
                defense: 35
            }
        },
        player7: {
            name: 'ZEESHAN',
            number: 3,
            position: 'Left Back',
            stats: {
                pace: 80,
                shooting: 50,
                passing: 75,
                dribbling: 70,
                defense: 82
            }
        },
        player8: {
            name: 'HAMEEM',
            number: 4,
            position: 'Left Center Back',
            stats: {
                pace: 70,
                shooting: 40,
                passing: 65,
                dribbling: 60,
                defense: 88
            }
        },
        player9: {
            name: 'FAAIZ',
            number: 5,
            position: 'Right Center Back',
            stats: {
                pace: 72,
                shooting: 42,
                passing: 68,
                dribbling: 58,
                defense: 90
            }
        },
        player10: {
            name: 'EESHAAN',
            number: 2,
            position: 'Right Back',
            stats: {
                pace: 82,
                shooting: 48,
                passing: 72,
                dribbling: 68,
                defense: 85
            }
        },
        player11: {
            name: 'TAJAMMUL',
            number: 1,
            position: 'Goalkeeper',
            stats: {
                pace: 65,
                shooting: 30,
                passing: 70,
                dribbling: 55,
                defense: 45,
                // For goalkeeper, defense stat represents shot stopping
            }
        }
    };
    
    return players[playerId] || {
        name: 'Unknown Player',
        number: 0,
        position: 'Unknown Position',
        stats: {
            pace: 50,
            shooting: 50,
            passing: 50,
            dribbling: 50,
            defense: 50
        }
    };
}
