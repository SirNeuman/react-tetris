import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import '../css/app.css';
import { initializeGrid } from '../actions/main';
import Player from './player';

class Grid extends Component {



	render() {
		const {
			gridState,
			gameReady
		} = this.props;

		console.log(gridState);
		if (!gameReady) {
			return (
				<div>LOADING...</div>
			)
		}
		const grid = _.map(gridState, (row, rowIdx) => {
			const spaces = _.map(row, (space, spaceIdx) => {
				return (
					<div
						key={'grid-space-' + rowIdx + '-' + spaceIdx}
						className={'flex-1 grid-space ' + (space === true ? 'filled' : 'empty') }></div>
				);
			})
			return (
				<div key={'grid-row-' + rowIdx} className="d-flex flex-row flex-1">
					{spaces}
				</div>
			)
		});

		return (
			<div className="grid-container">
				<div className="grid d-flex flex-column">
					<Player />
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
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);