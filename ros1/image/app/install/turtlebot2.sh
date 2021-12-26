#!/usr/bin/env bash
#Based on: https://github.com/gaunthan/Turtlebot2-On-Melodic

set -e

sudo apt-get install git -y

rm -rf ~/turtlebot_ws

mkdir -p ~/turtlebot_ws/src

cd ~/turtlebot_ws/src

git clone https://github.com/turtlebot/turtlebot.git
git clone https://github.com/turtlebot/turtlebot_msgs.git
git clone https://github.com/turtlebot/turtlebot_apps.git
git clone https://github.com/turtlebot/turtlebot_simulator.git
git clone https://github.com/turtlebot/turtlebot_viz.git

#git clone https://github.com/yujinrobot/kobuki_msgs.git

git clone --single-branch --branch melodic https://github.com/yujinrobot/kobuki.git
mv kobuki/kobuki_description kobuki/kobuki_node \
  kobuki/kobuki_keyop kobuki/kobuki_safety_controller \
  kobuki/kobuki_bumper2pc ./
rm -rf kobuki

git clone --single-branch --branch melodic https://github.com/yujinrobot/kobuki_desktop.git
mv kobuki_desktop/kobuki_gazebo_plugins ./
rm -rf kobuki_desktop

git clone https://github.com/yujinrobot/yujin_ocs.git
mv  yujin_ocs/yocs_cmd_vel_mux yujin_ocs/yocs_controllers yujin_ocs/yocs_velocity_smoother ./
rm -rf yujin_ocs

git clone https://github.com/ros-drivers/linux_peripheral_interfaces.git

sudo apt-get install  -y \
  ros-${ROS_DISTRO}-kobuki-core \
  ros-${ROS_DISTRO}-kobuki-msgs \
  ros-${ROS_DISTRO}-ecl-streams \
  ros-${ROS_DISTRO}-depthimage-to-laserscan \
  ros-${ROS_DISTRO}-depth-image-proc \
  ros-${ROS_DISTRO}-gazebo-ros \
  ros-${ROS_DISTRO}-gazebo-plugins \
  ros-${ROS_DISTRO}-xacro \
  ros-${ROS_DISTRO}-robot-state-publisher \
  ros-${ROS_DISTRO}-diagnostics \
  libsensors4-dev

# make and install
cd ~/turtlebot_ws
  
source /opt/ros/${ROS_DISTRO}/setup.bash

catkin_make 

catkin_make install -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/opt/ros/${ROS_DISTRO} -DCATKIN_ENABLE_TESTING=0 

rm -rf ~/turtlebot_ws 
