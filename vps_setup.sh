#!/bin/bash
set -e

echo "[Setup] Installing Python dependencies..."
sudo apt update -y
sudo apt install -y python3-pip python3-venv git

echo "[Setup] Creating virtual environment..."
python3 -m venv /home/ubuntu/venv
source /home/ubuntu/venv/bin/activate

echo "[Setup] Installing Python packages..."
pip install aiohttp aiofiles beautifulsoup4 pytest lxml

echo "[Setup] Done. Activate with: source /home/ubuntu/venv/bin/activate"

echo "[Setup] Installing systemd service..."
sudo cp /home/ubuntu/scripter/vps_discover.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable vps_discover.service

echo "[Setup] Installing logrotate config..."
sudo cp /home/ubuntu/scripter/vps_logrotate.conf /etc/logrotate.d/vps_discover

echo "[Setup] To start the service: sudo systemctl start vps_discover"
