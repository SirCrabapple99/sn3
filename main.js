import * as THREE from 'three';
import { camera, scene, renderer } from './editor/scene.js'
import { inputStuff } from './input/input.js'

function animate() {
    requestAnimationFrame(animate);
    inputStuff();
    renderer.render(scene, camera);
    // arrowRenderer.render(arrowScene, arrowCamera);
}
  
animate();

console.log('main.js loaded')