#!/usr/bin/env bash

set -e

sudo apt-get update && sudo apt-get install -y \
    python3-dev \
    libffi-dev \
    libssl-dev \
    curl

curl https://bootstrap.pypa.io/get-pip.py | python3 -

sudo pip3 install setuptools docker-compose
