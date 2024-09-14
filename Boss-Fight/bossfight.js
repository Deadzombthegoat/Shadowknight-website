// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry with 100 randomly positioned vertices
const geometry = new THREE.Geometry();
for (let i = 0; i < 100; i++) {
  const vertex = new THREE.Vector3();
  vertex.x = Math.random() * 20 - 10;
  vertex.y = Math.random() * 20 - 10;
  vertex.z = Math.random() * 20 - 10;
  geometry.vertices.push(vertex);
}

// Create a points material and set its size
const material = new THREE.PointsMaterial({ size: 0.5 });

// Create a points object and add it to the scene
const points = new THREE.Points(geometry, material);
scene.add(points);

// Animate the points by updating their positions each frame
function animate() {
  requestAnimationFrame(animate);

  // Update the position of each vertex
  for (let i = 0; i < 100; i++) {
    const vertex = geometry.vertices[i];
    vertex.x += Math.random() * 0.1 - 0.05;
    vertex.y += Math.random() * 0.1 - 0.05;
    vertex.z += Math.random() * 0.1 - 0.05;
  }

  // Tell three.js that the geometry has changed and needs to be re-rendered
  geometry.verticesNeedUpdate = true;

  renderer.render(scene, camera);
}

animate();
