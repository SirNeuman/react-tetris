import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/app.css';
import Grid from './grid';
import LeftMenu from './leftMenu';
import RightMenu from './rightMenu';
import { initializeGame } from '../actions/main';

class App extends Component {
	render() {
		const {
			gameStarted
		} = this.props;

		let leftMenuComponent = null;
		let rightMenuComponent = null;
		if (gameStarted) {
			leftMenuComponent = (<LeftMenu />);
			rightMenuComponent = (<RightMenu />);
		}

		return (
			<div className="app container">
				<div className="welcome-title w-100 text-center">Tetris</div>
				<div className="row game-container">
					<div className="col d-flex flex-column">
						{leftMenuComponent}
					</div>
					<div className="col-6 col-md-4 col-lg-3 px-0">
						<Grid />
					</div>
					<div className="col d-flex flex-column">
						{rightMenuComponent}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		gameOver: state.Main.gameOver,
		gameStarted: state.Main.gameStarted
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initializeGame: () => {
			dispatch(initializeGame());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
