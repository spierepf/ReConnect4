var createStrand = require("opc/strand");

import { NeoPixelCell } from "../NeoPixelCell.js"

it('should accept one strand', () => {
    var strand = createStrand(64);

    var objectUnderTest = new NeoPixelCell(strand);
});


it('should accept multiple strands', () => {
    var strand = createStrand(64);
    var subStrand1 = strand.slice(0, 32);
    var subStrand2 = strand.slice(32, 64);

    var objectUnderTest = new NeoPixelCell(subStrand1, subStrand2);
});


it('should colour all pixels it contains', () => {
    var strand = createStrand(64);

    var objectUnderTest = new NeoPixelCell(strand);

    objectUnderTest.setColour(1, 2, 3);

    for(var i = 0; i < 64; ++i) {
        expect(strand.getPixel(i)).toStrictEqual([1, 2, 3]);
    }
});


it('should colour all pixels it contains even in multiple strands', () => {
    var strand = createStrand(64);
    var subStrand1 = strand.slice(0, 32);
    var subStrand2 = strand.slice(32, 64);

    var objectUnderTest = new NeoPixelCell(subStrand1, subStrand2);

    objectUnderTest.setColour(1, 2, 3);

    for(var i = 0; i < 64; ++i) {
        expect(strand.getPixel(i)).toStrictEqual([1, 2, 3]);
    }
});
