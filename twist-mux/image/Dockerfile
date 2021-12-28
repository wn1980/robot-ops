FROM ros:noetic-ros-core-focal

LABEL maintainer="Waipot Ngamsaad <waipotn@hotmail.com>"

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND noninteractive

RUN  apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

RUN sed -i -e 's/http:\/\/archive/mirror:\/\/mirrors/' -e 's/http:\/\/security/mirror:\/\/mirrors/' -e 's/\/ubuntu\//\/mirrors.txt/' /etc/apt/sources.list

RUN apt-get update --fix-missing && apt-get upgrade -y
RUN	apt-get install -y \ 
	ros-${ROS_DISTRO}-twist-mux \
	ros-${ROS_DISTRO}-twist-mux-msgs \
	build-essential \
	&& apt-get autoremove -y \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

RUN mkdir -p /catkin_ws/src && \
	cd /catkin_ws/src && \
	catkin_create_pkg web_server std_msgs rospy

COPY ./scripts /catkin_ws/src/web_server/scripts

RUN cd /catkin_ws && \
	source /opt/ros/${ROS_DISTRO}/setup.bash && \
	catkin_make

COPY ./app /app

#CMD ["roslaunch", "--wait", "/app/start.launch"]
CMD source /catkin_ws/devel/setup.bash && roslaunch --wait /app/twist_mux.launch
