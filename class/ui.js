export class Slider {
    #validTypes;
    constructor() {
        this.#validTypes = 'number';
        this.type = 'number';
        this.value = 0;
        this.minMax = [0, 1];
    }
}