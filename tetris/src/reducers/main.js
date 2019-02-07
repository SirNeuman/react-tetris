import * as types from '../actions/actionTypes';

const initialState = {
	gridState: null
};

const Main = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_GRID_STATE:
			return {
				...state,
				gridState: action.gridState
			};
		default:
			return state;
	}
};

export default Main;