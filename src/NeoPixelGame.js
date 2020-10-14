class NeoPixelGame {
    constructor(npCells, colours = [[64,0,0], [0,0,64]]) {
        this.npCells = npCells
        this.colours = colours
    }

    render(gCells) {
        var rows = 6; 
        var cols = 7;

        for(var y=0;y<rows;y++){
            for(var x=0;x<cols;x++){
                if(gCells[x][y] == null) {
                    this.npCells[x][y].setColour(0, 0, 0);
                } else {
                    var c = this.colours[gCells[x][y]];
                    console.log(x, y, gCells[x][y], c);
                    this.npCells[x][y].setColour(c[0], c[1], c[2]);
                }
            }
        }
    }
}

export {
    NeoPixelGame
}
