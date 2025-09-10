#!/bin/bash
set -e

echo "🧹 SafeShipping Project Cleanup Utility"
echo "======================================"
echo "This will organize shell scripts, relocate Docker files, and remove temp debris."
read -p "Proceed? [y/N]: " confirm
[[ "$confirm" != "y" ]] && echo "Cancelled." && exit 0

# 1. Create target folders if missing
mkdir -p docker/build
mkdir -p docker/test
mkdir -p docker/config
mkdir -p docker/dev

# 2. Move shell scripts
echo "🔧 Moving shell scripts..."
mv dev_build.sh                      docker/dev/launch_frontend.sh 2>/dev/null || true
mv docker_build.sh                   docker/build/build_all.sh 2>/dev/null || true
mv docker_build_be.sh                docker/build/build_backend.sh 2>/dev/null || true
mv docker_build_fe.sh                docker/build/build_frontend.sh 2>/dev/null || true
mv docker-compose_local_only.sh     docker/dev/dev_compose.sh 2>/dev/null || true
mv docker_test.sh                    docker/test/test_all.sh 2>/dev/null || true
mv docker_test_be.sh                 docker/test/test_backend.sh 2>/dev/null || true
mv docker_test_fe.sh                 docker/test/test_frontend.sh 2>/dev/null || true

# 3. Move Dockerfile.dev if still in root or frontend
echo "📦 Moving Dockerfile.dev..."
if [ -f Dockerfile.dev ]; then
  mv Dockerfile.dev docker/frontend/Dockerfile.dev
elif [ -f frontend/Dockerfile.dev ]; then
  mv frontend/Dockerfile.dev docker/frontend/Dockerfile.dev
fi

# 4. Move docker-compose YAMLs into config
echo "📁 Organizing docker-compose files..."
find . -maxdepth 1 -name 'docker-compose*.yml' -exec mv {} docker/config/ \;

# 5. Remove common junk files
echo "🗑 Removing temp files..."
rm -f *.log *.tmp .DS_Store Thumbs.db

echo "✅ Cleanup complete!"
echo "🛠 Files moved into docker/build/, docker/test/, docker/config/, docker/dev/"
