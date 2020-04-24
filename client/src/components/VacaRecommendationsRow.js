import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class VacaRecommendationsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		//TODO: change according to vacation rec schema
		return (
			<div className="movieResults">
				<div className="title">{this.props.title}</div>
				<div className="id">{this.props.id}</div>
				<div className="rating">{this.props.rating}</div>
				<div className="votes">{this.props.vote_count}</div>
			</div>
		);
	}
}
