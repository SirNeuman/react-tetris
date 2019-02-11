import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import '../css/app.css';
import { initializeGrid,
	movePlayerLeft,
	movePlayerRight,
	rotatePlayerCounterClockwise,
	rotatePlayerClockwise,
	movePlayerDown,
	startGame } from '../actions/main';
import RestartMenu from './restartMenu';
import StartMenu from './startMenu';

class Grid extends Component {
	constructor(props) {
		super(props);
		// controls will be:
		// 	a (65) / Left arrow key (37) = left,
		// 	d (68) / Right arrow key (39) = right,
		// 	q (81) = rotate counter clockwise,
		// 	e (69) = rotate clockwise,
		// 	s (83) / down arrow key (40) = move 1 space down
		this.state = {
			controls: {
				37: this.props.movePlayerLeft,
				65: this.props.movePlayerLeft,
				39: this.props.movePlayerRight,
				68: this.props.movePlayerRight,
				81: this.props.rotatePlayerCounterClockwise,
				69: this.props.rotatePlayerClockwise,
				40: this.props.movePlayerDown,
				83: this.props.movePlayerDown,
			}
		};
	}

	handleKeyPress = (e) => {
		const code = e.keyCode;
		console.log(code);
		if (this.props.gameStarted && !this.props.gameOver && _.has(this.state.controls, code)) {
			this.state.controls[code]();
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	render() {
		const {
			gridState,
			gameReady,
			gameStarted,
			gameOver
		} = this.props;

		let gridDisplay = null;
		let startMenuScreen = null;

		if (!gameStarted) {
			startMenuScreen = (
				<StartMenu/>
			);
		} else {
			if (!gameReady) {
				gridDisplay = (
					<div className="text-center">LOADING...</div>
				);
			} else {
				gridDisplay = _.map(gridState, (row, rowIdx) => {
					const spaces = _.map(row, (space, spaceIdx) => {
						let spaceClass;
						if (space === 0) {
							spaceClass = 'empty';
						} else if (space === 1) {
							spaceClass = 'player';
						} else {
							spaceClass = 'filled';
						}
						return (
							<div
								key={'grid-space-' + rowIdx + '-' + spaceIdx}
								className={'flex-1 grid-space ' + spaceClass }></div>
						);
					});
					return (
						<div key={'grid-row-' + rowIdx} className="d-flex flex-row flex-1">
							{spaces}
						</div>
					);
				});
			}
		}

		let restartMenuScreen = null;
		if (gameOver) {
			restartMenuScreen = (
				<RestartMenu />
			);
		}

		return (
			<div className="grid-container d-flex justify-content-center align-items-center position-realtive">
				<div className="grid d-flex flex-column">
					{gridDisplay}
				</div>
				<div className="menu-container d-flex align-items-center justify-content-center">
					{startMenuScreen}
					{restartMenuScreen}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		gridState: state.Main.gridState,
		gameReady: state.Main.gameReady,
		gameStarted: state.Main.gameStarted,
		gameOver: state.Main.gameOver
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initializeGrid: () => {
			dispatch(initializeGrid());
		},
		movePlayerLeft: () => {
			dispatch(movePlayerLeft());
		},
		movePlayerRight: () => {
			dispatch(movePlayerRight());
		},
		rotatePlayerCounterClockwise: () => {
			dispatch(rotatePlayerCounterClockwise());
		},
		rotatePlayerClockwise: () => {
			dispatch(rotatePlayerClockwise());
		},
		movePlayerDown: () => {
			dispatch(movePlayerDown(true));
		},
		startGame: () => {
			dispatch(startGame());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
