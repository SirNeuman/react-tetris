import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/app.css';
import Grid from './grid';
import LeftMenu from './leftMenu';
import RightMenu from './rightMenu';
import { initializeGame } from '../actions/main';

class App extends Component {

	componentDidMount() {
		this.props.initializeGame();
	}

	render() {
		return (
			<div className="app container">
				<div className="welcome-title w-100 text-center">Tetris</div>
				<div className="row game-container">
					<div className="col d-flex flex-column">
						<LeftMenu />
					</div>
					<div className="col-6 col-md-4 col-lg-3 px-0">
						<Grid />
					</div>
					<div className="col d-flex flex-column">
						<RightMenu />
					</div>
				</div>
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
		initializeGame: () => {
			dispatch(initializeGame());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
