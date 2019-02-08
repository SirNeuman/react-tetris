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

export const setPlayerPosition = (playerPosition) => {
	return {
		type: types.SET_PLAYER_POSITION,
		playerPosition
	};
};

export const setTetrominos = (tetrominoes) => {
	return {
		type: types.SET_TETROMINOES,
		tetrominoes
	};
};

export const setTetrominoBag = (tetrominoBag) => {
	return {
		type: types.SET_TETROMINO_BAG,
		tetrominoBag
	};
};


/*
The following are asynchronous thunk actions.
=================================================================================
 */

// Define all 7 tetrominoes as 2d arrays: line, square, T, L, backwards L, S, backwards S (or Z i guess).
// Start all tetrominos as lying flat, as they are in Tetris Effect starting positions.
const TETROMINOES = [
	[
		[true, true, true, true],
	],
	[
		[true, true],
		[true, true]
	],
	[
		[false, true, false],
		[true, true, true]
	],
	[
		[true, false, false],
		[true, true, true],
	],
	[
		[false, false, true],
		[true, true, true],
	],
	[
		[false, true, true],
		[true, true, false],
	],
	[
		[true, true, false],
		[false, true, true],
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

export const addPlayerToGrid = () => {
	return (dispatch, getState) => {
		const playerState = getState().Main.playerState;
		const playerPostion = getState().Main.playerPosition;
		const gridState= getState().Main.gridState;
		const newGrid = _.map(gridState, (row, rowIndex) => {
			return _.map(row, (space, colIndex) => {
				// Push the player onto the grid. the length of each row of the player state is equal,
				// so we can assume that the first row length is the same as every other row.
				if ((rowIndex + playerPostion[0]) < _.size(playerState) && (colIndex - playerPostion[1]) < _.size(playerState[0])) {
					return playerState[rowIndex + playerPostion[0]][colIndex - playerPostion[1]];
				} else {
					return space;
				}
			});
		});
		dispatch(setGridState(newGrid));
	};
};

export const initializePlayer = () => {
	return (dispatch, getState) => {
		// Player is first tetromino out of bag. Starting position (top 0, left 0 depends on width of tetromino)
		const startPlayerRow = 0;
		const playerTetromino = getState().Main.tetrominoBag[0];
		dispatch(setPlayerState(playerTetromino));
		const playerWidth = _.size(playerTetromino[0]);
		// a row is 10 spaces. center the player as much as possible
		const startPlayerColumn = _.round((10 - playerWidth) / 2);
		const playerPosition = [startPlayerRow, startPlayerColumn];
		dispatch(setPlayerPosition(playerPosition));
		dispatch(addPlayerToGrid());
	};
};

export const addToTetrominoBag = () => {
	return (dispatch, getState) => {
		// choose all 7 tetrominoes in a random order to add to the existing bag
		const currentTetrominoBag = getState().Main.tetrominoBag;
		const shuffledTetrominoGroup = _.shuffle(getState().Main.tetrominoes);
		const newTetrominoBag = _.concat(currentTetrominoBag, shuffledTetrominoGroup);
		dispatch(setTetrominoBag(newTetrominoBag));
	};
};

export const initializeGame = () => {
	return (dispatch, getState) => {
		dispatch(setTetrominos(TETROMINOES));
		dispatch(addToTetrominoBag());
		dispatch(initializeGrid());
		dispatch(initializePlayer());
		dispatch(setGameReady(true));
	};
};
