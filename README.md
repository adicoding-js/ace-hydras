# School Football Team Website

A modern, interactive website for a school football team featuring 3D models and animations. This website is inspired by the design of [Hatom](https://www.hatom.com/) but customized for a school football team.

## Features

- Interactive 3D models using Three.js
- Smooth animations with GSAP
- Responsive design that works on all devices
- Custom cursor and loading screen
- Sections for team members, upcoming matches, gallery, about, and contact

## Project Structure

```
school-football-website/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   └── models/
├── index.html
└── README.md
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser

## Adding Your Custom 3D Models

To add your custom 3D models:

1. Place your 3D model files (GLB or GLTF format) in the `assets/models/` directory
2. Update the JavaScript code in `assets/js/main.js` to load your models

Example code for loading a custom model:

```javascript
const loader = new THREE.GLTFLoader();
loader.load('assets/models/your-model.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
});
```

## Customization

- Colors: Edit the CSS variables in `assets/css/style.css` to match your school colors
- Content: Update the text and images in `index.html` to reflect your team's information
- 3D Models: Replace the placeholder models with your custom 3D models

## Dependencies

- [Three.js](https://threejs.org/) - For 3D rendering
- [GSAP](https://greensock.com/gsap/) - For animations
- [Font Awesome](https://fontawesome.com/) - For icons
- [Google Fonts](https://fonts.google.com/) - For typography

## Browser Compatibility

This website works in all modern browsers that support WebGL, including:

- Chrome
- Firefox
- Safari
- Edge

## License

This project is available for your personal use. Feel free to modify it to suit your needs.

## Credits

Design inspired by [Hatom](https://www.hatom.com/).
