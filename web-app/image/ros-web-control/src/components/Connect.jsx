import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class Connect extends Component {

    state = {
        connected: true,
        ros: null
    };

    url = 'ws://' + document.location.hostname + ':9090'

    init_connection(){
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("Connection established!");
            this.setState({connected: true});
        });


        this.state.ros.on("close", () => {
            console.log("Connection closed!");
            this.setState({connected: false});

            //try to reconnect
            setTimeout(() => {
                try{
                    this.state.ros.connect(this.url);
                } catch (error){
                    console.log("Connection to ROS failed!");
                }
            }, 5000);
        });

    }

    componentDidMount(){
        this.init_connection();
    }

    render(){
        return(
            <div>
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

export default Connect;
