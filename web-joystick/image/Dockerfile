#FROM node:12.22.7-alpine
FROM ros:melodic-ros-core-bionic

LABEL maintainer="Waipot Ngamsaad <waipotn@hotmail.com>"

#RUN apk update && \
#    apk add --no-cache \
#    git && \
#    rm -rf /var/cache/apk/*

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND noninteractive

RUN  apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

RUN sed -i -e 's/http:\/\/archive/mirror:\/\/mirrors/' -e 's/http:\/\/security/mirror:\/\/mirrors/' -e 's/\/ubuntu\//\/mirrors.txt/' /etc/apt/sources.list

RUN apt-get update && apt-get upgrade -y
RUN	apt-get install -y \ 
	#ros-${ROS_DISTRO}-joystick-drivers \
    curl \
	git && \
	apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# install nodejs 12.x
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - && \
    apt install -y nodejs

# clone sourcecode
RUN git clone https://github.com/husarion/webui-ros-joystick.git && \
    cp -r webui-ros-joystick/nodejs /app

WORKDIR /app

RUN npm install rosnodejs@3.0.2 socket.io@2.4.1 yargs@16.2.0 express@4.17.1 && \
    npm install

EXPOSE 8000

CMD ["node", "/app/main.js"]

