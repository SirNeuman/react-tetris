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
				if (space === 2) {
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
		let tetrominoBag = getState().Main.tetrominoBag;
		let playerTetromino = tetrominoBag.shift();
		dispatch(setTetrominoBag(tetrominoBag));
		if (_.size(tetrominoBag) < 2) {
			dispatch(addToTetrominoBag());
		}
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
			if (isEmptyRow) {
				numberOfEmptyLastRows += 1;
			} else {
				return false;
			}
		});
		const startPlayerRow = numberOfEmptyLastRows - _.size(playerTetromino) + 1;
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

export const checkLineClear = () => {
	return (dispatch, getState) => {

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
				// the map and don't check empty spaces within the player
				let nextRowPosition = rowIndex + nextPosition[0];
				if (nextRowPosition > -1 && playerSpace === 1) {
					if ((nextRowPosition > _.size(gridState) - 1) ||
						(gridState[nextRowPosition][colIndex + playerPosition[1]] === 2)) {
						hitEnd = true;
					}
				}

			});
		});
		if (hitEnd) {
			dispatch(checkLineClear());
			dispatch(setPlayerPosition(playerPosition));
			// convert player into grid as 2's and reinitialize player at top of screen
			dispatch(addPlayerToGrid());
			dispatch(initializePlayer());
		}
		return hitEnd;
	};
};

let dropPlayerTimer = null;

export const movePlayerDown = (manualTrigger=false) => {
	return (dispatch, getState) => {
		const dropPlayer = () => {
			const playerHitEnd = dispatch(checkPlayerHitEnd());
			if (!playerHitEnd) {
				let playerPosition = getState().Main.playerPosition;
				playerPosition[0] += 1;
				dispatch(setPlayerPosition(playerPosition));
				dispatch(drawPlayerToGrid());
				dispatch(movePlayerDown());
			}
		};
		if (manualTrigger) {
			// Uere we need to clear the timeout and reset the timer for the next auto move player down, otherwise
			// we'll have multiple timer's going and the drop speed will get crazy fast.
			clearTimeout(dropPlayerTimer);
			dropPlayer();
			dispatch(movePlayerDown);
		} else {
			dropPlayerTimer = setTimeout(() => {
				dropPlayer();
			}, getState().Main.speed);
		}
	};
};

const checkPlayerRightCollision = (playerState, playerPosition, gridState) => {
	let rightCollision = false;
	_.forEach(playerState, (row, rowIndex) => {
		_.forEach(row, (space, colIndex) => {
			let nextColPosition = colIndex + playerPosition[1];
			// if the row is negative we only need to check if the column is outside the grid, otherwise we need
			// to check if we are about to hit a 2 space.
			if (space === 1) {
				if (playerPosition[0] < 0) {
					if ((nextColPosition > _.size(gridState[0]) - 1)) {
						rightCollision = true;
					}
				} else {
					if (nextColPosition > -1) {
						if ((nextColPosition > _.size(gridState[0]) - 1) ||
							(gridState[rowIndex + playerPosition[0]][colIndex + playerPosition[1]] === 2)) {
							rightCollision = true;
						}
					}
				}
			}
			// minor optimization: this just breaks us out of the forEach loop.
			if (rightCollision) {
				return false;
			}
		});
		if (rightCollision) {
			return false;
		}
	});
	return rightCollision;
};

const checkPlayerLeftCollision = (playerState, playerPosition, gridState) => {
	let leftCollision = false;
	_.forEach(playerState, (row, rowIndex) => {
		_.forEach(row, (space, colIndex) => {
			let nextColPosition = colIndex + playerPosition[1];
			if (space === 1) {
				if (playerPosition[0] < 0) {
					if (nextColPosition < 0) {
						leftCollision = true;
					}
				} else if ((nextColPosition < 0) ||
					(gridState[rowIndex + playerPosition[0]][colIndex + playerPosition[1]] === 2)) {
					leftCollision = true;
				}
			}
			if (leftCollision) {
				return false;
			}
		});
		if (leftCollision) {
			return false;
		}
	});
	return leftCollision;
};

