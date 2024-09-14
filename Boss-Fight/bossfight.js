// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Pointer Lock controls
let isPointerLocked = false;
document.body.addEventListener('click', () => {
    document.body.requestPointerLock();
});

document.addEventListener('pointerlockchange', () => {
    isPointerLocked = !!document.pointerLockElement;
});

// Mouse movement for camera rotation
let rotation = { x: 0, y: 0 };
document.addEventListener('mousemove', (event) => {
    if (isPointerLocked) {
        const sensitivity = 0.002; // Control how sensitive the camera is to mouse movements
        rotation.x -= event.movementX * sensitivity;
        rotation.y -= event.movementY * sensitivity;

        rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.y)); // Prevent flipping the camera upside down
    }
});

// First person controls setup
let controls = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false
};

// Adding ground
const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 100, 100).normalize();
scene.add(light);

// Rain particles
const rainCount = 5000;
const rainGeometry = new THREE.BufferGeometry();
const rainPositions = new Float32Array(rainCount * 3);

for (let i = 0; i < rainCount * 3; i++) {
    rainPositions[i] = Math.random() * 1000 - 500;
}

rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));

const rainMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.1 });
const rainParticles = new THREE.Points(rainGeometry, rainMaterial);
scene.add(rainParticles);

// Movement speed and direction
const playerSpeed = 0.1;
let direction = new THREE.Vector3();

// Player controls
function handleKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            controls.moveForward = true;
            break;
        case 'KeyS':
            controls.moveBackward = true;
            break;
        case 'KeyA':
            controls.moveLeft = true;
            break;
        case 'KeyD':
            controls.moveRight = true;
            break;
    }
}

function handleKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            controls.moveForward = false;
            break;
        case 'KeyS':
            controls.moveBackward = false;
            break;
        case 'KeyA':
            controls.moveLeft = false;
            break;
        case 'KeyD':
            controls.moveRight = false;
            break;
    }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Main game loop
function animate() {
    requestAnimationFrame(animate);

    // Camera rotation logic
    camera.rotation.y = rotation.x;
    camera.rotation.x = rotation.y;

    // Movement logic
    direction.set(0, 0, 0);
    if (controls.moveForward) direction.z -= playerSpeed;
    if (controls.moveBackward) direction.z += playerSpeed;
    if (controls.moveLeft) direction.x -= playerSpeed;
    if (controls.moveRight) direction.x += playerSpeed;

    camera.translateX(direction.x);
    camera.translateZ(direction.z);

    // Rain effect movement
    rainParticles.position.y -= 0.2;
    if (rainParticles.position.y < -50) {
        rainParticles.position.y = 50;
    }

    renderer.render(scene, camera);
}

camera.position.y = 1.6;  // Set camera height to simulate player height
camera.position.z = 5;    // Initial position

animate();
