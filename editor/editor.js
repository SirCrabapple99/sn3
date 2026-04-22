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
const inspector = document.getElementById('inspector');
function resize() {
    const w = canvas.clientWidth - inspector.clientWidth;
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

// move camera back
camera.position.z = 5;

// temp scene stuff
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

console.log('test scene loaded')