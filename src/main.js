import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Grab the background container
const bgContainer = document.getElementById('bg-container');

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Set up the camera so it faces the center (0,0,0)
const camera = new THREE.PerspectiveCamera(
  100, 
  bgContainer.clientWidth / bgContainer.clientHeight,
  0.7,
  1000
);
// Position the camera to see the center clearly
camera.position.set(10, 30, 70);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(bgContainer.clientWidth, bgContainer.clientHeight);
renderer.shadowMap.enabled = true;
bgContainer.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 5, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// Global reference for the loaded model
let modelRef = null;

// Load GLB Model
const loader = new GLTFLoader();
loader.load(
    '/RedSquare.glb',
    (gltf) => {
      const model = gltf.scene;
  
      // Center the model's pivot so it rotates around its center
      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center);
  
      // Optionally, scale or adjust the model if needed
      // model.scale.set(1, 1, 1);
  
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          if (node.material) {
            node.material.metalness = 0.3;
            node.material.roughness = 0.7;
          }
        }
      });
      scene.add(model);
      modelRef = model; // save reference for scroll animation
      animate();
    },
    undefined,
    (error) => {
      console.error('Error loading model:', error);
    }
  );
  

// Orbit Controls (optional)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 0, 0);
controls.update();

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = bgContainer.clientWidth / bgContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(bgContainer.clientWidth, bgContainer.clientHeight);
});

// Scroll-based animation
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY || window.pageYOffset;

  // Rotate the model on Y-axis based on scroll, if loaded
  if (modelRef) {
    // Adjust the factor (0.0015) to change the rotation speed
    modelRef.rotation.y = scrollY * 0.0015;
  }
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // If using OrbitControls with damping
  controls.update();

  renderer.render(scene, camera);
}
