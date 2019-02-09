import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import '../css/app.css';
import { initializeGrid,
	movePlayerLeft,
	movePlayerRight,
	rotatePlayerLeft,
	rotatePlayerRight, } from '../actions/main';
// import Player from './player';

class Grid extends Component {
	constructor(props) {
		super(props);
		// controls will be: a (97) = left, d (100) = right, q (113) = rotate left, e (101) = rotate right
		this.state = {
			controls: {
				97: this.props.movePlayerLeft,
				100: this.props.movePlayerRight,
				113: this.props.rotatePlayerLeft,
				101: this.props.rotatePlayerRight
			}
		};
	}

	handleKeyPress = (e) => {
		const code = e.keyCode;
		if (_.has(this.state.controls, code)) {
			this.state.controls[code]();
		}
	}

	componentDidMount() {
		document.addEventListener('keypress', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keypress', this.handleKeyPress);
	}

	render() {
		const {
			gridState,
			gameReady
		} = this.props;

		if (!gameReady) {
			return (
				<div>LOADING...</div>
			);
		}
		const grid = _.map(gridState, (row, rowIdx) => {
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

		return (
			<div className="grid-container">
				<div className="grid d-flex flex-column">
					{grid}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		gridState: state.Main.gridState,
		gameReady: state.Main.gameReady
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
		rotatePlayerLeft: () => {
			dispatch(rotatePlayerLeft());
		},
		rotatePlayerRight: () => {
			dispatch(rotatePlayerRight());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
