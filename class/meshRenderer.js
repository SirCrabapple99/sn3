import * as THREE from 'three';
import { Component } from "./component.js";
import { scene } from "../editor/editor.js";
export class MeshRenderer extends Component {
    awake(properties = {}) {
        this.geometry = properties.geometry ?? new THREE.BoxGeometry(1, 1, 1);
        this.material = properties.material ?? new THREE.MeshStandardMaterial();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.gameObject = this.gameObject;
    }

    update() {
        if (!this.transform.dirty) return;
        this.mesh.position.copy(this.transform.position);
        this.mesh.rotation.copy(this.transform.rotation);
        this.mesh.scale.copy(this.transform.scale);
        this.transform.dirty = false;
    }

    start() {
        scene.add(this.mesh);
        // console.log('successfully ran meshRenderer.start()');
    }

    onDestroy() {
        scene.remove(this.mesh);
        // console.log('successfully ran meshRenderer.onDestroy()');
    }
}