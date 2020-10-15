class NeoPixelCell {
    constructor() {
        this.strands = new Set();

        for (var i = 0; i < arguments.length; i++) {
            this.strands.add(arguments[i])
        }
    }

    setColour(r, g, b) {
        for (let strand of this.strands.values()) {
            for (var i = 0; i < strand.length; i++) {
                strand.setPixel(i, r, g, b);
            }
        }
    }
}

export {
    NeoPixelCell
}
