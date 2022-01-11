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
    console.log("Connection established!");
    console.log(_ROS);
    connectStatus = true;
});

_ROS.on("error", (_error) => {
    console.log("Connection error!");
    console.log(_error);
    connectStatus = false;
});

_ROS.on("close", () => {
    console.log("Connection closed!");
    connectStatus = false;

    //try to reconnect
    setTimeout(() => {
        try{
            _ROS.connect('ws://' + document.location.hostname + ':9090');
        } catch (error){
            console.log("Connection to ROS failed!");
        }
    }, 5000);
});
