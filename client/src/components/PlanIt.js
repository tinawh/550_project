import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import VacaRecommendationsRow from './VacaRecommendationsRow';

export default class PlanIt extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      recMovies: [],
      recVacation: [],
      originCity: "Inception", //TODO: replace and add warning if city doesn't exist
      destCity: "Inception", //TODO: replace and add warning if city doesn't exist
      year: undefined,
      quarter: undefined,
      minFlightBudget: undefined,
      maxFlightBudget: undefined,
      minAirbnbBudget: undefined,
      maxAirbnbBudget: undefined,
      destCities: []
    }

    this.handleOriginCityNameChange = this.handleOriginCityNameChange.bind(this);
    this.handleDestCityNameChange = this.handleDestCityNameChange.bind(this);

    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleQuarterChange = this.handleQuarterChange.bind(this);

    this.handleMinFlightBudgetChange = this.handleMinFlightBudgetChange.bind(this);
    this.handleMaxFlightBudgetChange = this.handleMaxFlightBudgetChange.bind(this);

    this.handleMinAirbnbBudgetChange = this.handleMinAirbnbBudgetChange.bind(this);
    this.handleMaxAirbnbBudgetChange = this.handleMaxAirbnbBudgetChange.bind(this);

    this.submitButton = this.submitButton.bind(this);

  }

  handleYearChange(e) {
    this.setState({
      year: e.target.value
    });
  }

  handleQuarterChange(e) {
    this.setState({
      quarter: e.target.value
    });
  }

  handleOriginCityNameChange(e) {
    this.setState({
      originCity: e.target.value
    });
  }

  handleDestCityNameChange(e) {
    this.setState({
      destCity: e.target.value
    });
  }

    handleMinFlightBudgetChange(e) {
    this.setState({
      minFlightBudget: e.target.value
    });
  }

  handleMaxFlightBudgetChange(e) {
    this.setState({
      maxFlightBudget: e.target.value
    });
  }

  handleMinAirbnbBudgetChange(e) {
    this.setState({
      minAirbnbBudget: e.target.value
    });
  }

  handleMaxAirbnbBudgetChange(e) {
    this.setState({
      maxAirbnbBudget: e.target.value
    });
  }

  submitButton() {
    // Send an HTTP request to the server.
    // TODO: add CheapestDest to server
    fetch("http://localhost:8081/planit/"+this.state.originCity+"/"+this.state.destCity+"/"+this.state.year+"/"+this.state.quarter
      +"/"+this.state.minFlightBudget+"/"+this.state.maxFlightBudget+"/"+this.state.minAirbnbBudget+"/"+this.state.maxAirbnbBudget,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(recommendedMovieList => {
      if (!recommendedMovieList) return;
      console.log(recommendedMovieList);
      // TODO: change back to first 8 lines
    // }).then(recommendedVacaList => {
    //   if (!recommendedVacaList) return;
    //   console.log(recommendedVacaList);
      // Map each attribute of a person in this.state.people to an HTML element
      // let recommendedVacaDivs = recommendedVacaList.map((city, i) =>
      //   //TODO: Change according to SQL schema
      // <VacaRecommendationsRow name={city.name} avg_fare={city.avg_fare}/>

      let recommendedMovieDivs = recommendedMovieList.map((movie, i) =>
      <VacaRecommendationsRow title={movie.title} id={movie.id} rating={movie.rating} vote_count={movie.vote_count}/>
      );

      // Set the state of the recommended movie list to the value returned by the HTTP response from the server.
      this.setState({
        // TODO: Change back to first line
        // recVacation: recommendedVacaDivs
        recMovies: recommendedMovieDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  

  
  render() {    
    return (
      <div className="CheapestDest">

        <PageNavbar active="planIt" />
        <br></br>
        <div className="container recommendations-container">
            <div className="jumbotron">
              <div className="h5">Find the cheapest package</div>
              <br></br>

              <div className="header-container">
                <div className="h6">Origin</div>
                </div>
              <div className="input-container">
                <input type='text' placeholder="e.g. New York City" value={this.state.originCity} onChange={this.handleOriginCityNameChange} id="originCityName" className="movie-input"/>
                </div>
                <p/>

              <div className="input-container">
                <div className="h6">Destination</div>
                </div>
              <div className="input-container">
                <input type='text' placeholder="e.g. Boston" value={this.state.destCity} onChange={this.handleDestCityNameChange} id="destCityName" className="movie-input"/>
                </div>
                <p/>

              <div className="header-container">
                <div className="h6">Year</div>
                </div>
                <div className="input-container">
                <input type='text' placeholder="e.g. 2017" value={this.state.year} onChange={this.handleYearChange} id="year" className="movie-input"/>
                </div>
                <p/>

              <div className="header-container">
                <div className="h6">Quarter</div>
                </div>
                <div className="input-container">
                <input type='text' placeholder="e.g. 2" value={this.state.quarter} onChange={this.handleQuarterChange} id="quarter" className="movie-input"/>
                </div>
                <p/>

                <div className="header-container">
                <div className="h6">Min Flight Budget</div>
                </div>
                <div className="input-container">
                <input type='text' placeholder="e.g. 100" value={this.state.minFlightBudget} onChange={this.handleMinFlightBudgetChange} id="minflightbudget" className="movie-input"/>
                </div>
                <p/>

                <div className="header-container">
                <div className="h6">Max Flight Budget</div>
                </div>
                <div className="input-container">
                <input type='text' placeholder="e.g. 1000" value={this.state.maxFlightBudget} onChange={this.handleMaxFlightBudgetChange} id="maxflightbudget" className="movie-input"/>
                </div>
                <p/>

                <div className="header-container">
                <div className="h6">Min Airbnb Budget</div>
                </div>
                <div className="input-container">
                <input type='text' placeholder="e.g. 100" value={this.state.minAirbnbBudget} onChange={this.handleMinAirbnbBudgetChange} id="minairbnbbudget" className="movie-input"/>
                </div>
                <p/>

                <div className="header-container">
                <div className="h6">Max Airbnb Budget</div>
                </div>
                <div className="input-container">
                <input type='text' placeholder="e.g. 1000" value={this.state.maxAirbnbBudget} onChange={this.handleMaxAirbnbBudgetChange} id="maxairbnbbudget" className="movie-input"/>
                </div>
                <p/>


                <button id="submitButton" className="submit-btn" onClick={this.submitButton}>Submit</button>
              <br></br>
              <div className="h5">Here's your dream vacation</div>
              <div className="header-container">
                <div className="headers">
            <br></br>
        {/*TODO: Change according to SQL schema*/} 
                  <div className="headerCity"><strong>Carrier</strong></div>
                  <div className="headerCity"><strong>Return Carrier</strong></div>
                  <div className="headerCity"><strong>Airbnb Type</strong></div>
                  <div className="headerCity"><strong>Photo URL</strong></div>
                  <div className="headerCity"><strong>Flight Fare</strong></div>
                  <div className="headerCity"><strong>Airbnb Fare</strong></div>
                  <div className="headerCity"><strong>Total Fare</strong></div>
                </div>
              </div>
              <div className="results-container" id="results">
        {/*TODO: Change back to destCities*/} 
          {/*{this.state.recVacation}*/}
                {this.state.recMovies}
              </div>
            </div>
          </div>


      </div>
    );
  }
}