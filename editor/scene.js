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

console.log('scene.js loaded')