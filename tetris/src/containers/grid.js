import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import '../css/app.css';
import { initializeGrid } from '../actions/main';

class Grid extends Component {

	componentDidMount() {
		this.props.initializeGrid();
	}

	render() {
		const {
			gridState
		} = this.props;

		console.log(gridState);
		let grid = null;
		if (_.size(gridState) > 1) {
			grid = _.map(gridState, (row, rowIdx) => {
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
			})
		}

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
		gridState: state.Main.gridState
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
