/*
import React, { Component } from "react";

class Home extends Component {

    render() {
        return(
            <div><p>Home</p></div>
        );
    }
}

export default Home;
*/

import Map from "./components/Map";
import Connect from "./components/Connect";

export default function Home(){
    return(
        <div>
            <Connect/>
            <Map/>
        </div>
    );

}


