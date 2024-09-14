let scene, camera, renderer, controls, boss, player, playerHealth, bossHealth, playerHealthBar, bossHealthBar;

init();
animate();

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('game-container').appendChild(renderer.domElement);
    
    // Add PointerLockControls
    controls = new THREE.PointerLockControls(camera, renderer.domElement);
    document.addEventListener('click', () => {
        controls.lock();
    });
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5).normalize();
    scene.add(directionalLight);
    
    // Ground Plane
    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshPhongMaterial({color: 0x555555});
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    
    // Boss Setup
    const bossGeometry = new THREE.BoxGeometry(5, 5, 5);
    const bossMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
    boss = new THREE.Mesh(bossGeometry, bossMaterial);
    boss.position.set(0, 2.5, -20);
    scene.add(boss);
    
    // Player setup
    player = {
        health: 100,
        position: camera.position,
    };
    
    // Health bars (HUD)
    const hud = document.createElement('div');
    hud.id = 'hud';
    document.body.appendChild(hud);
    
    hud.innerHTML = `
        <div id="boss-health"><div style="width: 100%"></div></div>
        <div id="player-health"><div style="width: 100%"></div></div>
    `;
    
    playerHealthBar = document.querySelector('#player-health div');
    bossHealthBar = document.querySelector('#boss-health div');
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Update HUD
    playerHealthBar.style.width = player.health + '%';
    bossHealthBar.style.width = bossHealth + '%';
    
    renderer.render(scene, camera);
}
