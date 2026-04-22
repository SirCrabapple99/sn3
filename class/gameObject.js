import { Transform } from "classes";
export class GameObject {
    constructor(name) {
        this.name = name;
        this.components = new Map();
        this.transform = new Transform(this);
        this.children = [];
        this.active = true;
        this.started = false;
    }

    addComponent(ComponentClass, ...args) {
        const c = new ComponentClass(this, ...args);
        this.components.set(ComponentClass, c);
        return c;
    }

    getComponent(ComponentClass) {
        return this.components.get(ComponentClass);
    }

    update(delta) {
        for (const c of this.components.values()) c.update?.(delta);
        for (const child of this.children) child.update(delta);
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
        for (comp in this.components) {
            comp.awake()
        }
    }

    onEnable() {
        for (comp in this.components) {
            comp.onEnable()
        }
    }

    onDisable() {
        for (comp in this.components) {
            comp.onDisable()
        }
    }
}