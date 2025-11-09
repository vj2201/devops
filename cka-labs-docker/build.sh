#!/bin/bash
set -e

echo "================================"
echo "  Building CKA Labs Docker Image"
echo "================================"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "ERROR: Docker is not running. Please start Docker Desktop."
    exit 1
fi

echo "[1/3] Building Docker image..."
echo "This may take 5-10 minutes on first build."
echo ""

docker build -t cka-labs:latest .

echo ""
echo "[2/3] Tagging image..."
docker tag cka-labs:latest cka-labs:$(date +%Y%m%d)

echo ""
echo "[3/3] Checking image size..."
docker images cka-labs:latest

echo ""
echo "================================"
echo "  ✓ Build Complete!"
echo "================================"
echo ""
echo "Image size: $(docker images cka-labs:latest --format '{{.Size}}')"
echo ""
echo "Next steps:"
echo "  1. Run the lab: ./run.sh"
echo "  2. Or manually: docker run -it --privileged --name cka-lab cka-labs"
echo ""
echo "To push to Docker Hub (optional):"
echo "  docker tag cka-labs:latest YOUR_USERNAME/cka-labs:latest"
echo "  docker push YOUR_USERNAME/cka-labs:latest"
echo ""
