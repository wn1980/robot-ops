FROM ros:noetic-ros-core-focal
#FROM ros:melodic-ros-core-bionic

LABEL maintainer="Waipot Ngamsaad <waipotn@hotmail.com>"

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND noninteractive

RUN  apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

RUN sed -i -e 's/http:\/\/archive/mirror:\/\/mirrors/' -e 's/http:\/\/security/mirror:\/\/mirrors/' -e 's/\/ubuntu\//\/mirrors.txt/' /etc/apt/sources.list

RUN apt-get update --fix-missing && apt-get upgrade -y
RUN	apt-get install -y \ 
	ros-${ROS_DISTRO}-joy \
	ros-${ROS_DISTRO}-teleop-twist-joy \
	#ros-${ROS_DISTRO}-twist-mux \
	#ros-${ROS_DISTRO}-twist-mux-msgs \
	#ros-${ROS_DISTRO}-joystick-drivers \
	#ros-${ROS_DISTRO}-ps3joy \
	#ros-${ROS_DISTRO}-wiimote \
	joystick \
	&& apt-get autoremove -y \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

COPY ./joystick.launch ./holonomic.config.yaml /

#RUN usermod -aG dialout root && \
#	usermod -aG plugdev root && \
#	usermod -aG input root

CMD ["roslaunch", "--wait", "joystick.launch"]
