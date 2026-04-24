import { Transform } from "classes";
export class GameObject {
    constructor(name) {
        this.name = name;
        this.components = new Map();
        this.transform = new Transform(this);
        this.children = [];
        this.active = true;
        this.started = false;
        this.awoke = false;
        this.scene;
    }

    addComponent(ComponentClass, ...args) {
        const c = new ComponentClass(this, ...args);
        this.components.set(ComponentClass, c);
        c.awake?.(...args);
        return c;
    }

    getComponent(ComponentClass) {
        return this.components.get(ComponentClass);
    }

    update() {
        for (const c of this.components.values()) c.update?.();
        for (const child of this.children) child.update();
    }

    fixedUpdate(delta) {
        for (const c of this.components.values()) c.fixedUpdate?.(delta);
        for (const child of this.children) child.fixedUpdate(delta);
    }

    start() {
        for (const comp of this.components.values()) {
            if (!comp.started) {
                comp.start?.();
                comp.started = true;
            }
        }
    }

    awake() {
        for (const comp of this.components.values()) {
            if (!comp.awoke) {
                comp.awake?.();
                comp.awoke = true;
            }
        }
    }

    onEnable() {
        for (const comp of this.components.values()) {
            comp.onEnable()
        }
    }

    onDisable() {
        for (const comp of this.components.values()) {
            comp.onDisable()
        }
    }

    onDestroy() {
        for (const comp of this.components.values()) {
            comp.onDestroy()
        }
    }
}