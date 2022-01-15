import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class Connect extends Component {

    state = {
        connected: true,
    };

    url = 'ws://' + document.location.hostname + ':9090';

    init_connection(){
        //var _ROS = new window.ROSSingleton();
        var ROS = window._ROS;
        this.setState({connected: ROS.connectStatus});

        ROS.on('connection', function () {
            document.getElementById('status').innerHTML = 'Network: connected';
            document.getElementById('signal').className = 'fas fa-signal';
            this.setState({connected: true});
        });

        ROS.on('error', function (_error) {
            document.getElementById('status').innerHTML = 'Network: error';
            document.getElementById('signal').className = 'fas fa-exclamation-circle';
            document.getElementById('robotCamera').src = this.defaultImage;
            this.setState({connected: false});
        });

        ROS.on('close', function () {
            document.getElementById('status').innerHTML = 'Network: closed';
            document.getElementById('signal').className = 'fas fa-ban';
            document.getElementById('robotCamera').src = this.defaultImage;
            this.setState({connected: false});

            //try to reconnect
            setTimeout(() => {
                try{
                    ROS.connect(this.url);
                } catch (error){
                    console.log("Connection to ROS failed!");
                }
            }, 5000);
        });

        // Subscribe to /event to receive battery status
        var battery = new window.ROSLIB.Topic({
            ros: ROS,
            name: '/diagnostics',
            messageType: 'diagnostic_msgs/DiagnosticArray'
        });

        // Receive battery status
        battery.subscribe(function (msg) {
            if ((typeof (msg.status[0]) !== 'undefined') && (msg.status[0].hardware_id === 'Kobuki')) {
                var batteryLevel = msg.status[0].values[1].value;
                if (batteryLevel >= 60.0) {
                    document.getElementById('battery').className = 'fas fa-battery-full';
                } else if (batteryLevel <= 25.0) {
                    document.getElementById("battery").className = 'fas fa-battery-empty';
                } else {
                    document.getElementById('battery').className = 'fas fa-battery-half';
                }
            }
        });


        /*
        //var ROS = new window.ROSLIB.Ros();

        //var ROS = window.RosSingleton.getInstance();
 
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
        */
    }

    componentDidMount(){
        this.init_connection();
    }

    render(){
        return(
            <div>
                {/** 
                <Alert 
                    className="text-center m-3" 
                    variant={this.state.connected ? "success" : "danger"}
                >
                    {this.state.connected ? "Connected!" : "Disconnected!"}
                </Alert>
                */}

                <div className="row">
                    <div className="col text-center"></div>

                    <div className="col text-center">
                        <p>
                            <i id="battery" className="fas fa-ban"></i>
                        </p>
                    </div>

                    <div className="col text-center">
                        <p>
                            <small id="status"></small>
                        </p>
                    </div>

                    <div className="col text-center">
                        <p>
                            <i id="signal" className="fas fa-ban"></i>
                        </p>
                    </div>

                    <div className="col text-center"></div>
                </div>

            </div>
        );
    }
}

export default Connect;
