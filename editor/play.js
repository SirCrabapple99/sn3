import * as THREE from 'three';
import { GameObject, Component, Scene } from 'classes';
import { camera, scene, renderer } from './editor.js';
import { testScene } from '../assets/scenes/testscene/testScene.js';

let first = true;
export function play() {
    testScene.update();
    renderer.render(scene, camera);
}