#!/usr/bin/env bash

set -e

distro=$1

if [[ $distro == "noetic" ]]; then
    image=ros:noetic-ros-core-focal
elif [[ $distro == "melodic" ]]; then
    image=ros:melodic-ros-core-bionic
elif [[ $distro == "kinetic" ]]; then
    image=ros:kinetic-ros-core-xenial
else
  image=ros:noetic-ros-core-focal
fi

#docker network create ros-network

docker rm -f master

docker run -d \
    --restart=always \
    --init \
    --name=master \
    --network="ros-network" \
    --expose=11311 \
    -p 11311:11311 \
    $image roscore
    #--hostname=master \