// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a basic cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add a simple light source
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Set up camera and controls
camera.position.z = 5;

const controls = new THREE.PointerLockControls(camera, renderer.domElement);

document.addEventListener('click', () => {
    controls.lock();
}, false);

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            controls.getObject().translateZ(-0.1);
            break;
        case 's':
            controls.getObject().translateZ(0.1);
            break;
        case 'a':
            controls.getObject().translateX(-0.1);
            break;
        case 'd':
            controls.getObject().translateX(0.1);
            break;
    }
}, false);

// Window resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}, false);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
}
animate();
