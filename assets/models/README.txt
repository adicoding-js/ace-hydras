This directory is for your custom 3D models.

Place your .glb or .gltf format 3D models here. You will need:

1. A football model for the hero section
2. Player models for the team section
3. A trophy model for the about section

The current website is using simple Three.js geometries as placeholders.
To use your custom models, update the code in the main.js file in the following functions:

- initHeroModel() - For the football model
- initTeamModels() - For the player models
- initTrophyModel() - For the trophy model

Example code for loading a custom model:

const loader = new THREE.GLTFLoader();
loader.load('assets/models/your-model.glb', (gltf) => {
    const model = gltf.scene;
    // Scale if needed
    model.scale.set(0.5, 0.5, 0.5);
    // Position if needed
    model.position.set(0, 0, 0);
    scene.add(model);
});
