import * as THREE from 'three';
import { camera, scene, renderer } from '../editor/editor.js'

// pointerlock stuff
let isLocked = false;
document.addEventListener('pointerlockchange', () => {
  isLocked = !!document.pointerLockElement;
});

// check if dragging for camera movement or clicking for raycast
const holdTime = 200;
let pointerDownTime = 0;
let isDragging = false;
let pointerDownPos = { x: 0, y: 0 };

let sensYaw = 0.002;
let sensPitch = 0.002;

let yaw = camera.rotation.y;
let pitch = camera.rotation.x;

let pointerDown = false;

renderer.domElement.addEventListener('pointerdown', (e) => {
  pointerDown = true;
  pointerDownTime = performance.now();
  pointerDownPos = { x: e.clientX, y: e.clientY };
  isDragging = false;
});

renderer.domElement.addEventListener('pointerup', (e) => {
  pointerDown = false;
  // if not dragging try and select an object
  if (!isDragging && !isLocked) {
    raycast(e)
  }
  isDragging = false;
});

const _console = document.getElementById('console');
const consoleResize = document.getElementById('consoleResize');

let moveX;
let uiDrag = null;
consoleResize.addEventListener("mousedown", function (e) {
  isDragging = true;
  uiDrag = 'console';
});

document.addEventListener('pointerup', () => {
  uiDrag = null;
})

// move camera

// why tf did i make it like this idk but im never toucing console resizing again
const consoleMaxHeight = 0.75;
document.addEventListener('mousemove', (e) => {
  if (uiDrag === 'console') {
    const newHeight = Math.min(Math.max(Math.round(window.innerHeight - e.clientY), 35), window.innerHeight*consoleMaxHeight);
    _console.style.setProperty('height', newHeight + 'px');
    consoleResize.style.setProperty('bottom', (newHeight - 5) + 'px');
    isDragging = true;
    return;
  }

  if (!pointerDown && !isLocked) return;

  // check if dragging
  const dx = e.clientX - pointerDownPos.x;
  const dy = e.clientY - pointerDownPos.y;
  if (Math.hypot(dx, dy) > 4) isDragging = true;

  yaw -= e.movementX * sensYaw;
  pitch -= e.movementY * sensPitch;
  pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

  camera.rotation.order = 'YXZ';
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;
});

// input event listeners
document.addEventListener('keydown', (e) => {
  keyDown(e);

  // pointer lock
  if (e.code == 'KeyL') {
    if (isLocked) document.exitPointerLock();
    else renderer.domElement.requestPointerLock();
  }

});

document.addEventListener('keyup', (e) => {
  keyUp(e);
});

// populate keyStates
const keyStates = new Array(255).fill(0);

// key event listeners
function keyDown(e) {
  if (!e.repeat) keyStates[e.keyCode] = 1;
}

function keyUp(e) {
  keyStates[e.keyCode] = 0;
}

// handle inputs and movement
let camDir = new THREE.Vector3();
let leftRight = new THREE.Vector3();

export function inputStuff(flat = false) {
  if (flat) {
    camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();

    leftRight.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

    // w
    keyStates[87] === 1 ? (camera.position.addScaledVector(camDir, 0.1)) : {};
    // s
    keyStates[83] === 1 ? (camera.position.addScaledVector(camDir, -0.1)) : {};
    // a
    keyStates[65] === 1 ? (camera.position.addScaledVector(leftRight, -0.1)) : {};
    // d
    keyStates[68] === 1 ? (camera.position.addScaledVector(leftRight, 0.1)) : {};

  } else {
    // w
    keyStates[87] === 1 ? (camera.translateZ(-0.1)) : {};
    // s
    keyStates[83] === 1 ? (camera.translateZ(0.1)) : {};
    // a
    keyStates[65] === 1 ? (camera.translateX(-0.1)) : {};
    // d
    keyStates[68] === 1 ? (camera.translateX(0.1)) : {};
  }

  // shift
  keyStates[16] === 1 ? (camera.position.y -= 0.1) : {};
  // space
  keyStates[32] === 1 ? (camera.position.y += 0.1) : {};
}

// selecting an object
const defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
let selectedObject = null;

// raycasting stuff
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function raycast(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const hit = intersects[0];

    if (selectedObject !== null) selectedObject.material.wireframe = false;

    if (hit.object == selectedObject) {
      selectedObject = null;
    } else {
      selectedObject = hit.object;
      hit.object.material.wireframe = true;
    }
  }
}