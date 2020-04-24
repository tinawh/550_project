import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AirbnbRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
    		//TODO: Change back to first div
			// <div className="cityResults">
   //      		{/*TODO: Change according to SQL schema*/} 
			// 	<div className="name">
			// 	<a className="nav-item nav-link" href={"/cheapestflightsto/" + this.props.name}>{this.props.name}</a></div>
			// 	</div>
			// 	<div className="fare">{this.props.fare}</div>
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
