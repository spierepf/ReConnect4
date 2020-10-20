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

it('should start with a dark game board', () => {
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
//  2  13  18  29  34  45  50  61
//  3  12  19  28  35  44  51  60
//  4  11  20  27  36  43  52  59
//  5  10  21  26  37  42  53  58
//  6   9  22  25  38  41  54  57
//  7   8  23  24  39  40  55  56

const cases = [
    [0,0,7],
    [0,1,6],
    [0,2,5],
    [0,3,4],
    [0,4,3],
    [0,5,2],
    [1,0,8],
    [1,1,9],
    [1,2,10],
    [1,3,11],
    [1,4,12],
    [1,5,13],
    [2,0,23],
    [2,1,22],
    [2,2,21],
    [2,3,20],
    [2,4,19],
    [2,5,18],
    [3,0,24],
    [3,1,25],
    [3,2,26],
    [3,3,27],
    [3,4,28],
    [3,5,29],
    [4,0,39],
    [4,1,38],
    [4,2,37],
    [4,3,36],
    [4,4,35],
    [4,5,34],
    [5,0,40],
    [5,1,41],
    [5,2,42],
    [5,3,43],
    [5,4,44],
    [5,5,45],
    [6,0,55],
    [6,1,54],
    [6,2,53],
    [6,3,52],
    [6,4,51],
    [6,5,50],
]

describe("it should draw one red checker in the right place", () => {
    test.each(cases)(
        "given a checker at (%p,%p), illuminate only pixel %p",
        (x, y, index) => {
            var strand = createStrand(64);

            var npCells = buildNeoPixelCells(strand);

            var p0Colour = [1,0,0];
            var p1Colour = [0,0,1];

            var objectUnderTest = new NeoPixelGame(npCells, [p0Colour, p1Colour]);

            var gCells = buildGameCells();

            gCells[x][y] = 0;

            objectUnderTest.render(gCells);

            for(var i = 0; i < 64; ++i) {
                if(i == index) {
                    // bottom left corner
                    expect(strand.getPixel(i)).toStrictEqual(p0Colour);
                } else {
                    // everywhere else
                    expect(strand.getPixel(i)).toStrictEqual([0, 0, 0]);
                }
            }
        }
    );
});
