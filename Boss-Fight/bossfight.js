// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color
scene.background = new THREE.Color(0x0000ff); // Blue background

// Create a green plane
const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
scene.add(plane);

// Set camera position
camera.position.set(0, 10, 0);
camera.lookAt(0, 0, 0);

// Handle pointer lock and movement
let controlsEnabled = false;
document.addEventListener('click', () => {
    if (!controlsEnabled) {
        document.body.requestPointerLock();
        controlsEnabled = true;
    }
});

const movementSpeed = 0.1;
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            camera.position.z -= movementSpeed;
            break;
        case 's':
            camera.position.z += movementSpeed;
            break;
        case 'a':
            camera.position.x -= movementSpeed;
            break;
        case 'd':
            camera.position.x += movementSpeed;
            break;
    }
});

// Update loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
