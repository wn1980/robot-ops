#!/usr/bin/env bash

set -e

cd /app/html

python3 -m http.server 7000
