import * as THREE from 'three';

export class Scene {
    constructor(name) {
        this.name = name;
        this.objects = new Set();
        this.activeObjects = new Set();
        this.playing = false;
    }

    addObject(gameObject) {
        this.objects.add(gameObject);
        gameObject.awake();
        if (gameObject.active) {
            this.activeObjects.add(gameObject);
            if (this.playing) gameObject.start();
        }
    }

    enableObject(gameObject) {
        gameObject.active = true;
        this.activeObjects.add(gameObject);
        if (this.playing) {
            gameObject.start();
            gameObject.onEnable();
        }
    }

    disableObject(gameObject) {
        gameObject.active = false;
        this.activeObjects.delete(gameObject);
        if (this.playing) gameObject.onDisable();
    }

    update(delta) {
        for (const ob of this.activeObjects) {
            ob.update(delta);
        }
    }

    start() {
        for (const ob of this.activeObjects) {
            ob.start();
        }
    }

    awake() {
        for (const ob of objects) {
            ob.awake();
        }
    }

    begin() {
        this.playing = true;
        this.start();
    }

    end() {
        this.playing = false;
    }
}