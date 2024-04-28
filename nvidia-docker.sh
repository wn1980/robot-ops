#!/usr/bin/env bash

set -e

# Add the package repositories
# distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
distribution="ubuntu22.04" # hack for unsupported Ubuntu 24.04
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list

sudo apt-get update && sudo apt-get install -y nvidia-docker2
sudo systemctl restart docker

#test
sudo docker run --rm --gpus all nvidia/cuda:11.4.3-base-ubuntu20.04 nvidia-smi
