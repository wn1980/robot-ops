#!/usr/bin/env bash

set -e

#VERSION=3.12.0
#VERSION=4.0.1
VERSION=4.14.0

if ! type -P code-server
then 

    echo -e "\n===================\nInstall code-server...\n================="    

    # install code-server
    file="code-server_${VERSION}_$(dpkg --print-architecture).deb"
    wget https://github.com/cdr/code-server/releases/download/v${VERSION}/$file && \
    sudo dpkg -i ./$file && \
    rm -f ./$file
fi

cat > "/tmp/code-server.service" <<EOF
[Unit]
After=network.service
[Service]
User=${USER}
Group=sudo
ExecStart=/usr/bin/code-server --bind-addr 0.0.0.0:12345 --auth none --cert
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
