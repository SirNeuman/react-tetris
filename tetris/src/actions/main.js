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
// Start all tetrominos as lying flat, as they are in Tetris Effect starting positions. Define all as square
// 2D arrays for easy rotation.
const TETROMINOES = [
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0]
	],
	[
		[1, 1],
		[1, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 0],
		[1, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 0, 0],
		[1, 1, 1],
	],
	[
		[0, 0, 0],
		[0, 0, 1],
		[1, 1, 1],
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0],
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1],
	]
];

export const initializeGrid = () => {
	return (dispatch, getState) => {
		// create a 2d array with 10 columns and 20 rows.
		// 3 states: 0 means empty space. 1 means space filled by player. 2 is space filled by dropped blocks.
		const emptyRow = _.map(_.range(10), (space) => {
			return 0;
		});
		let gridState = _.map(_.range(20), (row) => {
			return emptyRow;
		});
		dispatch(setGridState(gridState));
	};
};

export const drawPlayerToGrid = () => {
	return (dispatch, getState) => {
		const playerState = getState().Main.playerState;
		const playerPosition = getState().Main.playerPosition;
		const gridState = getState().Main.gridState;
		const newGrid = _.map(gridState, (row, rowIndex) => {
			return _.map(row, (space, colIndex) => {
				// If space is a filled space return 2 regardless.
				if (space == 2) {
					return 2;
				}
				// Push the player onto the grid. the length of each row of the player state is equal,
				// so we can assume that the first row length is the same as every other row.
				if ((rowIndex >= playerPosition[0]) && (rowIndex < (_.size(playerState) + playerPosition[0]))
					&& (colIndex >= playerPosition[1]) && (colIndex < (_.size(playerState[0]) + playerPosition[1]))) {
					return playerState[rowIndex - playerPosition[0]][colIndex - playerPosition[1]];
				} else {
					if (space === 1) {
						// if the space was previously a player change it back to an empty space
						return 0;
					} else {
						return space;
					}
				}
			});
		});
		dispatch(setGridState(newGrid));
	};
};

export const addPlayerToGrid = () => {
	return (dispatch, getState) => {
		const playerState = getState().Main.playerState;
		const playerPosition = getState().Main.playerPosition;
		const gridState = getState().Main.gridState;
		const newGrid = _.map(gridState, (row, rowIndex) => {
			return _.map(row, (space, colIndex) => {
				// Push the player onto the grid. the length of each row of the player state is equal,
				// so we can assume that the first row length is the same as every other row.
				if ((rowIndex >= playerPosition[0]) && (rowIndex < (_.size(playerState) + playerPosition[0]))
					&& (colIndex >= playerPosition[1]) && (colIndex < (_.size(playerState[0]) + playerPosition[1]))) {
					if (playerState[rowIndex - playerPosition[0]][colIndex - playerPosition[1]] === 1) {
						return 2;
					} else {
						return space;
					}
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
		const playerTetromino = getState().Main.tetrominoBag[0];
		dispatch(setPlayerState(playerTetromino));
		const playerWidth = _.size(playerTetromino[0]);
		// a row is 10 spaces. center the player column as much as possible
		const startPlayerColumn = _.round((10 - playerWidth) / 2);
		// start player row with the last filled row being at the top of the grid. (the odd one out is the line piece)
		let numberOfEmptyLastRows = 0;
		_.forEachRight(playerTetromino, (lastRow, lastRowIdx) => {
			let isEmptyRow = _.every(lastRow, (space) => {
				return space === 0;
			});
			console.log(isEmptyRow, lastRow);
			if (isEmptyRow) {
				numberOfEmptyLastRows += 1;
			} else {
				return false;
			}
		});
		const startPlayerRow = numberOfEmptyLastRows - _.size(playerTetromino);
		console.log(startPlayerRow, numberOfEmptyLastRows,  _.size(playerTetromino));
		const playerPosition = [startPlayerRow, startPlayerColumn];
		dispatch(setPlayerPosition(playerPosition));
		dispatch(drawPlayerToGrid());
		dispatch(movePlayerDown());
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

export const checkPlayerHitEnd = () => {
	return (dispatch, getState) => {
		// if any of the player pieces will hit a 2 space on the grid or reaches the end of the grid convert the player object
		// into 2 spaces and reinitialize the player at the top of the screen or
		const playerState = getState().Main.playerState;
		const playerPosition = getState().Main.playerPosition;
		const nextPosition = [playerPosition[0] + 1, playerPosition[1]];
		const gridState= getState().Main.gridState;
		let hitEnd = false;
		_.forEach(playerState, (row, rowIndex) => {
			_.forEach(row, (playerSpace, colIndex) => {
				// don't check the rows that are negative index because those parts of the player have yet to enter
				// the map;
				let nextRowPosition = rowIndex + nextPosition[0];
				if (nextRowPosition > -1) {
					if ((nextRowPosition > _.size(gridState) - 1) ||
						((playerSpace === 1) && (gridState[nextRowPosition][colIndex + playerPosition[1]] === 2))) {
						hitEnd = true;
					}
				}

			});
		});
		if (hitEnd) {
			// move player position back up 1 row.
			const newPosition = [playerPosition[0] - 1, playerPosition[1]];
			dispatch(setPlayerPosition(playerPosition));
			// convert player into grid as 2's and reinitialize player at top of screen
			dispatch(addPlayerToGrid());
			dispatch(initializePlayer());
		}
		return hitEnd;
	};
};

export const movePlayerDown = () => {
	return (dispatch, getState) => {
		setTimeout(() => {

			const playerHitEnd = dispatch(checkPlayerHitEnd());
			if (!playerHitEnd) {
				let playerPosition = getState().Main.playerPosition;
				playerPosition[0] += 1;
				dispatch(setPlayerPosition(playerPosition));
				dispatch(drawPlayerToGrid());
				dispatch(movePlayerDown());
			}
		}, getState().Main.speed);
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
