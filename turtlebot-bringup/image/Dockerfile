FROM ros:kinetic-ros-core-xenial

LABEL maintainer="Waipot Ngamsaad <waipotn@hotmail.com>"

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND noninteractive

RUN apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

RUN sed -i -e 's/http:\/\/archive/mirror:\/\/mirrors/' -e 's/http:\/\/security/mirror:\/\/mirrors/' -e 's/\/ubuntu\//\/mirrors.txt/' /etc/apt/sources.list

RUN apt-get update --fix-missing && apt-get upgrade -y 
RUN apt-get install -y \ 
	ros-$ROS_DISTRO-linux-peripheral-interfaces \
	ros-$ROS_DISTRO-kobuki-core \
	ros-$ROS_DISTRO-kobuki-msgs \
	ros-$ROS_DISTRO-kobuki-node \
	ros-$ROS_DISTRO-kobuki-safety-controller \
	ros-$ROS_DISTRO-kobuki-bumper2pc \
	ros-$ROS_DISTRO-kobuki-auto-docking \
	ros-$ROS_DISTRO-yocs-cmd-vel-mux \
	ros-$ROS_DISTRO-yocs-velocity-smoother \
	ros-$ROS_DISTRO-turtlebot-bringup \
	ros-$ROS_DISTRO-hector-trajectory-server \
	git \
	python-rosdep \
	build-essential \
	&& apt-get autoremove -y \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

RUN apt-get purge -y \ 
	git \
	&& apt-get autoremove -y \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

RUN rosdep init && rosdep update

RUN mkdir -p /catkin_ws/src && \
	cd /catkin_ws/src && \
	catkin_create_pkg bringup std_msgs rospy

COPY ./scripts /catkin_ws/src/bringup/scripts

RUN cd /catkin_ws && \
	source /opt/ros/${ROS_DISTRO}/setup.bash && \
	catkin_make

COPY ./app /app

CMD source /catkin_ws/devel/setup.bash && roslaunch --wait /app/bringup.launch
