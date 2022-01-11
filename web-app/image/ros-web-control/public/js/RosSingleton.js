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

  var ROS = window.RosSingleton.getInstance();
 
  ROS.on("connection", () => {
      console.log("Connection established!");
      console.log(ROS);
      connectStatus = true;
  });

  ROS.on("error", (_error) => {
      console.log("Connection error!");
      console.log(_error);
      connectStatus = false;
  });

  ROS.on("close", () => {
      console.log("Connection closed!");
      connectStatus = false;

      //try to reconnect
      setTimeout(() => {
          try{
              ROS.connect('ws://' + document.location.hostname + ':9090');
          } catch (error){
              console.log("Connection to ROS failed!");
          }
      }, 5000);
  });
