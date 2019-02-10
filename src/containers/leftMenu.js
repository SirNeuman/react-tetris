import React, { Component } from 'react';
import { connect } from 'react-redux';

class RightMenu extends Component {

	render() {
		return (
			<div className="d-flex flex-column flex-1 justify-content-between align-items-end text-right">
				<div>

				</div>
				<div>
					<div className="mb-4">
						SPEED LV
					</div>
					<div className="">
						LINES
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
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RightMenu);
