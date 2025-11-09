#!/bin/bash
set -e

echo "================================"
echo "  CKA/CKAD Labs Environment"
echo "================================"
echo ""

# Start Docker daemon in background
echo "[1/4] Starting Docker daemon..."
dockerd > /var/log/docker.log 2>&1 &

# Wait for Docker to be ready
echo "[2/4] Waiting for Docker to be ready..."
timeout=30
counter=0
until docker info > /dev/null 2>&1; do
    sleep 1
    counter=$((counter + 1))
    if [ $counter -ge $timeout ]; then
        echo "ERROR: Docker failed to start within ${timeout} seconds"
        cat /var/log/docker.log
        exit 1
    fi
done
echo "✓ Docker is ready!"

# Create Kind cluster if it doesn't exist
if ! kind get clusters 2>/dev/null | grep -q "^cka-lab$"; then
    echo "[3/4] Creating Kind cluster (this may take 2-3 minutes)..."

    cat <<EOF | kind create cluster --name cka-lab --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP
- role: worker
- role: worker
EOF

    echo "✓ Kind cluster created!"
else
    echo "[3/4] Kind cluster 'cka-lab' already exists"
fi

# Set kubeconfig context
export KUBECONFIG=~/.kube/config
kubectl config use-context kind-cka-lab > /dev/null 2>&1

# Wait for nodes to be ready
echo "[4/4] Waiting for cluster nodes to be ready..."
kubectl wait --for=condition=Ready nodes --all --timeout=300s

echo ""
echo "================================"
echo "  ✓ Lab Environment Ready!"
echo "================================"
echo ""
echo "Cluster Info:"
kubectl get nodes -o wide
echo ""
echo "Available labs:"
ls -1 /root/labs/
echo ""
echo "To start a lab:"
echo "  cd /root/labs/<lab-name>"
echo "  cat README.md"
echo "  bash setup.sh"
echo ""
echo "Useful commands:"
echo "  k get nodes          - List cluster nodes"
echo "  k get pods -A        - List all pods"
echo "  k9s                  - Interactive cluster viewer"
echo "  vim ~/.vimrc         - Check Vim config"
echo ""
echo "Type 'exit' to stop the lab environment."
echo "================================"
echo ""

# Execute command or drop to shell
exec "$@"
