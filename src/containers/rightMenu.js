import React, { Component } from 'react';
import { connect } from 'react-redux';

class RightMenu extends Component {

	render() {
		return (
			<div className="d-flex flex-column flex-1 justify-content-between align-items-start">
				<div>
					Next Item
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
