import * as types from '../actions/actionTypes';

const initialState = {
	gameReady: false,
	gridState: null,
	playerState: null,
	tetrominoes: null,
	tetrominoBag: [],
	playerPosition: null,
	speed: 500,
	linesCleared: 0,
	speedLv: 1,
	gameStarted: false,
	gameOver: false,
	gameStartTime: null
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
		case types.SET_TETROMINOES:
			return {
				...state,
				tetrominoes: action.tetrominoes
			};
		case types.SET_TETROMINO_BAG:
			return {
				...state,
				tetrominoBag: action.tetrominoBag
			};
		case types.SET_PLAYER_POSITION:
			return {
				...state,
				playerPosition: action.playerPosition
			};
		case types.SET_LINES_CLEARED:
			return {
				...state,
				linesCleared: action.linesCleared
			};
		case types.SET_SPEED_LV:
			return {
				...state,
				speedLv: action.speedLV
			};
		case types.SET_GAME_STARTED:
			return {
				...state,
				gameStarted: action.gameStarted
			};
		case types.SET_GAME_OVER:
			return {
				...state,
				gameOver: action.gameOver
			};
		case types.SET_GAME_START_TIME:
			return {
				...state,
				gameStartTime: action.gameStartTime
			};
		default:
			return state;
	}
};

export default Main;