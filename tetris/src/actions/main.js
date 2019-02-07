import _ from 'lodash';

import * as types from './actionTypes';

export const setGridState = (gridState) => {
	return {
		type: types.SET_GRID_STATE,
		gridState
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