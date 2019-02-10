import React, { Component } from 'react';
import { connect } from 'react-redux';

class RightMenu extends Component {

	render() {
		const {
			linesCleared,
			speedLv
		} = this.props;

		return (
			<div className="d-flex flex-column flex-1 justify-content-between align-items-end text-right">
				<div>

				</div>
				<div>
					<div className="mb-2">
						<div>SPEED LV</div>
						<div className="semibold text-lg">{speedLv}</div>
					</div>
					<div className="">
						<div>LINES</div>
						<div className="semibold text-lg">{linesCleared}</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		linesCleared: state.Main.linesCleared,
		speedLv: state.Main.speedLv
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
