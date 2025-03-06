// Landing page phoenix animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the 3D scene
    initPhoenixScene();
});

function initPhoenixScene() {
    // Create scene, camera, and renderer
    const container = document.getElementById('phoenix-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x121212);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xe53935, 1); // Red light
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const blueLight = new THREE.PointLight(0x90caf9, 1, 100); // Blue light
    blueLight.position.set(-5, 2, -5);
    scene.add(blueLight);
    
    // Create a phoenix placeholder (would be replaced with actual phoenix model)
    // For now, let's create a stylized bird shape
    const phoenixGroup = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.ConeGeometry(1, 3, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xe53935,
        emissive: 0xe53935,
        emissiveIntensity: 0.2,
        roughness: 0.3,
        metalness: 0.7
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.x = Math.PI / 2;
    body.position.z = -1;
    phoenixGroup.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xe53935,
        emissive: 0xe53935,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.7
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.z = 1.2;
    phoenixGroup.add(head);
    
    // Wings
    const wingGeometry = new THREE.BoxGeometry(4, 0.1, 1.5);
    const wingMaterial = new THREE.MeshStandardMaterial({
        color: 0xe53935, 
        emissive: 0xe53935,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.9
    });
    
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-2, 0, -1);
    leftWing.rotation.y = Math.PI / 6;
    phoenixGroup.add(leftWing);
    
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(2, 0, -1);
    rightWing.rotation.y = -Math.PI / 6;
    phoenixGroup.add(rightWing);
    
    // Tail
    const tailGeometry = new THREE.ConeGeometry(0.5, 2, 8);
    const tailMaterial = new THREE.MeshStandardMaterial({
        color: 0xe53935,
        emissive: 0xe53935,
        emissiveIntensity: 0.3
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.z = -3;
    tail.rotation.x = -Math.PI / 2;
    phoenixGroup.add(tail);
    
    // Add fire particles effect
    const fireParticles = createFireParticles();
    phoenixGroup.add(fireParticles);
    
    scene.add(phoenixGroup);
    
    // Position phoenix and camera
    phoenixGroup.position.set(0, 0, 10);
    camera.position.set(0, 2, 15);
    camera.lookAt(phoenixGroup.position);
    
    // Phoenix idle animation
    function animatePhoenixIdle() {
        // Gently move the phoenix up and down
        gsap.to(phoenixGroup.position, {
            y: 0.5,
            duration: 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
        
        // Gently rotate the wings
        gsap.to(leftWing.rotation, {
            z: 0.2,
            duration: 1.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
        
        gsap.to(rightWing.rotation, {
            z: -0.2,
            duration: 1.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
    }
    
    // Start idle animation
    animatePhoenixIdle();
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate fire particles
        animateFireParticles(fireParticles);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Handle click to start the flight animation
    document.addEventListener('click', () => {
        document.querySelector('.loading-text').style.display = 'none';
        animatePhoenixFlight(phoenixGroup, camera);
    });
    
    // For touch devices
    document.addEventListener('touchstart', () => {
        document.querySelector('.loading-text').style.display = 'none';
        animatePhoenixFlight(phoenixGroup, camera);
    });
}

// Create fire particles effect
function createFireParticles() {
    const particlesGroup = new THREE.Group();
    const particleCount = 50;
    
    // Create individual particles
    for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 0.2 + 0.1;
        const geometry = new THREE.SphereGeometry(size, 8, 8);
        
        // Random color between red and orange
        const color = new THREE.Color();
        const hue = Math.random() * 0.05 + 0.05; // Between 0.05 and 0.1 (red to orange)
        const saturation = 0.8;
        const lightness = 0.6;
        color.setHSL(hue, saturation, lightness);
        
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.5
        });
        
        const particle = new THREE.Mesh(geometry, material);
        
        // Set random positions around the phoenix
        particle.position.set(
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 4 - 2 // Concentrate behind the phoenix
        );
        
        // Store original position and other animation properties
        particle.userData = {
            originalPos: particle.position.clone(),
            speed: Math.random() * 0.02 + 0.01,
            offset: Math.random() * Math.PI * 2
        };
        
        particlesGroup.add(particle);
    }
    
    return particlesGroup;
}

// Animate fire particles
function animateFireParticles(particles) {
    const time = Date.now() * 0.001;
    
    particles.children.forEach(particle => {
        const { originalPos, speed, offset } = particle.userData;
        
        // Move particles in a wavy pattern
        particle.position.x = originalPos.x + Math.sin(time * 2 + offset) * 0.3;
        particle.position.y = originalPos.y + Math.cos(time * 2 + offset) * 0.3;
        
        // Fade particles in and out
        particle.material.opacity = (Math.sin(time * 3 + offset) + 1) * 0.4 + 0.2;
        
        // Scale particles
        const scale = (Math.sin(time * 2 + offset) + 1) * 0.5 + 0.5;
        particle.scale.set(scale, scale, scale);
    });
}

// Animate the phoenix flight and camera follow
function animatePhoenixFlight(phoenix, camera) {
    // Animation timeline
    const timeline = gsap.timeline({
        onComplete: () => {
            // Redirect to main page after animation completes
            window.location.href = 'teammates.html';
        }
    });
    
    // Initial prepare to fly (crouch slightly)
    timeline.to(phoenix.position, {
        y: -0.5,
        duration: 0.5,
        ease: "power1.out"
    });
    
    // Spread wings
    timeline.to([phoenix.children[2].rotation, phoenix.children[3].rotation], {
        z: 0,
        duration: 0.5,
        ease: "back.out"
    }, "-=0.3");
    
    // Start flying up
    timeline.to(phoenix.position, {
        y: 5,
        z: 8,
        duration: 1.5,
        ease: "power2.out"
    }, "-=0.2");
    
    // Camera follows closely
    timeline.to(camera.position, {
        y: 4,
        z: 13,
        duration: 1.5,
        ease: "power2.out"
    }, "-=1.5");
    
    // Phoenix turns around to face camera
    timeline.to(phoenix.rotation, {
        y: Math.PI,
        duration: 0.8,
        ease: "power1.inOut"
    });
    
    // Phoenix flies toward camera/screen (into the distance)
    timeline.to(phoenix.position, {
        z: -20,
        duration: 2,
        ease: "power2.in"
    });
    
    // Camera zooms out slightly
    timeline.to(camera.position, {
        z: 20,
        duration: 1.5,
        ease: "power2.inOut"
    }, "-=2");
    
    // Fade out
    timeline.to("body", {
        backgroundColor: "#000000",
        duration: 1
    }, "-=1");
}

// Function to navigate to main page after animation completes
function navigateToMainPage() {
    window.location.href = 'teammates.html';
}

// Add event listener to the click/tap action on the screen
document.addEventListener('DOMContentLoaded', function() {
    const landingContainer = document.querySelector('.landing-container');
    
    // Add click event to start the animation and navigation
    landingContainer.addEventListener('click', function() {
        // Add 'active' class to start/intensify animation
        this.classList.add('active');
        
        // After animation completes, navigate to main page
        setTimeout(navigateToMainPage, 3000);
    });
    
    // Add instruction text
    const instructionText = document.createElement('div');
    instructionText.classList.add('instruction-text');
    instructionText.innerHTML = 'Click anywhere to enter';
    landingContainer.appendChild(instructionText);
});
