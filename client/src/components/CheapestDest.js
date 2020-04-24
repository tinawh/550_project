import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import DestRecommendationsRow from './DestRecommendationsRow';

export default class CheapestDest extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      recMovies: [],
      originCity: "", //TODO: replace with warning if city doesn't exist
      originCityUndefined: false,
      year: undefined,
      quarter: undefined,
      destCities: [],
    }

    this.handleOriginCityNameChange = this.handleOriginCityNameChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleQuarterChange = this.handleQuarterChange.bind(this);
    this.submitCityYearQuarter = this.submitCityYearQuarter.bind(this);

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

  submitCityYearQuarter() {
    // Send an HTTP request to the server.
    // TODO: add CheapestDest to server
    if (this.state.originCity != ""){
        this.setState({
          originCityUndefined: false
        });
        fetch("http://localhost:8081/destinations/"+this.state.originCity,
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
      // }).then(recommendedCityList => {
      //   if (!recommendedCityList) return;
      //   console.log(recommendedCityList);
        // Map each attribute of a person in this.state.people to an HTML element
        // let recommendedCityDivs = recommendedCityList.map((city, i) =>
        //   //TODO: Change according to SQL schema
        // <DestRecommendationsRow name={city.name} avg_fare={city.avg_fare}/>

        let recommendedMovieDivs = recommendedMovieList.map((movie, i) =>
        <DestRecommendationsRow title={movie.title} id={movie.id} rating={movie.rating} vote_count={movie.vote_count}/>
        );

        // Set the state of the recommended movie list to the value returned by the HTTP response from the server.
        this.setState({
          // TODO: Change back to first line
          // destCities: recommendedCityDivs
          recMovies: recommendedMovieDivs
        });
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
    } else{
      this.setState({
        originCityUndefined: true
      });
    }
    
  }

  

  
  render() {    
    if (this.state.originCityUndefined){
      return (
      <div className="CheapestDest">

        <PageNavbar active="destinations" />
        <br></br>
        <div className="container recommendations-container">
            <div className="jumbotron">
              <div className="h5">Let's find the cheeeeaaapst vacation you could've been on!</div>
              <br></br>
              <div className="header-container">
                <div className="h6">Enter city name</div>
                </div>
              <div className="input-container">
                <input type='text' placeholder="e.g. New York City" value={this.state.originCity} onChange={this.handleOriginCityNameChange} id="cityName" className="movie-input"/>
                </div>
                <div className="h6"><p>You must enter a city!</p></div>
                <p/>
              <div className="header-container">
                <div className="h6">Enter year</div>
                </div>
                <div className="input-container">
                <input type='text' placeholder="e.g. 2017" value={this.state.year} onChange={this.handleYearChange} id="year" className="movie-input"/>
                </div>
                <p/>
              <div className="header-container">
                <div className="h6">Enter quarter</div>
                </div>
                <div className="input-container">
                <input type='text' placeholder="e.g. 2" value={this.state.quarter} onChange={this.handleQuarterChange} id="quarter" className="movie-input"/>
                </div>
                <p/>
                <button id="submitCityBtn" className="submit-btn" onClick={this.submitCityYearQuarter}>Submit</button>
              
              <div className="header-container">
                <div className="headers">
            <br></br>
        {/*TODO: Change according to SQL schema*/} 
                  <div className="headerCity"><strong>Destination</strong></div>
                  <div className="headerCity"><strong>Average Fare</strong></div>
                </div>
              </div>
              <div className="results-container" id="results">
        {/*TODO: Change back to destCities*/} 
          {/*{this.state.destCities}*/}
                {this.state.recMovies}
              </div>
            </div>
          </div>


      </div>
    );
    }
    return (
      <div className="CheapestDest">

        <PageNavbar active="Cheapest Destination From You" />
        <br></br>
        <div className="container recommendations-container">
            <div className="jumbotron">
              <div className="h5">Let's find the cheeeeaaapst vacation you could've been on!</div>
              <br></br>
              <div className="header-container">
                <div className="h6">Enter city name</div>
                </div>
              <div className="input-container">
                <input type='text' placeholder="e.g. New York City" value={this.state.originCity} onChange={this.handleOriginCityNameChange} id="cityName" className="movie-input"/>
                </div>
                <p/>
              <div className="header-container">
                <div className="h6">Enter year</div>
                </div>
                <div className="input-container">
                <input type='text' placeholder="e.g. 2017" value={this.state.year} onChange={this.handleYearChange} id="year" className="movie-input"/>
                </div>
                <p/>
              <div className="header-container">
                <div className="h6">Enter quarter</div>
                </div>
                <div className="input-container">
                <input type='text' placeholder="e.g. 2" value={this.state.quarter} onChange={this.handleQuarterChange} id="quarter" className="movie-input"/>
                </div>
                <p/>
                <button id="submitCityBtn" className="submit-btn" onClick={this.submitCityYearQuarter}>Submit</button>
              
              <div className="header-container">
                <div className="headers">
            <br></br>
        {/*TODO: Change according to SQL schema*/} 
                  <div className="headerCity"><strong>Destination</strong></div>
                  <div className="headerCity"><strong>Average Fare</strong></div>
                </div>
              </div>
              <div className="results-container" id="results">
        {/*TODO: Change back to destCities*/} 
          {/*{this.state.destCities}*/}
                {this.state.recMovies}
              </div>
            </div>
          </div>


      </div>
    );
  }
}