#!/usr/bin/env bash

set -e

DISTRO=ubuntu

if [[ "$OSTYPE" == "linux-gnueabihf" ]]; then
    DISTRO=raspbian
fi

echo "\n\n====================\ndetected $OSTYPE type linux\n===================="

for pkg in docker.io docker-doc docker-compose containerd runc; do sudo apt purge $pkg; done

sudo apt update && sudo apt install -y \
    ca-certificates \
    curl \
    gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/${DISTRO} \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update && sudo apt install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io \
    docker-buildx-plugin \
    docker-compose-plugin
    
sudo usermod -aG docker $USER
sudo usermod -aG dialout $USER

echo -e "\n\n====================\nInstallation done!\nPlease reboot for completion.\n===================="
