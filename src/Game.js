import { INVALID_MOVE } from 'boardgame.io/core';

export function clickCell(G, ctx, id) {
  G.cells[id] = ctx.currentPlayer;
}

export const ReConnectFour = {
  setup: () => ({ cells: Array(7).fill(Array(6).fill(null)) }),

  moves: {
    clickCell: (G, ctx, id) => {
		var i = 0;
		for(i=0;i<7;i++){
			if(G.cells[id][i] === null) {
				G.cells[id][i] = ctx.currentPlayer;
				return;
			} 
		}
		return INVALID_MOVE;
    },
  },
  
  turn: {
	moveLimit: 1,
  },
  
  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },
};



 function IsVictory(cells) {  //return true if game won

	var emptyFound = 0;
	var rows = 6; 
	var cols = 7;
	var winSeq = [];


	for(var y=0;y<rows;y++){
      for(var x=0;x<cols;x++){
		//var t = y*cols+x;
		
		//if empty slot, don't bother checking
		if(cells[x][y]===null) {
		  emptyFound = 1;
		  continue;
		}
		 
		//check horizontal
	    if (x<=cols-4 && cells[x][y]===cells[x+1][y] && cells[x][y]===cells[x+2][y] && cells[x][y]===cells[x+3][y]) {
		  //winSeq = [t,t+1,t+2,t+3];
		  return true;
		  }
		//check vertical
		if (y<=rows-4 && cells[x][y]===cells[x][y+1] && cells[x][y]===cells[x][y+2] && cells[x][y]===cells[x][y+3]) {
		 // winSeq = [t,t+cols,t+2*cols,t+3*cols];
		  return true;
		  }
		//check diag (forward slash)
		if (x<=cols-4 && y<=rows-4 && cells[x][y]===cells[x+1][y+1] && cells[x][y]===cells[x+2][y+2] && cells[x][y]===cells[x+3][y+3]) {
		  //winSeq = [t,t+cols+1,t+2*cols+2,t+3*cols+3];
		  return true;
		  }		  
		//check diag (back slash)
		if (x<=cols-4 && y>=3 && cells[x][y]===cells[x+1][y-1] && cells[x][y]===cells[x+2][y-2] && cells[x][y]===cells[x+3][y-3]) {
		  //winSeq = [t,t-cols+1,t-2*cols+2,t-3*cols+3];
		  return true;
		  }
		  
	  }
	}
	return false;
  }

// Return true if all `cells` are occupied.
function IsDraw(cells) {
	var rows = 6; 
	var cols = 7;
	
	for(var y=0;y<rows;y++)
		for(var x=0;x<cols;x++)
			if(cells[x][y] === null)
				return false;
			
	return true;
}

