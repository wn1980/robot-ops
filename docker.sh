#!/usr/bin/env bash

set -e

sudo apt update && sudo apt install -y \
    docker.io 

sudo usermod -aG docker $USER
sudo usermod -aG dialout $USER

echo -e "\n\n====================\nInstallation done!\nPlease reboot for completion.\n===================="