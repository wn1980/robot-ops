import React, { Component } from "react";

class Map extends Component {
    state = {
        ros: null
    }

    init() {
        // Connect to ROS.
        /*
        var ros = new window.ROSLIB.Ros({
          //url: 'ws://rk3399.local:9090',
          url: 'ws://' + document.location.hostname + ':9090'
        });
        */
    
        // Create the main viewer.
        var viewer = new window.ROS2D.Viewer({
          divID: 'nav',
          width: 200,
          height: 100,
        });
    
        // Setup the nav client.
        var nav = window.NAV2D.OccupancyGridClientNav({
          ros : window._ROS,
          rootObject : viewer.scene,
          viewer : viewer,
          serverName : '/move_base',
          withOrientation: true,
        });
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return(
            <div id="nav"/>
        );
    }
}

export default Map;
