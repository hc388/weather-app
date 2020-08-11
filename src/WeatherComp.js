import React from "react";
import SearchLocationInput from "./autoComplete";
import Form from "./Form";
import BodyHead from "./BodyHead";
import ApiCall from "./apiCall";
import FetchLocation from "./FetchLocation";
import ErrorBoundary from "./ErrorBoundary";

class WeatherComp extends React.Component {

  constructor() {
    super();
    this.state = {
      location: "",
      temp: "",
      desc: "",
      iconUrl: "",
      dataObj: "",
      geoLocation: true,
      isLoading: true,
      loadingFail: false,
      loadData: ""
    };
    this.handleRejection = this.handleRejection.bind(this);
    this.updateApiStatus = this.updateApiStatus.bind(this);
  }

  componentDidMount() {

    let currentComponent = this;
    currentComponent.setState({ isLoading: false });
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      let URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyCI3Rpo_03gKdVow10kkbQMSeIpzFSB89c";
      console.log(URL);
      fetch(URL)
        .then(response => response.json())
        .then(data => {
          console.log("The location from lat and long is: ", data);
          let cityData = data.results[5].address_components[1].long_name;
          currentComponent.setState({
            location: cityData,
            isLoading: true

          });


        });


    }, this.handleRejection);

  }

  handleRejection = () => {
    this.setState({
      geoLocation: false,
      isLoading: true
    });

  };


  getCity = fields => {
    console.log("App component got the city: ", fields);
    this.setState(
      { location: fields }
    );
  };

  getNewCity = fields => {
    console.log("App component got the obj: ", fields);
    this.getCity(fields.address_components[0].long_name);
  };

  updateApiStatus = fields => {
    this.setState(
      {
        loadingFail: fields
      }
    );
  };

  retrieveData = dataObj => {
    console.log("The api object inside main is: ", dataObj);
    this.setState(
      {
        location: dataObj.location,
        temp: dataObj.temp,
        desc: dataObj.desc,
        iconUrl: dataObj.iconUrl
      }
    );
  };


  render() {
    const geoStatus = this.state.geoLocation;
    const loadStatus = this.state.isLoading;
    return (
      <div>
        <BodyHead/>
        <div className="parentContainer">

          <div className="container1" style={{ paddingTop: "20px" }}>
            <div className="geoType">
              {!loadStatus && <div> Please allow location access in order to access this feature. </div>}

              {geoStatus && console.log("Yep the services are onnnn.")}
              {geoStatus ? <FetchLocation lat={this.state.latitude} long={this.state.longitude}/> :
                <h3>Please Enable Location Services</h3>}

              {(!loadStatus && this.state.temp === "") &&
              <div><h4 style={{ paddingTop: "90px" }}>Fetching weather for your location...</h4></div>}

              <div>
                <h2 className="city">{this.state.location}</h2>
                <div className="middle">
                  <img src={this.state.iconUrl} alt={this.state.iconUrl} id="icon" height="50px"/>
                  {console.log(this.state.iconUrl)}
                  <div className="degrees">
                    <h1 id="temp">{this.state.temp}</h1>
                    <span>&#176;</span>
                  </div>
                  <h3 id="desc" style={{ fontWeight: "lighter" }}>{this.state.desc}</h3>
                </div>
              </div>
            </div>
            {/*<Form getCity={fields => this.getCity(fields)}/>*/}
            <ErrorBoundary>
              <br/> <br/>
              <SearchLocationInput getNewCity={fields => this.getNewCity(fields)}
                                   updateApiStatus={fields => this.updateApiStatus(fields)}/>
            </ErrorBoundary>
            {
              (this.state.location !== "") &&
              <ApiCall city={this.state.location} key={this.state.location}
                       retrieveData={dataObj => this.retrieveData(dataObj)}/>

            }

          </div>
        </div>
      </div>

    );
  }
}

export default WeatherComp;