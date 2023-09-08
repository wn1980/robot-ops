#!/usr/bin/env bash

# set -e

docker network create ros-network
docker volume create ros-workspace

if [[ $# -ge 2 ]]
    then 
        echo "user.email $1, user.name $2."
        git config --global user.email $1
        git config --global user.name $2

        echo "Generate new SSH key"
        ssh-keygen -t ed25519 -C "$1"
        ssh-keyscan -t ed25519 github.com >> ~/.ssh/known_hosts
        cat ~/.ssh/ed25519.pub
    else 
        echo "Please provide github email and username ie.: ./github-ssh.sh me@web.com myname"
fi

ssh -T git@github.com
