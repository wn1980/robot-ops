#!/usr/bin/env bash

set -e

mkdir -p ~/notebooks

if ! type -P jupyter-lab
then 

    echo -e "\n===================\nInstall jupyter-lab...\n================="    

    # install jupyter-lab
    sudo pip install jupyterlab
fi

cat > "/tmp/jupyter-lab.service" <<EOF
[Unit]
Description=JupyterLab
After=syslog.target network.target
[Service]
User=${USER}
ExecStart=/usr/local/bin/jupyter-lab --ip 0.0.0.0 --port 8888 --no-browser --allow-root --NotebookApp.token='' --NotebookApp.password='' --notebook-dir=~/notebooks
[Install]
WantedBy=multi-user.target

EOF

sudo mv -f /tmp/jupyter-lab.service /etc/systemd/system/

sudo systemctl daemon-reload

sudo systemctl enable jupyter-lab.service

sudo systemctl start jupyter-lab.service

sudo systemctl status jupyter-lab.service

echo -e "\n===================\nInstall jupyter-lab complete...\n================="    
