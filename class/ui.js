export class Slider {
    #validTypes;
    constructor(options = {}) {
        this.#validTypes = 'number';
        this.type = options.type ?? 'number';
        this.value = options.value ?? 0;
        this.minMax = options.minMax ?? [0, 1];
        this.step = options.step ?? 1;
    }
}