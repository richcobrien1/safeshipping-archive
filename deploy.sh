#!/bin/bash
set -e

echo "🔬 Validating local dev environment..."
bash docker/test/preflight_check.sh

echo "🚀 Starting SafeShipping deployment pipeline..."

### 🔧 Build Images
echo "🛠 Building Docker images..."
bash docker/build/build_all.sh

### 📦 Push to Registry (optional — uncomment to use)
# echo "📤 Pushing Docker images to registry..."
# docker push yourdockerhub/SafeShipping-backend:latest
# docker push yourdockerhub/SafeShipping-frontend:latest

### 🧹 Reset Cluster
echo "🧨 Resetting cluster state..."
bash kubernetes/reset.sh

### 🚀 Deploy with kube.sh
echo "📡 Running full cluster setup..."
bash kubernetes/kube.sh

echo "✅ SafeShipping rollout complete!"
kubectl get pods
kubectl get svc
