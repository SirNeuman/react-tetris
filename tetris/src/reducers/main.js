import * as types from '../actions/actionTypes';

const initialState = {
	gameReady: false,
	gridState: null,
	playerState: null
};

const Main = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_GAME_READY:
			return {
				...state,
				gameReady: action.gameReady
			};
		case types.SET_GRID_STATE:
			return {
				...state,
				gridState: action.gridState
			};
		case types.SET_PLAYER_STATE:
			return {
				...state,
				playerState: action.playerState
			};
		default:
			return state;
	}
};

export default Main;