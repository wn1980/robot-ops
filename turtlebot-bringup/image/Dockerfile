#FROM ros:kinetic-ros-core-xenial
FROM ros:noetic-ros-core-focal

LABEL maintainer="Waipot Ngamsaad <waipotn@hotmail.com>"

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND noninteractive

RUN apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

RUN sed -i -e 's/http:\/\/archive/mirror:\/\/mirrors/' -e 's/http:\/\/security/mirror:\/\/mirrors/' -e 's/\/ubuntu\//\/mirrors.txt/' /etc/apt/sources.list

RUN apt-get update --fix-missing && apt-get upgrade -y --fix-missing
RUN apt-get install -y \ 
	#ros-$ROS_DISTRO-linux-peripheral-interfaces \
	ros-${ROS_DISTRO}-diagnostics \
	ros-${ROS_DISTRO}-hector-trajectory-server \
	ros-${ROS_DISTRO}-kobuki-core \
	ros-${ROS_DISTRO}-kobuki-msgs \
	#ros-$ROS_DISTRO-kobuki-node \
	#ros-$ROS_DISTRO-kobuki-safety-controller \
	#ros-$ROS_DISTRO-kobuki-bumper2pc \
	#ros-$ROS_DISTRO-kobuki-auto-docking \
	#ros-$ROS_DISTRO-yocs-cmd-vel-mux \
	#ros-$ROS_DISTRO-yocs-velocity-smoother \
	#ros-$ROS_DISTRO-turtlebot-bringup \
	ros-${ROS_DISTRO}-ecl-streams \
	ros-${ROS_DISTRO}-robot-state-publisher \
	ros-${ROS_DISTRO}-xacro \
	ros-${ROS_DISTRO}-nodelet \
	ros-${ROS_DISTRO}-urdf \
	ros-${ROS_DISTRO}-angles \
	ros-${ROS_DISTRO}-dynamic-reconfigure \
	ros-${ROS_DISTRO}-kdl-conversions \
	python-is-python3 \
	libsensors4-dev \
	libyaml-cpp-dev \
	git \
	python3-rosdep \
	build-essential \
	&& apt-get autoremove -y \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

RUN rosdep init && rosdep update

RUN mkdir -p /catkin_ws/src && \
	cd /catkin_ws/src && \
	catkin_create_pkg docking std_msgs rospy

COPY ./scripts /catkin_ws/src/docking/scripts

RUN cd /catkin_ws/src && \
	git clone https://github.com/ros-drivers/linux_peripheral_interfaces.git

RUN cd /catkin_ws/src && \
	git clone https://github.com/turtlebot/turtlebot.git && \
	mv turtlebot/turtlebot_bringup turtlebot/turtlebot_description ./ && \
	rm -rf turtlebot

RUN cd /catkin_ws/src && \
	git clone --single-branch --branch melodic https://github.com/yujinrobot/kobuki.git && \
  	mv kobuki/kobuki_description kobuki/kobuki_node \
    kobuki/kobuki_keyop kobuki/kobuki_safety_controller \
    kobuki/kobuki_bumper2pc kobuki/kobuki_auto_docking ./ && \
  	rm -rf kobuki

RUN cd /catkin_ws/src && \
	git clone https://github.com/yujinrobot/yujin_ocs.git && \
	mv  yujin_ocs/yocs_cmd_vel_mux yujin_ocs/yocs_controllers yujin_ocs/yocs_velocity_smoother ./ && \
	rm -rf yujin_ocs

RUN cd /catkin_ws && \
	source /opt/ros/${ROS_DISTRO}/setup.bash && \
	catkin_make

COPY ./app /app

RUN apt-get purge -y \ 
	git \
	&& apt-get autoremove -y \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

CMD source /catkin_ws/devel/setup.bash && roslaunch --wait /app/bringup.launch
