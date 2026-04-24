import * as THREE from 'three';
export class Transform {
    constructor() {
        this.position = new THREE.Vector3();
        this.rotation = new THREE.Euler();
        this.scale = new THREE.Vector3(1, 1, 1);
        this.dirty = true;
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z);
        this.dirty = true;
    }

    setRotation(x, y, z) {
        this.rotation.set(x, y, z);
        this.dirty = true;
    }

    setScale(x, y, z) {
        this.scale.set(x, y, z);
        this.dirty = true;
    }
}