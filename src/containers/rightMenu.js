import React, { Component } from 'react';
import { connect } from 'react-redux';

class RightMenu extends Component {

	render() {
		return (
			<div className="side-menu">
				<div>
					Next Item
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
