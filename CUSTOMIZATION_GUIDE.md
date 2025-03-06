# Customization Guide for School Football Team Website

## Adding Your Custom 3D Models

This website uses Three.js to display 3D models. Here's how to replace the placeholder models with your own custom models:

### 1. Prepare Your 3D Models

- Save your 3D models in glTF (.glb or .gltf) format, which is optimal for web use
- Place them in the `assets/models/` directory
- Recommended models to create:
  - A football for the hero section
  - Player models for the team section
  - A trophy model for the about section

### 2. Update the JavaScript Code

Open `assets/js/main.js` and locate these three functions:

- `initHeroModel()` - For the football model
- `initTeamModels()` - For the player models
- `initTrophyModel()` - For the trophy model

### 3. For the Hero Football Model

Replace the placeholder code in `initHeroModel()` with:

```javascript
// Replace placeholder with custom football model
const loader = new THREE.GLTFLoader();
loader.load('assets/models/your-football-model.glb', (gltf) => {
    const football = gltf.scene;
    // Adjust scale if needed
    football.scale.set(0.5, 0.5, 0.5);
    scene.add(football);
    
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
});
```

### 4. For Team Player Models

Update the `initTeamModels()` function to load your player models:

```javascript
// Different model for each player
const modelPath = `assets/models/${modelId}.glb`;
const loader = new THREE.GLTFLoader();
loader.load(modelPath, (gltf) => {
    const playerModel = gltf.scene;
    // Adjust scale if needed
    playerModel.scale.set(0.5, 0.5, 0.5);
    scene.add(playerModel);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the model
        playerModel.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
});
```

### 5. For the Trophy Model

Update the `initTrophyModel()` function to load your trophy model:

```javascript
// Load trophy model
const loader = new THREE.GLTFLoader();
loader.load('assets/models/trophy.glb', (gltf) => {
    const trophy = gltf.scene;
    // Adjust scale if needed
    trophy.scale.set(0.5, 0.5, 0.5);
    scene.add(trophy);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the trophy
        trophy.rotation.y += 0.01;
        
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
});
```

## Customizing Colors

To customize the colors to match your school's colors:

1. Open `assets/css/style.css`
2. At the top, you'll find CSS variables in the `:root` selector:

```css
:root {
    --primary-color: #1e3a8a; /* Deep blue */
    --secondary-color: #ff6b00; /* Orange */
    --text-color: #333;
    --light-text: #fff;
    --background-color: #f5f5f5;
    --dark-background: #0f172a;
    --accent-color: #4ade80; /* Green */
    --transition-speed: 0.3s;
}
```

Update these color values with your school's colors.

## Customizing Content

1. Open `index.html`
2. Update the text content with your school's information
3. Replace placeholder text in sections like:
   - Team members' names and positions
   - Match details
   - About section information
   - Contact information

## Adding Real Images

1. Add your team photos to the `assets/images/` directory
2. In `index.html`, update the image paths in the gallery section

## Need More Help?

If you need help with 3D modeling or have questions about customizing this website further, feel free to reach out for assistance.
