#!/usr/bin/env bash

set -e

############# DON'T REMOVE ############
source /opt/ros/$ROS_DISTRO/setup.bash
#######################################

#roslaunch turtlebot_bringup minimal.launch &

#roslaunch turtlebot_bringup 3dsensor.launch &

###### DON'T REMOVE ######
# run forever
tail -f /dev/null
