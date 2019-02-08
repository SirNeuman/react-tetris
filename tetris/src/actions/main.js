import _ from 'lodash';

import * as types from './actionTypes';

export const setGridState = (gridState) => {
	return {
		type: types.SET_GRID_STATE,
		gridState
	};
};

export const setGameReady = (gameReady) => {
	return {
		type: types.SET_GAME_READY,
		gameReady
	};
};

export const setPlayerState = (playerState) => {
	return {
		type: types.SET_PLAYER_STATE,
		playerState
	};
};

export const setTetrominos = (tetrominoes) => {
	return {
		type: types.SET_TETROMINOES,
		tetrominoes
	};
};


/*
The following are asynchronous thunk actions.
=================================================================================
 */

// define all 7 tetrominoes as 2d arrays: line, square, T, L, backwards L, S, backwards S (or Z i guess)
const TETROMINOS = [
	[
		[true],
		[true],
		[true],
		[true]
	],
	[
		[true, true],
		[true, true]
	],
	[
		[true, true, true],
		[false, true, false]
	],
	[
		[true, false],
		[true, false],
		[true, true]
	],
	[
		[false, true],
		[false, true],
		[true, true]
	],
	[
		[true, false],
		[true, true],
		[false, true]
	],
	[
		[false, true],
		[true, true],
		[true, false]
	]
];

export const initializeGrid = () => {
	return (dispatch, getState) => {
		// create a 2d array with 10 columns and 20 rows
		const emptyRow = _.map(_.range(10), (space) => {
			return false;
		});
		let gridState = _.map(_.range(20), (row) => {
			return emptyRow;
		});
		dispatch(setGridState(gridState));
	};
};

export const initializePlayerState = () => {
	return (dispatch, getState) => {

	};
};

export const initializeTetriminoBag = () => {
	return (dispatch, getState) => {

	};
};

export const initializeGame = () => {
	return (dispatch, getState) => {
		dispatch(setTetrominos(TETROMINOS));
		dispatch(initializeGrid());
		dispatch(initializePlayerState());
		dispatch(setGameReady(true));
	};
};
