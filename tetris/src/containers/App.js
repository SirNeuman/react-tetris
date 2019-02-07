import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/app.css';
import Grid from './grid'

class App extends Component {
	render() {
		return (
			<div className="app container">
				<div className="welcome-title w-100 text-center">Tetris</div>
				<div className="row game-container">
					<div className="col"></div>
					<div className="col-3">
						<Grid/>
					</div>
					<div className="col"></div>
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
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
