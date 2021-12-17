FROM ros:melodic-ros-core-bionic

LABEL maintainer="Waipot Ngamsaad <waipotn@hotmail.com>"

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND noninteractive

RUN apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

RUN sed -i -e 's/http:\/\/archive/mirror:\/\/mirrors/' -e 's/http:\/\/security/mirror:\/\/mirrors/' -e 's/\/ubuntu\//\/mirrors.txt/' /etc/apt/sources.list

RUN apt-get update && apt-get upgrade -y 
RUN apt-get install -y \ 
	ros-$ROS_DISTRO-rosbridge-server \
	ros-$ROS_DISTRO-tf2-web-republisher \
	ros-$ROS_DISTRO-web-video-server \
	python-rosdep \
	build-essential && \
	apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY ./catkin_ws /catkin_ws

RUN source /opt/ros/$ROS_DISTRO/setup.bash && \
	cd /catkin_ws && \
	catkin_make install -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/opt/ros/$ROS_DISTRO -DCATKIN_ENABLE_TESTING=0 && \
	cd / && rm -rf catkin_ws

RUN rosdep init && rosdep update

COPY ./start.launch /

EXPOSE 8080 9090 11311

CMD ["roslaunch", "start.launch"]