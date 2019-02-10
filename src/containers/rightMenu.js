import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class RightMenu extends Component {

	render() {
		const {
			nextTetromino
		} = this.props;

		const nextTetrominoDisplay = _.map(nextTetromino, (row, rowIndex) => {
			const spaces = _.map(row, (space, colIndex) => {
				console.log('hello', space);
				return (
					<div
						key={'next-tetromino-' + rowIndex + '-' + colIndex}
						className={'tetromino-block ' + (space === 1 ? 'filled' : 'empty')}></div>
				);
			});
			return (
				<div className="d-flex flex-row w-100" key={'next-tetromino-row-' + rowIndex}>
					{spaces}
				</div>
			);
		});


		return (
			<div className="d-flex flex-column flex-1 justify-content-between align-items-start">
				<div>
					<div className="next-tetromino-container d-flex flex-column">
						{nextTetrominoDisplay}
					</div>
				</div>
				<div>
					<div>TIME</div>
					<div>SCORE</div>
					<div>HIGH SCORE</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nextTetromino: state.Main.tetrominoBag[0]
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RightMenu);
