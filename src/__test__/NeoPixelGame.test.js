var createStrand = require("opc/strand");

import { NeoPixelCell } from "../NeoPixelCell.js"
import { NeoPixelGame } from "../NeoPixelGame.js"

function buildNeoPixelCells(strand) {
    var rows = 6; 
    var cols = 7;

    var npCells = Array(7).fill(null);
    for(var x = 0; x < cols; x++) {
        npCells[x] = Array(6).fill(null);
        for(var y = 0; y < rows; y++) {
            var index = x * 8 + (x % 2 == 0 ? (7 - y) : y);
            npCells[x][y] = new NeoPixelCell(strand.slice(index, index+1))
        }
    }
    
    return npCells;    
}

function buildGameCells() {
    var rows = 6; 
    var cols = 7;

    var gameCells = Array(7).fill(null);
    for(var x = 0; x < cols; x++) {
        gameCells[x] = Array(6).fill(null);
    }
    
    return gameCells;    
}

it('start with a dark game board', () => {
    var strand = createStrand(64);

    var npCells = buildNeoPixelCells(strand);

    var objectUnderTest = new NeoPixelGame(npCells);

    var gCells = buildGameCells();

    objectUnderTest.render(gCells);

    for(var i = 0; i < 64; ++i) {
        expect(strand.getPixel(i)).toStrictEqual([0, 0, 0]);
    }
});

//  0  15  16  31  32  47  48  63
//  1  14  17  30  33  46  49  62
//  2  13  18  28  34  45  50  61
//  3  12  19  28  35  44  51  60
//  4  11  20  27  36  43  52  59
//  5  10  21  26  37  42  53  58
//  6   9  22  25  38  41  54  57
//  7   8  23  24  39  40  55  56

it('should draw one red checker in the bottom left corner', () => {
    var strand = createStrand(64);

    var npCells = buildNeoPixelCells(strand);

    var p0Colour = [1,0,0];
    var p1Colour = [0,0,1];

    var objectUnderTest = new NeoPixelGame(npCells, [p0Colour, p1Colour]);

    var gCells = buildGameCells();

    gCells[0][0] = 0;

    objectUnderTest.render(gCells);

    for(var i = 0; i < 64; ++i) {
        if(i == 7) {
            // bottom left corner
            expect(strand.getPixel(i)).toStrictEqual(p0Colour);
        } else {
            // everywhere else
            expect(strand.getPixel(i)).toStrictEqual([0, 0, 0]);
        }
    }
});

it('should draw one blue checker in the bottom of the second column', () => {
    var strand = createStrand(64);

    var npCells = buildNeoPixelCells(strand);

    var p0Colour = [1,0,0];
    var p1Colour = [0,0,1];

    var objectUnderTest = new NeoPixelGame(npCells, [p0Colour, p1Colour]);

    var gCells = buildGameCells();

    gCells[1][0] = 1;

    objectUnderTest.render(gCells);

    for(var i = 0; i < 64; ++i) {
        if(i == 8) {
            // bottom of the second column
            expect(strand.getPixel(i)).toStrictEqual(p1Colour);
        } else {
            // everywhere else
            expect(strand.getPixel(i)).toStrictEqual([0, 0, 0]);
        }
    }
});


it('should draw one red checker in the top of the third column', () => {
    var strand = createStrand(64);

    var npCells = buildNeoPixelCells(strand);

    var p0Colour = [1,0,0];
    var p1Colour = [0,0,1];

    var objectUnderTest = new NeoPixelGame(npCells, [p0Colour, p1Colour]);

    var gCells = buildGameCells();

    gCells[2][5] = 1;

    objectUnderTest.render(gCells);

    for(var i = 0; i < 64; ++i) {
        if(i == 18) {
            // top of the third column
            expect(strand.getPixel(i)).toStrictEqual(p1Colour);
        } else {
            // everywhere else
            expect(strand.getPixel(i)).toStrictEqual([0, 0, 0]);
        }
    }
});
