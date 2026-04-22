import * as THREE from 'three';
import { camera, scene, renderer } from './editor/editor.js';
import { inputStuff } from './input/input.js';
import { play } from './editor/play.js';

let playing = false;
function animate() {
    requestAnimationFrame(animate);

    if (playing) {
        play();
    } else {
        inputStuff();
        renderer.render(scene, camera);
    }
}
  
animate();

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyI') {
        playing = !playing
        console.log('playing: ' + playing)
    }
})