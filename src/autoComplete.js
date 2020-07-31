import React, {useState, useEffect, useRef} from "react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";

let autoComplete;


const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef, props) {
    autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        {}
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
        handlePlaceSelect(updateQuery, props)
    );
}

async function handlePlaceSelect(updateQuery, props) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.address_components[0].long_name;
    updateQuery(query);
    console.log("obj", addressObject);
    props.getNewCity(addressObject)

}
function onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
        console.log("Enter key was pressed here!!!!!!!!!!!!!!!!!!!")
        event.preventDefault();
    }
}


function SearchLocationInput(props) {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyCYZkaeVMNqESomLAQEnR2CH3l9JBHOalE&libraries=places`,
            () => handleScriptLoad(setQuery, autoCompleteRef, props)
        );
    }, []);

    return (
        <div>
            <div className="search-location-input" style={{margin: "auto"}}>
                <input
                    ref={autoCompleteRef}
                    onChange={event => setQuery(event.target.value)}
                    onClick={event => console.log("The clicked event is: ", event.target.value)}
                    placeholder="Enter a City"
                    value={query}
                    onKeyPress={onKeyPress}
                />
            </div>
            <div>
                <small>We'll soon include GeoLocation features.</small><br/>
            </div>
        </div>
    );

}

export default SearchLocationInput;