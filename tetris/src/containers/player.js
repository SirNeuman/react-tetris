import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import '../css/app.css';
import { initializeGrid } from '../actions/main';

class Player extends Component {


	render() {
		const {
			playerState
		} = this.props;

		return (null

		);
	}
}

const mapStateToProps = (state) => {
	return {
		playerState: state.Main.playerState,
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
)(Player);
