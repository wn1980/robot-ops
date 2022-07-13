#!/usr/bin/env bash

set -e

sudo dphys-swapfile swapoff 

#sudo nano /etc/dphys-swapfile 

sudo dphys-swapfile setup

sudo dphys-swapfile swapon

sudo reboot
