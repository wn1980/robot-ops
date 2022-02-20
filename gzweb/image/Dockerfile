# Adapted from: https://github.com/Intelligent-Quads/iq_tutorials/blob/master/docs/gzweb_install.md

FROM ubuntu:20.04

LABEL maintainer="Waipot Ngamsaad <waipotn@hotmail.com>"

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -q -y --no-install-recommends \
    dirmngr \
    gnupg2 \
    lsb-release \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

RUN sed -i -e 's/http:\/\/archive/mirror:\/\/mirrors/' -e 's/http:\/\/security/mirror:\/\/mirrors/' -e 's/\/ubuntu\//\/mirrors.txt/' /etc/apt/sources.list

RUN sh -c 'echo "deb http://packages.osrfoundation.org/gazebo/ubuntu-stable `lsb_release -cs` main" > /etc/apt/sources.list.d/gazebo-stable.list' && \
    curl -L http://packages.osrfoundation.org/gazebo.key | apt-key add -

RUN apt-get update --fix-missing && apt-get upgrade -y
RUN	apt-get install -y \ 
    git \
    gazebo11 \
    libgazebo11-dev \
    libjansson-dev \ 
    nodejs \
    npm \
    libboost-dev \
    imagemagick \
    libtinyxml-dev \
    cmake \
    build-essential \
    python-is-python2

RUN npm install -g n && \
    n 8.14.0

RUN cd / && \
    git clone https://github.com/osrf/gzweb.git && \
    cd /gzweb && \
    #git checkout fix_build_gz11 && \
    git checkout gzweb_1.4.1 && \
    source /usr/share/gazebo/setup.sh && \
    npm run deploy --- -m

# Clean
RUN apt-get purge -y \
    curl \
    git \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /gzweb

EXPOSE 8080

CMD ["npm", "start"]
