#!/bin/bash
# Run by systemd — restarts are handled by systemd, not this script.

VENV=/home/ubuntu/venv/bin/python3
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "=== Lead Discovery Engine Starting ==="
log "REPO_DIR=$REPO_DIR"

# Run discovery and extraction in parallel
$VENV "$REPO_DIR/vps_discover.py" &
DISCOVERY_PID=$!
log "Discovery started PID=$DISCOVERY_PID"

# Give discovery 2 minutes to populate queue before extraction starts
sleep 120

$VENV "$REPO_DIR/vps_extract.py" &
EXTRACTION_PID=$!
log "Extraction started PID=$EXTRACTION_PID"

# Wait for both to finish (systemd will restart this script on exit)
wait $DISCOVERY_PID $EXTRACTION_PID
log "Both processes finished. Systemd will restart."
