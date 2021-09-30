import React from "react";

class ApiCall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            temp: "",
            desc: "",
            iconUrl: ""
        }
        this.requestWeather = this.requestWeather.bind(this)
        this.updatesDOM = this.updatesDOM.bind(this)
    }

    requestWeather(location) {
        document.title = "Weather Today in " + location;
        console.log("WEATHER TODAY IN : ", location)
        let URL = "https://api.openweathermap.org/data/2.5/weather?q=" + this.state.location + "&units=imperial&apikey=8b7577d7723ec100328f966bbf6fd7fc";
        fetch(URL)
            .then(response => response.json())
            .then((data) => {
                this.updatesDOM(data)
            })
    }

    updatesDOM(data) {

        console.log("THE OBJECT IS:::::", data);
        if (data.cod !== "400") {

            let icontemp = data.weather[0].icon
            let finalIconUrl = "http://openweathermap.org/img/w/" + icontemp + ".png";
            this.setState({
                location: data.name,
                temp: Math.round(data.main.temp),
                desc: data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1),
                iconUrl: finalIconUrl
            })
            this.props.retrieveData(this.state)
        }

    }

    static getDerivedStateFromProps(props, state) {
        if (props.city !== state.location) {
            return {
                location: props.city,
            };
        }

        // Return null if the state hasn't changed
        return null;
    }

     componentDidMount()
     {
         /*if(this.props.city !== this.state.location) {
             console.log("came in here")
             this.setState({
                     location: this.props.city
                 }
             )*/
             console.log("I also got the city", this.props.city)
             console.log("I'm setting the city " + this.props.city + " to the state as: " + this.state.location)
             fetch("https://api.openweathermap.org/data/2.5/weather?q=" + this.state.location + "&units=imperial&apikey=637e3c2f05207c3a2db1deebc503f4a0")
                 .then(response => response.json())
                 .then((data) => {
                     console.log(data)
                     this.updatesDOM(data)

                 })






         }


    /*if(this.state.location !== this.props.city) {
        /!*this.setState({
                location: this.props.city
            }
        )*!/
        console.log("I'm setting the city "+this.props.city+ "to the state as: "+this.state.location)
        if(this.state.location !== undefined ) {
            console.log("I'm passing the following location: ", this.state.location)
            this.requestWeather(this.state.location)
        }
    }*/

    render() {


        console.log("I got the city: "+ this.props.city+" and I'm gonna set it to: "+this.state.location)
        /*if(this.props.city !== this.state.location)
            this.setState(
                {
                    location: this.props.city
                }
            )*/

        return (
            <div>

                {console.log("APICALL just RAN with the city name: ", this.state.location)}
            </div>
        )
    }
}

export default ApiCall;