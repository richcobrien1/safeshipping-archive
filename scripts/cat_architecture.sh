# // script/cat_architecture.sh
# // This script outputs the architecture of the SafeShipping platform.
# // It provides a high-level overview of the directory structure and purpose of each component.
# // Usage: Run this script to get a snapshot of the platform's architecture.

#!/bin/bash
echo ""
echo "🗂  SafeShipping Platform Structure Snapshot"
echo ""
echo "SafeShipping/"
echo "├── backend/          # API, business logic, and data models"
echo "├── frontend/         # Vite-based UI, components, contexts"
echo "├── contracts/        # Smart contracts and testing libraries"
echo "├── docker/           # Container configurations per service"
echo "├── config/           # Global platform-level settings"
echo "├── iot/              # Device connectors, simulators, K8s manifests"
echo "├── oracles/          # External data adapters and aggregators"
echo "├── scripts/          # Utility scripts and automation"
echo "├── docs/             # Architecture, APIs, deployment guides"
echo "├── deployment/       # Terraform, CI/CD, boot flows"
echo "├── tests/            # E2E and integration tests"
echo "├── migrations/       # DB schema + contract migration logic"
echo ""
echo "🔗 Kubernetes manifests:  iot/kubernetes/"
echo "🛠  Docker Compose (dev only): docker/config/docker-compose.yml"
echo ""