export const movePlayerRight = (playerState=null) => {
	return (dispatch, getState) => {
		let playerPosition = getState().Main.playerPosition;
		const nextPosition = [playerPosition[0], playerPosition[1] + 1];
		// If player state is passed in that means we only want to check the player movement without actually moving the player.
		// In this case just return the player position without setting it, or drawing the player to the grid.
		let checkOnly = true;
		if (playerState === null) {
			checkOnly = false;
			playerState = getState().Main.playerState;
		}
		const gridState = getState().Main.gridState;
		// check boundaries of grid and check that that none of the blocks would be moving into a 2 spot.
		let rightCollision = checkPlayerRightCollision(playerState, nextPosition, gridState);
		if (checkOnly) {
			if (rightCollision) {
				return false;
			} else {
				return nextPosition;
			}
		} else if (!rightCollision) {
			dispatch(setPlayerPosition(nextPosition));
			dispatch(drawPlayerToGrid());
		}
	};
};

export const movePlayerLeft = (playerState=null) => {
	return (dispatch, getState) => {
		let playerPosition = getState().Main.playerPosition;
		const nextPosition = [playerPosition[0], playerPosition[1] - 1];
		let checkOnly = true;
		if (playerState === null) {
			checkOnly = false;
			playerState = getState().Main.playerState;
		}
		const gridState = getState().Main.gridState;
		// check boundaries of grid and check that that none of the blocks would be moving into a 2 spot.
		const leftCollision = checkPlayerLeftCollision(playerState, nextPosition, gridState);
		if (checkOnly) {
			console.log('should check???', nextPosition);
			if (leftCollision) {
				return false;
			} else {
				return nextPosition;
			}
		} else if (!leftCollision) {
			dispatch(setPlayerPosition(nextPosition));
			dispatch(drawPlayerToGrid());
		}
	};
};

export const checkPlayerCanRotate = (playerState) => {
	return (dispatch, getState) => {
		// Now we need to check if after rotating the player is outside the grid or shifted a 2 space.
		// Try to move it in the opposite direction of what it is colliding into until it is not colliding.
		// If shifting makes it collide, or colliding is unavoidable, do not allow player rotation.
		let canNotRotate = false;
		let noCollisions = false;
		let playerPosition = getState().Main.playerPosition;
		let gridState = getState().Main.gridState;
		console.log('xxxx', playerPosition, playerState);
		while (!canNotRotate && !noCollisions) {


			if (checkPlayerRightCollision(playerState, playerPosition, gridState)) {
				console.log('right collide');
				const playerMovedLeft = dispatch(movePlayerLeft(playerPosition));
				if (playerMovedLeft === false) {
					canNotRotate = true;
				} else {
					playerPosition = playerMovedLeft;
				}
			} else if (checkPlayerLeftCollision(playerState, playerPosition, gridState)) {
				console.log('left collide',);
				const playerMovedRight = dispatch(movePlayerRight(playerPosition));
				if (playerMovedRight === false) {
					canNotRotate = true;
				} else {
					playerPosition = playerMovedRight;
				}
			} else {
				noCollisions = true;
			}
		}
		if (canNotRotate) {
			return false;
		} else {
			return playerPosition;
		}
	};
};

export const rotatePlayerCounterClockwise = () => {
	return (dispatch, getState) => {
		const playerState = getState().Main.playerState;
		// Rotating the square 2D array counter clockwise is a matter of rebulding the same 2D array,
		// with all of the items, starting from the last column, and moving them into rows from the top down.
		let newPlayerState = [];
		_.forEachRight(playerState[0], (col, colIndex) => {
			let newPlayerRow = [];
			_.forEach(playerState, (row, rowIndex) => {
				newPlayerRow.push(playerState[rowIndex][colIndex]);
			});
			newPlayerState.push(newPlayerRow);
		});

		const playerPosition = dispatch(checkPlayerCanRotate(newPlayerState));
		if (playerPosition !== false) {
			dispatch(setPlayerPosition(playerPosition));
			dispatch(setPlayerState(newPlayerState));
			dispatch(drawPlayerToGrid());
		}
	};
};

export const rotatePlayerClockwise = () => {
	return (dispatch, getState) => {
		const playerState = getState().Main.playerState;
		// Rotating the square 2D array clockwise is a matter of rebulding the same 2D array,
		// with all of the items, starting from the first column, and moving them into rows from the top down.
		let newPlayerState = [];
		console.log(_.size(playerState));
		_.forEach(playerState[0], (col, colIndex) => {
			let newPlayerRow = [];
			_.forEachRight(playerState, (row, rowIndex) => {
				newPlayerRow.push(playerState[rowIndex][colIndex]);
			});
			newPlayerState.push(newPlayerRow);
		});

		const playerPosition = dispatch(checkPlayerCanRotate(newPlayerState));
		if (playerPosition !== false) {
			dispatch(setPlayerPosition(playerPosition));
			dispatch(setPlayerState(newPlayerState));
			dispatch(drawPlayerToGrid());
		}
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
