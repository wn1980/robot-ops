#!/usr/bin/env bash

set -e

#VERSION=3.12.0
VERSION=4.6.0

if ! type -P code-server
then 

    echo -e "\n===================\nInstall code-server...\n================="    

    # install code-server
    wget https://github.com/cdr/code-server/releases/download/v${VERSION}/code-server_${VERSION}_$(dpkg --print-architecture).deb && \
    sudo dpkg -i code-server_${VERSION}_$(dpkg --print-architecture).deb && \
    rm -f code-server_${VERSION}_$(dpkg --print-architecture).deb
fi

cat > "/tmp/code-server.service" <<EOF
[Unit]
After=network.service
[Service]
User=ubuntu
Group=sudo
ExecStart=/usr/bin/code-server --bind-addr 0.0.0.0:12345 --cert --auth none
Restart=on-failure
RestartSec=5s
[Install]
WantedBy=default.target

EOF

sudo mv -f /tmp/code-server.service /etc/systemd/system/

sudo systemctl daemon-reload

sudo systemctl enable code-server.service

sudo systemctl start code-server.service

sudo systemctl status code-server.service

echo -e "\n===================\nInstall code-server complete...\n================="    
