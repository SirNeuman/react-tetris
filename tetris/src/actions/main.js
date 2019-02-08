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


/*
The following are asynchronous thunk actions.
=================================================================================
 */

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

export const initializeGame = () => {
	return (dispatch, getState) => {
		dispatch(initializeGrid())
		dispatch(setGameReady(true));
	};
};
