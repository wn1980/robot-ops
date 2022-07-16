#!/usr/bin/env bash

set -e

#VERSION=3.12.0
VERSION=4.5.0

if ! type -P code-server
then 

    echo -e "\n===================\nInstall code-server...\n================="    

    # install code-server
    wget https://github.com/cdr/code-server/releases/download/v${VERSION}/code-server_${VERSION}_$(dpkg --print-architecture).deb && \
    sudo dpkg -i code-server_${VERSION}_$(dpkg --print-architecture).deb && \
    rm -f code-server_${VERSION}_$(dpkg --print-architecture).deb

cat > "/etc/systemd/system/code-server.service" <<EOF
[Unit]
After=network.service
[Service]
User=computin
Group=sudo
ExecStart=code-server --bind-addr 0.0.0.0:12345 --cert --auth none
Restart=on-failure
RestartSec=5s
[Install]
WantedBy=default.target

EOF

systemctl daemon-reload

systemctl enable code-server.service

systemctl start code-server.service

echo -e "\n===================\nInstall code-server complete...\n================="    
                                                  
fi   
