/*
var RosSingleton = (function () {
    var instance;

    function createInstance() {
      var object = new ROSLIB.Ros({
        url : 'ws://' + document.location.hostname + ':9090'
      });

      return object;
    }

    return {
      getInstance: function () {
          if (!instance) {
              instance = createInstance();
          }

          return instance;
      }
    };
  })();

var connectStatus = false;

var _ROS = window.RosSingleton.getInstance();
 
_ROS.on("connection", () => {
    console.log("RosSingleton: Connection established!");
    console.log(_ROS);
    connectStatus = true;
});

_ROS.on("error", (_error) => {
    console.log("RosSingleton: Connection error!");
    console.log(_error);
    connectStatus = false;
});

_ROS.on("close", () => {
    console.log("RosSingleton: Connection closed!");
    connectStatus = false;

    //try to reconnect
    setTimeout(() => {
        try{
            _ROS.connect('ws://' + document.location.hostname + ':9090');
        } catch (error){
            console.log("RosSingleton: Connection to ROS failed!");
        }
    }, 5000);
});
*/

class ROSSingleton {
    constructor(url='ws://' + document.location.hostname + ':9090') {
      if (ROSSingleton._instance) {
        return ROSSingleton._instance
      }
      ROSSingleton._instance = this;

      // connect to rosbridge server
      //this.connectStatus = false;

      this.ros = new ROSLIB.Ros({
          url : url
        });

      /*
      this.ros.on("connection", () => {
        console.log("ROSSingleton: Connection established!");
        console.log(this.ros);
        //this.connectStatus = true;
      });

      this.ros.on("error", (_error) => {
        console.log("ROSSingleton: Connection error!");
        console.log(_error);
        //this.connectStatus = false;
      });

      this.ros.on("close", () => {
        console.log("ROSSingleton: Connection closed!");
        console.log(this.ros);
        //this.connectStatus = false;

        //try to reconnect
        setTimeout(() => {
            try{
                this.ros.connect(url);
            } catch (error){
                console.log("ROSSingleton: Connection to ROS failed!");
            }
        }, 5000);
      });
      */

    }
  }   

  var _ROS = new ROSSingleton().ros;
