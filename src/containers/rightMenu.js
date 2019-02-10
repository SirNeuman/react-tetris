import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

class RightMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTime: null
		};

		this.timer = null;
	}

	startDurationTimer = () => {
		this.timer = setInterval(() => {
			this.setState({currentTime: moment()});
		}, 1000);
	}

	componentDidMount() {
		this.setState({currentTime: moment()});
		this.startDurationTimer();
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	componentDidUpdate() {
		if (this.props.gameOver) {
			clearInterval(this.timer);
			this.timer = null;
		} else {
			if (this.timer === null) {
				this.startDurationTimer();
			}
		}
	}

	render() {
		const {
			nextTetromino,
			gameStartTime
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

		let timer = null;
		if (this.state.currentTime) {
			timer = moment().startOf('day').seconds(this.state.currentTime.diff(gameStartTime, 'seconds')).format('HH:mm:ss');
		}


		return (
			<div className="d-flex flex-column flex-1 justify-content-between align-items-start">
				<div>
					<div className="next-tetromino-container d-flex flex-column">
						{nextTetrominoDisplay}
					</div>
				</div>
				<div>
					<div>
						<div>TIME</div>
						<div className="semibold text-lg">{timer}</div>
					</div>
					<div>SCORE</div>
					<div>HIGH SCORE</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nextTetromino: state.Main.tetrominoBag[0],
		gameStartTime: state.Main.gameStartTime,
		gameOver: state.Main.gameOver
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
