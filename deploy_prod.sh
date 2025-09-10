#!/bin/bash
set -e

echo "🚀 Launching SafeShipping production stack..."

CERT_PATH="./docker/frontend/certs/fullchain.pem"
KEY_PATH="./docker/frontend/certs/privkey.pem"

# Check for certs
if [[ ! -f "$CERT_PATH" || ! -f "$KEY_PATH" ]]; then
  echo "❌ TLS certs not found. Run ./ssl-bootstrap.sh first."
  exit 1
fi

# Build + Launch containers
docker-compose -f docker-compose.prod.yml up --build -d

echo "✅ Production containers launched!"
docker ps --filter "name=SafeShipping"

# Optionally test NGINX endpoint
sleep 2
echo "🌍 Hit https://app.SafeShipping.local in your browser (accept warning if self-signed)"
