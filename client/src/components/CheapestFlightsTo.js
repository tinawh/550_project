import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import CheapestFlightsRow from './CheapestFlightsRow';
import AirbnbRow from './AirbnbRow';

export default class CheapestFlightsTo extends React.Component {
  constructor(props) {
    super(props);
    console.log("LOADED");
    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      genres: [],
      movies: [],
      recMovies: [],
      flights: [],
      originCity: this.props.match.params.originCity,
      destCity: this.props.match.params.destCity,
      // TODO: remove prefilled values
      checkin: '07-31-18',
      checkout: '08-05-18',
      airbnbs: [],
      // TODO: update available list
      availbleAirbnbCities: ['Knowing']
    }
    this.handleCheckInChange = this.handleCheckInChange.bind(this);
    this.handleCheckOutChange = this.handleCheckOutChange.bind(this);
    this.submitDate = this.submitDate.bind(this);
  }

  handleCheckInChange(e) {
    this.setState({
      checkin: e.target.value
    });
  }

  handleCheckOutChange(e) {
    this.setState({
      checkout: e.target.value
    });
  }

  // React function that is called when the page load.
  componentDidMount() {
    console.log('MOUNTED');
    fetch("http://localhost:8081/cheapestflightsto/"+this.state.originCity+"/"+this.state.destCity,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    // TODO: restore first part
      // }).then(flightList => {
      // if (!flightList) return;
      // console.log(flightList);
      // let flightDivs = flightList.map((flight, i) =>
      // <CheapestFlightsRow fare={flight.fare} is_roundtrip={flight.is_roundtrip} outbound_carrier={flight.outbound_carrier} inbound_carrier={flight.inbound_carrier}/>
      // );

      // // Set the state of the movie list to the value returned by the HTTP response from the server.
      // this.setState({
      //   flights: flightDivs
      // });
    }).then(movieList => {
      if (!movieList) return;
      console.log(movieList);
      // Map each attribute of a person in this.state.people to an HTML element
      let movieDivs = movieList.map((movie, i) =>
      <CheapestFlightsRow title={movie.title} rating={movie.rating} vote_count={movie.vote_count}/>
      );

      // Set the state of the movie list to the value returned by the HTTP response from the server.
      this.setState({
        movies: movieDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  submitDate() {
    // Send an HTTP request to the server.
    // TODO: add CheapestDest to server
    fetch("http://localhost:8081/cheapestairbnb/"+this.state.destCity+"/"+this.state.checkin+"/"+this.state.checkout,
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
    // }).then(recommendedAirbnbList => {
    //   if (!recommendedAirbnbList) return;
    //   console.log(recommendedAirbnbList);
      // Map each attribute of a person in this.state.people to an HTML element
      // let recommendedCityDivs = recommendedAirbnbList.map((airbnb, i) =>
      //   //TODO: Change according to SQL schema
      // <AirbnbRow name={airbnb.name} host_name={airbnb.host_name} photo_url={airbnb.photo_url} total_price={airbnb.total_price}/>

      let recommendedMovieDivs = recommendedMovieList.map((movie, i) =>
      <AirbnbRow title={movie.title} id={movie.id} rating={movie.rating} vote_count={movie.vote_count}/>
      );

      // Set the state of the recommended movie list to the value returned by the HTTP response from the server.
      this.setState({
        // TODO: Change back to first line
        // airbnbs: recommendedAirbnbList
        recMovies: recommendedMovieDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }


  render() {
    if (this.state.availbleAirbnbCities.includes(this.state.destCity)){
      return (
      <div className="cheapestdest">

        <PageNavbar active="destinations" />
        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Top 10 cheapest flights from {this.state.originCity} to {this.state.destCity}</div>

            <div className="header-container">
              <div className="headers">
                <div className="header"><strong>Fare</strong></div>
                <div className="header"><strong>Roundtrip?</strong></div>
                <div className="header"><strong>Outbound Carrier</strong></div>
                <div className="header"><strong>Inbound Carrier</strong></div>
              </div>
              <div className="results-container" id="results">
        {/*TODO: Change back to first line
                {this.state.flights}*/}
                {this.state.movies}
              </div>
            </div>
            <br></br>
            <div className="h5">Looking for an Airbnb too?</div>

            <div className="header-container">
                <div className="input-container">
                <div className="h6">Check-in Date</div>
                <input type='text' placeholder="e.g. 07-31-18" value={this.state.checkin} onChange={this.handleCheckInChange} id="checkinDate"/>
                <p/>
                <div className="h6">Check-out Date</div>
                <input type='text' placeholder="e.g. 08-05-18" value={this.state.checkout} onChange={this.handleCheckOutChange} id="checkoutDate"/>
                </div>
            </div>
            <p/>
                <button id="submitDateBtn" className="submit-btn" onClick={this.submitDate}>Submit</button>

                <div className="header-container">
                <div className="headers">
        {/*TODO: Change according to SQL schema*/} 
              <div className="headerCity"><strong>Property Name</strong></div>
                  <div className="headerCity"><strong>Host Name</strong></div>
                  <div className="headerCity"><strong>Photo URL</strong></div>
                  <div className="headerCity"><strong>Total Price</strong></div>
                  </div>
                  </div>
                  <div className="results-container" id="results">
        {/*TODO: Change back to first row*/} 
          {/*{this.state.airbnbs}*/}
                {this.state.recMovies}
              </div>
            </div>
            </div>
      </div>
    );
  } else{
    return (
      <div className="cheapestdest">

        <PageNavbar active="destinations" />
        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Top 10 cheapest flights from {this.state.originCity} to {this.state.destCity}</div>

            <div className="header-container">
              <div className="headers">
                <div className="header"><strong>Fare</strong></div>
                <div className="header"><strong>Roundtrip?</strong></div>
                <div className="header"><strong>Outbound Carrier</strong></div>
                <div className="header"><strong>Inbound Carrier</strong></div>
              </div>
              <div className="results-container" id="results">
        {/*TODO: Change back to first line
                {this.state.flights}*/}
                {this.state.movies}
              </div>
            </div>
            <br></br>
            <div className="h5">Sorry! Airbnb data is not available in this city.</div>


      </div>
      </div>
      </div>
    );
    
  }
  }
}