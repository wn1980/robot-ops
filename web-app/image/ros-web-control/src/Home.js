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
import Camera from "./components/Camera";
//import KeyboardTeleop from "./components/KeyboardTeleop";

export default function Home(){
    return(
        <div>
            <Connect/>
            <Camera/>
            
            {/** <KeyboardTeleop/> */}
            
            <Map/>
        </div>
    );

}


