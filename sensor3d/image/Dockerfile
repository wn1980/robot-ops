FROM ros:noetic-perception-focal
#FROM ros:noetic-ros-core-focal
#FROM ros:melodic-ros-core-bionic

LABEL maintainer="Waipot Ngamsaad <waipotn@hotmail.com>"

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND noninteractive

RUN  apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

RUN sed -i -e 's/http:\/\/archive/mirror:\/\/mirrors/' -e 's/http:\/\/security/mirror:\/\/mirrors/' -e 's/\/ubuntu\//\/mirrors.txt/' /etc/apt/sources.list

RUN apt-get update --fix-missing && apt-get upgrade -y
RUN	apt-get install -y \ 
	ros-${ROS_DISTRO}-openni2-launch \
	ros-${ROS_DISTRO}-openni2-camera \
	ros-${ROS_DISTRO}-depthimage-to-laserscan \
	ros-${ROS_DISTRO}-image-transport-plugins \
	&& apt-get autoremove -y \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

COPY ./sensor3d.launch /

CMD ["roslaunch", "--wait", "sensor3d.launch"]
