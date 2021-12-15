FROM ros:melodic-ros-core-bionic

LABEL maintainer="Waipot Ngamsaad <waipotn@hotmail.com>"

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND noninteractive

RUN apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

RUN sed -i -e 's/http:\/\/archive/mirror:\/\/mirrors/' -e 's/http:\/\/security/mirror:\/\/mirrors/' -e 's/\/ubuntu\//\/mirrors.txt/' /etc/apt/sources.list

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    apt-transport-https \
    build-essential \
    curl \
    git \
    wget \
    nano && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN sh -c 'echo "deb http://packages.osrfoundation.org/gazebo/ubuntu-stable `lsb_release -cs` main" > /etc/apt/sources.list.d/gazebo-stable.list' && \
    curl -L http://packages.osrfoundation.org/gazebo.key | apt-key add -

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    #ros-${ROS_DISTRO}-desktop-full \
    #ros-${ROS_DISTRO}-linux-peripheral-interfaces \
    #ros-${ROS_DISTRO}-diagnostics \
    #ros-${ROS_DISTRO}-navigation \
    #ros-${ROS_DISTRO}-hector-slam \
    #ros-${ROS_DISTRO}-octomap-server \
    #ros-${ROS_DISTRO}-octomap-rviz-plugins \
    ros-${ROS_DISTRO}-roslint \
    ros-${ROS_DISTRO}-rosserial \
    ros-${ROS_DISTRO}-rosserial-arduino \
    ros-${ROS_DISTRO}-imu-filter-madgwick \
    ros-${ROS_DISTRO}-gmapping \
    ros-${ROS_DISTRO}-map-server \
    ros-${ROS_DISTRO}-navigation \
    ros-${ROS_DISTRO}-robot-localization \
    ros-${ROS_DISTRO}-teleop-twist-keyboard \
    ros-${ROS_DISTRO}-tf2 \
    ros-${ROS_DISTRO}-tf2-ros \
    ros-${ROS_DISTRO}-rviz \
    ros-${ROS_DISTRO}-rqt \
    ros-${ROS_DISTRO}-rqt-common-plugins \
    ros-${ROS_DISTRO}-rospy-tutorials \
    python-rosdep && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    bash-completion \
    #less \
    htop \
    tmux \
    terminator \
    xfe \
    #fluxbox \
    jwm \
    xfonts-base \
    xauth \
    x11-xkb-utils \
    xkb-data \
    dbus-x11 \
    net-tools \
    usbutils \
    sudo \
    tigervnc-standalone-server \
    #tigervnc-xorg-extension \
    python-pip && \
    curl https://bootstrap.pypa.io/pip/2.7/get-pip.py | python - && \
    pip install -U --no-cache-dir supervisor supervisor_twiddler && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# install noVNC
ENV NO_VNC_HOME=/app/noVNC

RUN rm -Rf $NO_VNC_HOME && \
    mkdir -p $NO_VNC_HOME/utils/websockify && \
    wget -qO- https://github.com/novnc/noVNC/archive/v1.3.0.tar.gz | tar xz --strip 1 -C $NO_VNC_HOME && \
    wget -qO- https://github.com/novnc/websockify/archive/v0.10.0.tar.gz | tar xz --strip 1 -C $NO_VNC_HOME/utils/websockify

COPY ./index.html $NO_VNC_HOME

RUN rm /etc/apt/apt.conf.d/docker-clean

# install code-server
ENV VERSION=4.0.0
RUN wget https://github.com/cdr/code-server/releases/download/v${VERSION}/code-server_${VERSION}_$(dpkg --print-architecture).deb && \
    dpkg -i code-server_${VERSION}_$(dpkg --print-architecture).deb && \
    rm -f code-server_${VERSION}_$(dpkg --print-architecture).deb

# install nodejs
RUN sh -c 'echo "deb https://deb.nodesource.com/node_8.x `lsb_release -cs` main" > /etc/apt/sources.list.d/nodesource.list' && \
    curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    nodejs \
    libfftw3-dev \
    libconfig-dev \
    libasound2-dev \
    libgbm-dev \
    libnss3-dev \
	python3-dev \
	python3-pip \
	libssl-dev \
	libffi-dev \
	libatlas3-base \
	portaudio19-dev \
	ffmpeg \
	alsa-utils \
	&& rm -rf /var/lib/apt/lists/*

RUN rosdep init

RUN mkdir -p /workspace

# setup user
RUN useradd -m developer && \
    usermod -aG sudo developer && \
    usermod --shell /bin/bash developer && \
    chown -R developer:developer /workspace && \
    ln -sfn /workspace /home/developer/workspace && \
    echo developer ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/developer && \
    chmod 0440 /etc/sudoers.d/developer

ENV USER=developer

ENV HOME /home/developer

ENV SHELL /bin/bash

USER $USER

WORKDIR /home/developer

# init rosdep
RUN rosdep fix-permissions && rosdep update

# colorize less
#RUN echo "export LESS='-R'" >> ~/.bash_profile && \
#    echo "export LESSOPEN='|pygmentize -g %s'" >> ~/.bash_profile

# enable bash completion
RUN echo "source /usr/share/bash-completion/bash_completion" >> ~/.bashrc && \
    #git clone --depth=1 https://github.com/Bash-it/bash-it.git ~/.bash_it && \
    #~/.bash_it/install.sh --silent && \
    #rm ~/.bashrc.bak && \
    #bash -i -c "bash-it enable completion git" && \
    echo "source ~/.bashrc" >> ~/.bash_profile 

#RUN git clone https://github.com/introlab/odas.git && \
#    cd odas && \
#    mkdir build && \
#    cd build && \
#    cmake ../ && \
#    make

#RUN git clone https://github.com/introlab/odas_web.git && \
#    cd odas_web && \
#    npm install && \
#    npm audit fix && \
#    npm audit fix --force

#RUN wget https://raw.githubusercontent.com/respeaker/usb_4_mic_array/master/odas.cfg

USER root

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    ros-${ROS_DISTRO}-tf-conversions \
    ros-${ROS_DISTRO}-rviz \
    python-numpy \
    python-scipy \
    gfortran \
    texinfo && \
    pip install libconf && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

USER $USER

RUN mkdir -p $HOME/catkin_ws/src

COPY ./catkin_ws/src/dialogflow_msg $HOME/catkin_ws/src/

RUN cd $HOME/catkin_ws/src && \
    git clone https://github.com/introlab/audio_utils.git && \
    cd audio_utils && \
    git submodule update --init --recursive

RUN cd $HOME/catkin_ws/src && \
    git clone https://github.com/introlab/odas_ros.git && \
    cd odas_ros && \
    git submodule update --init --recursive

RUN source /opt/ros/$ROS_DISTRO/setup.bash && \
	cd $HOME/catkin_ws && \
    catkin_make
	#catkin_make install -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/opt/ros/$ROS_DISTRO -DCATKIN_ENABLE_TESTING=0 && \
	#cd / && rm -rf catkin_ws

RUN echo "source /opt/ros/$ROS_DISTRO/setup.bash" >> ~/.bashrc && \
    echo "source $HOME/catkin_ws/devel/setup.bash" >> ~/.bashrc

VOLUME /tmp/.X11-unix

COPY ./app /app

RUN sudo /app/install/tigervnc.sh

ENV DISPLAY ":1"

EXPOSE 11311 8558 9901

CMD ["sudo", "-E", "/usr/local/bin/supervisord", "-c", "/app/supervisord.conf"]
