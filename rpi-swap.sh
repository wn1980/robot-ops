#!/usr/bin/env bash

set -e

if [ -z "$1" ]
  then
    echo "Please provide SWAPSIZE in MB, e.g., ./rpi-swap.sh 1024/2048/4096"
    exit 0
else
    SWAPSIZE=$1
fi

if ! [[ $SWAPSIZE =~ ^[0-9]+$ ]] ; then
    echo "SWAPSIZE must be a number!"
    exit 0
fi

#sudo dphys-swapfile swapoff 

#sudo nano /etc/dphys-swapfile 

#sudo dphys-swapfile setup

#sudo dphys-swapfile swapon

#sudo reboot

sudo sed -i 's/^CONF_SWAPSIZE=[0-9]*$/CONF_SWAPSIZE='${SWAPSIZE}'/' /etc/dphys-swapfile
sudo /etc/init.d/dphys-swapfile restart
