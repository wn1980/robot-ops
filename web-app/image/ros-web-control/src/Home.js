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

import "./App.css";

export default function Home(){
    return(
        <div>
            <Connect/>
               
            {/** <KeyboardTeleop/> */}
            
            
            <div id="outer_camera_map">
                <div id="container_camera"><Camera/></div>
                <div id="container_map"><Map/></div>
            </div>

            <div>
                <div id="speed-label" className="text-center"></div>
                <div id="speed-slider" className="text-center"></div>
            </div>
        </div>
    );

}


