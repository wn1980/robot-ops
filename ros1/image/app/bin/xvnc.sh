#!/usr/bin/env bash

set -e

rm -f /tmp/.X9-lock

Xvnc $DISPLAY -depth 24 -ac -pn -rfbport=5901 -SecurityTypes=None -desktop=RobotOps
