#!/usr/bin/env bash

set -e

sudo apt-get update && sudo apt-get install -y \
    python3-dev \
    python3-pip \
    python3-testresources \
    libffi-dev \
    libssl-dev \
    curl

curl https://bootstrap.pypa.io/get-pip.py | sudo python3 -
#python -m pip install --upgrade pip
#python -m ensurepip --upgrade
#conda config --set auto_activate_base false

sudo pip3 install setuptools docker-compose
