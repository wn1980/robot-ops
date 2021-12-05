#!/usr/bin/env bash

set -e

if [[ $(lsb_release -rs) == "18.04" ]]; then
    echo "Ubuntu $(lsb_release -rs)"
    if [ $(uname -m) == 'x86_64' ]
    then
	    wget http://tigervnc.bphinz.com/nightly/ubuntu-18.04LTS/amd64/tigervncserver_1.12.80+20211129git9d63d9c2-1ubuntu1_amd64.deb -O ./tigervnc.deb
    elif [ $(uname -m) == 'aarch64' ] 
    then 
	    wget http://tigervnc.bphinz.com/nightly/ubuntu-18.04LTS/arm64/tigervncserver_1.12.80+20211129git9d63d9c2-1ubuntu1_arm64.deb -O ./tigervnc.deb
    else
        echo 'not matched platform!'
        exit 0
    fi
elif [[ $(lsb_release -rs) == "20.04" ]]; then
    echo "Ubuntu $(lsb_release -rs)"
    if [ $(uname -m) == 'x86_64' ]
    then
	    wget http://tigervnc.bphinz.com/nightly/ubuntu-20.04LTS/amd64/tigervncserver_1.12.80+20211129git9d63d9c2-1ubuntu1_amd64.deb -O ./tigervnc.deb
    elif [ $(uname -m) == 'aarch64' ] 
    then 
	    wget http://tigervnc.bphinz.com/nightly/ubuntu-20.04LTS/arm64/tigervncserver_1.12.80+20211129git9d63d9c2-1ubuntu1_arm64.deb -O ./tigervnc.deb
    else
        echo 'not matched platform!'
        exit 0
    fi
else
  echo "Non-compatible OS"
  exit 0
fi

apt update && apt -y upgrade
apt purge -y tigervnc-*
apt install -y ./tigervnc.deb
rm ./tigervnc.deb
