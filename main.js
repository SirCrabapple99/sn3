import * as THREE from 'three';
import { camera, scene, renderer } from './editor/editor.js';
import { inputStuff } from './input/input.js';
import { play } from './editor/play.js';
import { testScene } from '../assets/scenes/testscene/testScene.js';

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
        playing = !playing;
        if (playing) testScene.begin();
        else testScene.end();
        console.log('playing: ' + playing)
    }
})