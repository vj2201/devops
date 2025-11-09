#!/bin/bash
set -e

echo "================================"
echo "  Network Policy Lab Setup"
echo "================================"
echo ""

# Create namespace
echo "[1/5] Creating namespace 'secure-app'..."
kubectl create namespace secure-app --dry-run=client -o yaml | kubectl apply -f -

# Label the namespace (for network policies)
kubectl label namespace secure-app kubernetes.io/metadata.name=secure-app --overwrite

echo "[2/5] Creating frontend pods..."
# Create frontend deployment
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: secure-app
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: secure-app
spec:
  selector:
    tier: frontend
  ports:
  - port: 80
    targetPort: 80
EOF

echo "[3/5] Creating backend pods..."
# Create backend deployment
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: secure-app
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: backend
  template:
    metadata:
      labels:
        tier: backend
    spec:
      containers:
      - name: api
        image: hashicorp/http-echo:latest
        args:
        - "-text=Backend API OK"
        - "-listen=:8080"
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: backend
  namespace: secure-app
spec:
  selector:
    tier: backend
  ports:
  - port: 8080
    targetPort: 8080
EOF

echo "[4/5] Creating database pod..."
# Create database deployment
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: database
  namespace: secure-app
spec:
  replicas: 1
  selector:
    matchLabels:
      tier: database
  template:
    metadata:
      labels:
        tier: database
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        env:
        - name: POSTGRES_PASSWORD
          value: "secretpassword"
        ports:
        - containerPort: 5432
---
apiVersion: v1
kind: Service
metadata:
  name: database
  namespace: secure-app
spec:
  selector:
    tier: database
  ports:
  - port: 5432
    targetPort: 5432
EOF

echo "[5/5] Waiting for all pods to be ready..."
kubectl wait --for=condition=Ready pods --all -n secure-app --timeout=120s

echo ""
echo "================================"
echo "  ✓ Setup Complete!"
echo "================================"
echo ""
echo "Resources created:"
kubectl get all -n secure-app
echo ""
echo "Pod labels:"
kubectl get pods -n secure-app --show-labels
echo ""
echo "Next steps:"
echo "  1. Read the lab instructions: cat README.md"
echo "  2. Test current connectivity (all should work)"
echo "  3. Apply network policies to secure the app"
echo ""
echo "Quick test:"
echo "  kubectl exec -n secure-app -it \$(kubectl get pod -n secure-app -l tier=frontend -o jsonpath='{.items[0].metadata.name}') -- curl -s http://backend:8080"
echo ""
