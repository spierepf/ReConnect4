var createStrand = require("opc/strand");

import { NeoPixelCell } from "../NeoPixelCell.js"
import { NeoPixelGame } from "../NeoPixelGame.js"

it('start with a dark game board', () => {
    var strand = createStrand(64);

    var rows = 6; 
    var cols = 7;

    var npCells = Array(7).fill(Array(6).fill(null));
    for(var y=0;y<rows;y++){
        for(var x=0;x<cols;x++){
            var index = y*8 + x;
            npCells[x][y] = new NeoPixelCell(strand.slice(index, index))
        }
    }

    var objectUnderTest = new NeoPixelGame(npCells);

    var gCells = Array(7).fill(Array(6).fill(null));

    objectUnderTest.render(gCells);

    for(var i = 0; i < 64; ++i) {
        expect(strand.getPixel(i)).toStrictEqual([0, 0, 0]);
    }
});


it('should add one red checker', () => {
    var strand = createStrand(64);

    var rows = 6; 
    var cols = 7;

    var npCells = Array(7).fill(null);
    for(var x=0;x<cols;x++){
        npCells[x] = Array(6).fill(null);
        for(var y=0;y<rows;y++){
            var index = y*8 + x;
            npCells[x][y] = new NeoPixelCell(strand.slice(index, index+1));
        }
    }

    var p0Colour = [1,0,0]
    var p1Colour = [1,1,0]

    var objectUnderTest = new NeoPixelGame(npCells, [p0Colour, p1Colour]);

    var gCells = Array(7).fill(null);
    for(var i=0; i < cols; ++i) {
        gCells[i] = Array(6).fill(null);
    }

    gCells[0][0] = 0;
    objectUnderTest.render(gCells);

    expect(strand.getPixel(0)).toStrictEqual(p0Colour);
});
