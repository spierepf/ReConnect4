import { clickCell } from '../Game';
import { IsVictory } from '../Game';
import { IsDraw } from '../Game';
import { INVALID_MOVE } from 'boardgame.io/core';

it('should place the correct value the bottom of the clicked column', () => {
  // original state.
  const G = {
    cells: [[null, null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null]]
  };

  // make move.
  clickCell(G, { currentPlayer: '1' }, 3);

  // verify new state.
  expect(G).toEqual({
    cells: [[null, null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null],['1', null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null]]
  });
});

/*

it('should throw an error if a user tries to add to a full column', () => {
  // original state.
  const G = {
    cells: [["0","0","0","1","1","1"],[null, null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null],[null, null, null, null, null, null]]
  };

  // make move.
  expect(() => { clickCell(G, { currentPlayer: '0' }, 0);}).toThrow(INVALID_MOVE);
});


*/


it('should recognize vertical victory bottom left', () => {
  // original state.
  const G = {
    cells: [
	['0','0','0','0',null,null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null]]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(true);

});

it('should recognize vertical victory top left', () => {
  // original state.
  const G = {
    cells: [
	['1','1','0','0','0','0'],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null]]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(true);

});



it('should recognize vertical victory bottom right', () => {
  // original state.
  const G = {
    cells: [
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],	
	['0','0','0','0',null,null]]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(true);

});

it('should recognize vertical victory top right', () => {
  // original state.
  const G = {
    cells: [
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	['1','1','0','0','0','0']]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(true);

});

it('should recognize horizontal victory bottom left', () => {
  // original state.
  const G = {
    cells: [
	['1', null, null, null, null, null],
	['1', null, null, null, null, null],
	['1', null, null, null, null, null],
	['1', null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null]
	]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(true);

});


it('should recognize horizontal victory bottom right', () => {
  // original state.
  const G = {
    cells: [
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	['1', null, null, null, null, null],
	['1', null, null, null, null, null],
	['1', null, null, null, null, null],
	['1', null, null, null, null, null]

	]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(true);

});

it('should recognize horizontal victory top left', () => {
  // original state.
  const G = {
    cells: [
	[null, null, null, null, null, '1'],
	[null, null, null, null, null, '1'],
	[null, null, null, null, null, '1'],
	[null, null, null, null, null, '1'],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null]
	]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(true);

});


it('should recognize horizontal victory top right', () => {
  // original state.
  const G = {
    cells: [
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, '1'],
	[null, null, null, null, null, '1'],
	[null, null, null, null, null, '1'],
	[null, null, null, null, null, '1']

	]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(true);

});


it('should recognize forward slash victory bottom left', () => {
  // original state.
  const G = {
    cells: [
	['1', null, null, null, null, null],
	['0', '1', null, null, null, null],
	['0', '0', '1', null, null, null],
	['1', '0', '0', '1', null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null]

	]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(true);

});


it('should recognize back slash victory top right', () => {
  // original state.
  const G = {
    cells: [
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	['1', '0', '1', null, null, null],
	['0', '1', '0', '1', null, null],
	['0', '1', '1', '0', '1', null],
	['0', '1', '0', '0', '0', '1']

	]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(true);

});

it('should not claim a victory on in-play board', () => {
  // original state.
  const G = {
    cells: [
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	['1', '0', '0', null, null, null],
	['0', '1', '0', '1', null, null],
	['0', '1', '1', '0', '1', null],
	['0', '1', '0', '0', '1', '0']

	]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(false);

});

it('should claim a draw on full, won board', () => {
  // original state.
  const G = {
    cells: [
	['0','0','0','1','0','1'],
	['0','1','0','1','0','1'],
	['0','1','0','1','0','1'],
	['1','0','1','0','1','1'],
	['0','1','0','1','0','1'],
	['0','1','0','1','0','1'],
	['0','1','0','1','0','1']
	]
  };

  // verify new state.
  expect(IsDraw(G.cells)).toEqual(false);

});

it('should not claim a victory on drawn board', () => {
  // original state.
  const G = {
    cells: [
	['0','1','0','1','0','1'],
	['0','1','0','1','0','1'],
	['0','1','0','1','0','1'],
	['1','0','1','0','1','0'],
	['0','1','0','1','0','1'],
	['0','1','0','1','0','1'],
	['0','1','0','1','0','1']
	]
  };

  // verify new state.
  expect(IsVictory(G.cells)).toEqual(false);

});

it('should claim a draw on drawn board', () => {
  // original state.
  const G = {
    cells: [
	['0','1','0','1','0','1'],
	['0','1','0','1','0','1'],
	['0','1','0','1','0','1'],
	['1','0','1','0','1','0'],
	['0','1','0','1','0','1'],
	['0','1','0','1','0','1'],
	['0','1','0','1','0','1']
	]
  };

  // verify new state.
  expect(IsDraw(G.cells)).toEqual(true);

});

