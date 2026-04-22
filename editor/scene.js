import * as THREE from 'three';

// main scene
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0xE0E0E0);

export let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const canvas = document.getElementById('canvas')
canvas.appendChild(renderer.domElement);

// resize main window
const _console = document.getElementById('console');
function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight - _console.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

window.addEventListener('resize', () => {
    resize()
})

const observer = new ResizeObserver(() => {
    resize()
})

observer.observe(_console)

// scene rect
const g1 = new THREE.BoxGeometry(2, 1, 1);
const m1 = new THREE.MeshStandardMaterial({ color: 0xff00ff });
const c1 = new THREE.Mesh(g1, m1);
scene.add(c1);

c1.position.y = -1;
c1.castShadow = true;

// scene plane
const g2 = new THREE.PlaneGeometry(10, 10);
const m2 = new THREE.MeshStandardMaterial({ color: 0xffffff });
const p1 = new THREE.Mesh(g2, m2);
scene.add(p1);

p1.rotation.x = -Math.PI / 2;
p1.position.y = -2;
p1.receiveShadow = true;

// scene light
const l1 = new THREE.PointLight(0xffffff, 300, 100);
l1.position.set(10, 10, 10);
scene.add(l1);

l1.castShadow = true;

// move camera back
camera.position.z = 5;

/* // arrow scene
export const arrowScene = new THREE.Scene();
export let arrowCamera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);
export const arrowRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
arrowRenderer.setSize(container.clientWidth, container.clientHeight);
arrowRenderer.setClearColor(0x000000, 0)
container.appendChild(arrowRenderer.domElement);

arrowCamera.position.z = 5;

// resize arrow window
const observer = new ResizeObserver(() => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    arrowCamera.aspect = w / h;
    arrowCamera.updateProjectionMatrix();
    arrowRenderer.setSize(w, h);
});

observer.observe(container);

// arrows cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
arrowScene.add(cube);

// arrows
const dir = new THREE.Vector3(1, 0, 0);

// normalize the direction vector
dir.normalize();
const origin = new THREE.Vector3(0, 0, 0);
const length = 1;
const hex = 0xffff00;
const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
arrowScene.add(arrowHelper); */

console.log('scene.js loaded')