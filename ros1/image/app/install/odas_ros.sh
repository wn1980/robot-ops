#!/usr/bin/env bash

set -e

cd $HOME/catkin_ws/src && \
git clone https://github.com/introlab/audio_utils.git && \
cd audio_utils && \
git submodule update --init --recursive

cd $HOME/catkin_ws/src && \
git clone https://github.com/introlab/odas_ros.git && \
cd odas_ros && \
git submodule update --init --recursive

source /opt/ros/$ROS_DISTRO/setup.bash && \
cd $HOME/catkin_ws && \
catkin_make