import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startGame } from '../actions/main';

class RestartMenu extends Component {

	handleKeyPress = (e) => {
		const code = e.keyCode;
		if (code === 13) {
			this.props.startGame();
		}
	}

	componentDidMount() {
		document.addEventListener('keypress', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keypress', this.handleKeyPress);
	}

	render() {
		return (
			<div className="text-center p-2 menu">
				<div>GAME OVER</div>
				<div>Press "ENTER" to Restart</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		startGame: () => {
			dispatch(startGame());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RestartMenu);