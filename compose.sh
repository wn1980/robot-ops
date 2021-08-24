#!/usr/bin/env bash

set -e

apt-get update && apt-get install -y \
    python3-dev \
    libffi-dev \
    libssl-dev \
    curl

curl https://bootstrap.pypa.io/get-pip.py | python3 -

pip3 install setuptools docker-compose
