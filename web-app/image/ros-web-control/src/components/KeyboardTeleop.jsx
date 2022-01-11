import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class KeyboardTeleop extends Component {

    state = {
        connected: true,
        ros: null
    };

    url = 'ws://' + document.location.hostname + ':9090'

    constructor(props) {
        super(props);
        this.handleLoad = this.handleLoad.bind(this);
     }

     componentDidMount() {
        window.addEventListener('load', this.handleLoad);
     }
  
     componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad)
     }
  
     handleLoad() {
        this.init_connection();
     }

    init_connection(){
        var ROS = new window.ROSLIB.Ros();
 
        ROS.on("connection", () => {
            console.log("Connection established!");
            console.log(ROS);
            this.setState({connected: true});
        });

        ROS.on("error", (_error) => {
            console.log("Connection error!");
            console.log(_error);
            this.setState({connected: false});
        });

        ROS.on("close", () => {
            console.log("Connection closed!");
            this.setState({connected: false});

            //try to reconnect
            setTimeout(() => {
                try{
                    ROS.connect(this.url);
                    this.setState({connected: true});
                } catch (error){
                    console.log("Connection to ROS failed!");
                }
            }, 5000);
        });

        // Initialize the teleop.
        var teleop = new window.KEYBOARDTELEOP.Teleop({
            ros : ROS,
            topic : '/twist_mux/tab_vel'
      });

    }

    /*
    componentDidMount(){
        //this.init_connection();
    }
    */

    render(){
        return(
            <div onLoad={this.init_connection()}>
                <Alert 
                    className="text-center m-3" 
                    variant={this.state.connected ? "success" : "dangerous"}
                >
                    {this.state.connected ? "Connected!" : "Disconnected!"}
                </Alert>
            </div>
        );
    }
}

export default KeyboardTeleop;
