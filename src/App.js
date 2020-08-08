import React from 'react';
import Navigator from './Navigator'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles.css';
import WeatherComp from './WeatherComp'
import ErrorBoundary from "./ErrorBoundary";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cityName : ""
        }
    }
    render() {
        return (
            <div className="App">

                {/*<button onClick={minusOperator}>-</button>
            <h2 id={"num"}>0</h2>
            <button onClick={plusOperator}>+</button>*/}
                {Navigator}
                <ErrorBoundary>
                <WeatherComp />
                </ErrorBoundary>


            </div>
        );
    }
}

export default App;
