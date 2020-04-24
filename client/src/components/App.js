import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import BestGenres from './BestGenres';
import CheapestDest from './CheapestDest';
import CheapestFlightsTo from './CheapestFlightsTo';
import PlanIt from './PlanIt';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<CheapestDest />
							)}
						/>
						<Route
							path="/cheapestflightsto/:originCity/:destCity"
							component={CheapestFlightsTo}
						/>
						<Route
							exact
							path="/planIt"
							render={() => (
								<PlanIt />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							path="/recommendations"
							render={() => (
								<Recommendations />
							)}
						/>
						<Route
							path="/bestgenres"
							render={() => (
								<BestGenres />
							)}
						/>
						<Route
							exact
							path="/destinations"
							render={() => (
								<CheapestDest />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}