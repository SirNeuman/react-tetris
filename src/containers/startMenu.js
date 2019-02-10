import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startGame } from '../actions/main';

class StartMenu extends Component {

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
			<div className="menu no-border text-center text-lg p-2 text-primary">
				Press "ENTER" to Start
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
)(StartMenu);