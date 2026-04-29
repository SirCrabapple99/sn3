import * as A from './filesystem/opfs.js';
import * as THREE from 'three';
import { camera, scene, renderer } from './editor/editor.js';
import { play } from './editor/play.js';
import { testScene } from '../assets/scenes/testscene/testScene.js';
import { inputStuff, selectedObject } from './input/input.js';

let playing = false;
function animate() {
    requestAnimationFrame(animate);

    if (playing) {
        play();
    } else {
        inputStuff(playing);
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
        inputStuff(false);
        console.log(selectedObject)
    }
})