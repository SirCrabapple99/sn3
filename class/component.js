export class Component {
    constructor(gameObject) {
        this.gameObject = gameObject;
        this.name = ''
        this.pubVars = {

        }
    }

    onEnable() { }

    onDisable() { }

    awake() { }

    start() { }

    update() { }

    fixedUpdate(delta) { }

    onDestroy() { }

    get transform() {
        return this.gameObject.transform;
    }

    getComponent(cls) {
        return this.gameObject.getComponent(cls);
    }
}