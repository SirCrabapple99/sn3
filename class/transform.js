import * as THREE from 'three';
export class Transform {
    constructor() {
        this.position = new THREE.Vector3();
        this.rotation = new THREE.Euler();
        this.scale = new THREE.Vector3(1, 1, 1);
    }
}