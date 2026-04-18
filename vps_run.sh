#!/bin/bash
# Runs discovery and extraction in parallel, auto-restarts on crash.

VENV=/home/ubuntu/venv/bin/python3
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

run_discovery() {
  while true; do
    log "Starting vps_discover.py..."
    $VENV "$REPO_DIR/vps_discover.py" 2>&1 | tee -a "$REPO_DIR/discovery.log"
    log "vps_discover.py exited. Restarting in 60s..."
    sleep 60
  done
}

run_extraction() {
  sleep 120
  while true; do
    log "Starting vps_extract.py..."
    $VENV "$REPO_DIR/vps_extract.py" 2>&1 | tee -a "$REPO_DIR/extraction.log"
    log "vps_extract.py exited. Restarting in 30s..."
    sleep 30
  done
}

log "=== Lead Discovery Engine Starting ==="
run_discovery &
DISCOVERY_PID=$!
run_extraction &
EXTRACTION_PID=$!

log "Discovery PID=$DISCOVERY_PID  Extraction PID=$EXTRACTION_PID"
log "Logs: discovery.log  extraction.log"

wait
