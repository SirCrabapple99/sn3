import * as THREE from 'three';
import { GameObject, Component, MeshRenderer } from 'classes';
import { testScript } from 'scripts/testScript.js';

export const obj = new GameObject('obj');
obj.addComponent(testScript);
obj.addComponent(MeshRenderer, {
    geometry: new THREE.BoxGeometry(1, 1, 1),
    material: new THREE.MeshStandardMaterial({ color: 0xffffff })
})

obj.active = true;