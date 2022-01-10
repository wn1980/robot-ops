import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class Connect extends Component {

    state = {
        connected: false,
    };

    url = 'ws://' + document.location.hostname + ':9090'

    init_connection(){
        var ros = new window.ROSLIB.Ros();
        console.log(ros);

        ros.on("connection", () => {
            console.log("Connection established!");
            this.setState({connected: true});
        });

        ros.on("close", () => {
            console.log("Connection closed!");
            this.setState({connected: false});

            //try to reconnect
            setTimeout(() => {
                try{
                    ros.connect(this.url);
                    this.setState({connected: true});
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
                    variant={this.state.connected ? "success" : "danger"}
                >
                    {this.state.connected ? "Connected!" : "Disconnected!"}
                </Alert>
            </div>
        );
    }
}

export default Connect;
