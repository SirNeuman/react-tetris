import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/app.css';
import { initializeGrid } from '../actions/main';

class Grid extends Component {

	componentDidMount() {
		this.props.initializeGrid();
	}

	render() {
		return (
			<div className="board">

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
		initializeGrid: () => {
			dispatch(initializeGrid());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
