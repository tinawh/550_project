import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CheapestFlightsRow extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
    		//TODO: Change back to first div
			// <div className="flightResults">
   //      		{/*TODO: Change according to SQL schema*/}
			// 	<div className="fare">{this.props.fare}</div>
			// 	<div className="is_rt">{this.props.is_rt}</div>
			// 	<div className="carrier">{this.props.carrier}</div>
			// 	<div className="rt_carrier">{this.props.rt_carrier}</div>
			// </div>
			<div className="movieResults">
				<div className="title">{this.props.title}</div>
				<div className="id">{this.props.id}</div>
				<div className="rating">{this.props.rating}</div>
				<div className="votes">{this.props.vote_count}</div>
			</div>
		);
	}
}
