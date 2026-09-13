import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510); 
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20); 
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.05;
scene.add(new THREE.AmbientLight(0x404040, 1.5)); 
const sunLight = new THREE.PointLight(0xffffff, 2, 100); 
sunLight.position.set(0, 0, 0);
scene.add(sunLight);
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffaa00 })
);
scene.add(sun);
const sunGlow = new THREE.Mesh(
    new THREE.SphereGeometry(3.2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffdd55, transparent: true, opacity: 0.3 })
);
scene.add(sunGlow);
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x2233ff, roughness: 0.7 })
);
earth.position.set(8, 0, 0);
scene.add(earth);
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
);
moon.position.set(2, 0, 0);
earth.add(moon); 
const ring = new THREE.Mesh(
    new THREE.RingGeometry(2, 3, 64),
    new THREE.MeshStandardMaterial({ color: 0xcccccc, side: THREE.DoubleSide })
);
ring.position.set(-8, 0, 0);
ring.rotation.x = Math.PI / 2; 
scene.add(ring);
const starsGeo = new THREE.BufferGeometry();
const starsPositions = new Float32Array(2000 * 3);
for (let i = 0; i < starsPositions.length; i += 3) {
    starsPositions[i] = (Math.random() - 0.5) * 200;
    starsPositions[i+1] = (Math.random() - 0.5) * 200;
    starsPositions[i+2] = (Math.random() - 0.5) * 200;
}
starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 })));
function animate() {
    requestAnimationFrame(animate);
    
    sun.rotation.y += 0.005;
    sunGlow.rotation.y += 0.002;
    earth.rotation.y += 0.01;
    earth.position.x = 8 * Math.cos(Date.now() * 0.0005);
    earth.position.z = 8 * Math.sin(Date.now() * 0.0005);
    moon.position.x = 2 * Math.cos(Date.now() * 0.002);
    moon.position.z = 2 * Math.sin(Date.now() * 0.002);
    ring.rotation.z += 0.002;
    
    controls.update();
    renderer.render(scene, camera);
}
animate();
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});