import React, { Component } from 'react';
import { connect } from 'react-redux';

class RightMenu extends Component {

	render() {
		return (
			<div className="side-menu d-flex flex-column flex-1 justify-content-between align-items-end">
				<div>

				</div>
				<div>
					<div>
						SPEED LV
					</div>
					<div>
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
