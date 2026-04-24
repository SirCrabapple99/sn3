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
        gameObject.scene = this;
        if (this.playing) gameObject.awake();
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
        if (this.playing && !gameObject.active) gameObject.onDisable();
        gameObject.active = false;
        this.activeObjects.delete(gameObject);
    }

    update() {
        for (const ob of this.activeObjects) {
            ob.update();
        }
    }

    fixedUpdate(delta) {
        for (const ob of this.activeObjects) {
            ob.fixedUpdate(delta);
        }
    }

    start() {
        for (const ob of this.activeObjects) {
            ob.start();
        }
    }

    awake() {
        for (const ob of this.objects) {
            ob.awake();
        }
    }

    destroy() {
        for (const ob of this.objects) {
            ob.onDestroy();
        }
    }

    begin() {
        this.playing = true;
        this.awake();
        this.start();
    }

    end() {
        this.playing = false;
        this.destroy();
        for (const ob of this.objects) {
            for (const comp of ob.components.values()) {
                comp.started = false;
                comp.awoke = false;
            }
        }
    }
}