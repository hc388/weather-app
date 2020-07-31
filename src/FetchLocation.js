import React from "react";

class FetchLocation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            latitude: this.props.lat,
            longitude: this.props.long
        }

    }

    componentDidMount() {
        console.log("LAt and long: ",this.state.longitude, this.state.latitude)
        fetch("https://maps.googleapis.com/maps/api/geocode/json?"+this.props.lat+" "+this.props.long+"&key=AIzaSyCYZkaeVMNqESomLAQEnR2CH3l9JBHOalE")
            .then(response => response.json())
            .then(data => {
                console.log("The location from lat and long is: ", data)
            })
    }


    render() {
        return (
            <div>

            </div>
        );
    }


}

export default FetchLocation;