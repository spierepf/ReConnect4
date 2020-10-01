import { Client } from 'boardgame.io/client';
import { Local } from 'boardgame.io/multiplayer'
import { ReConnectFour } from './Game';
import { SocketIO } from 'boardgame.io/multiplayer'

class ReConnectFourClient {
  constructor(rootElement,  { playerID } = {} ) {
    this.client = Client({ game: ReConnectFour, multiplayer: SocketIO({ server: 'localhost:8000' }), playerID, });
    this.client.start();
    this.rootElement = rootElement;
    this.createBoard();
    this.attachListeners();
	this.client.subscribe(state => this.update(state));
  }
  
  createBoard() {
    // Create cells in rows for the Tic-Tac-Toe board.
    const rows = [];
    for (let y = 5; y >= 0; y--) {
      const cells = [];
      for (let x = 0; x < 7; x++) {
        const id = 7 * x + y;
        cells.push(`<td class="cell" data-id="${id}"></td>`);
      }
      rows.push(`<tr>${cells.join('')}</tr>`);
    }

    // Add the HTML to our app <div>.
    // We’ll use the empty <p> to display the game winner later.
    this.rootElement.innerHTML = `
      <table>${rows.join('')}</table>
      <p class="winner"></p>
    `;
  }

  attachListeners() {
    // This event handler will read the cell id from a cell’s
    // `data-id` attribute and make the `clickCell` move.
    const handleCellClick = event => {
      const id = parseInt(event.target.dataset.id);
      this.client.moves.clickCell(Math.floor(id/7));
    };
    // Attach the event listener to each of the board cells.
    const cells = this.rootElement.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.onclick = handleCellClick;
    });
  }
  
  update(state) {
	 if (state === null) return;
    // Get all the board cells.
    const cells = this.rootElement.querySelectorAll('.cell');
    // Update cells to display the values in game state.
    cells.forEach(cell => {
      const cellId = parseInt(cell.dataset.id);
      const cellValue = state.G.cells[Math.floor(cellId/7)][(cellId-Math.floor(cellId/7))%6];
      cell.textContent = cellValue !== null ? cellValue : '';
    });
    // Get the gameover message element.
    const messageEl = this.rootElement.querySelector('.winner');
    // Update the element to show a winner if any.
    if (state.ctx.gameover) {
      messageEl.textContent =
        state.ctx.gameover.winner !== undefined
          ? 'Winner: ' + state.ctx.gameover.winner
          : 'Draw!';
    } else {
      messageEl.textContent = '';
    }
  }
  
}

//const app = new ReConnectFourClient();

const appElement = document.getElementById('app');
//const app = new ReConnectFourClient(appElement);

const playerIDs = ['0', '1'];
const clients = playerIDs.map(playerID => {
  const rootElement = document.createElement('div');
  appElement.append(rootElement);
  return new ReConnectFourClient(rootElement, { playerID });
});


