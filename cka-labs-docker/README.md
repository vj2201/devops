# CKA/CKAD Labs - Docker Edition

**Run Kubernetes labs locally with zero cloud costs!**

This Docker image provides a complete CKA/CKAD learning environment with:
- ✅ **Kind cluster** (Kubernetes in Docker) - 3 nodes
- ✅ **kubectl** with CKA exam shortcuts
- ✅ **Vim** configured for YAML editing (CKA exam style)
- ✅ **Hands-on labs** based on real exam scenarios
- ✅ **k9s** for cluster exploration
- ✅ **Helm** for package management
- ✅ **100% local** - works offline, no cloud needed!

---

## 🚀 Quick Start (2 Commands)

### Prerequisites
- Docker Desktop installed ([download here](https://www.docker.com/products/docker-desktop))
- 4GB+ RAM available
- 10GB disk space

### Run It

```bash
# 1. Build the image (one-time, takes 5 minutes)
docker build -t cka-labs .

# 2. Start the lab environment
docker run -it --privileged --name cka-lab cka-labs
```

**That's it!** You'll drop into a shell with a 3-node Kubernetes cluster ready.

---

## 📚 What You Get

### Kubernetes Cluster
- **1 control-plane node** (with ingress support)
- **2 worker nodes**
- **Networking**: CNI plugin (Kindnet)
- **Storage**: Local path provisioner

```bash
# Check cluster status
k get nodes
k get pods -A
```

### Pre-configured Tools

| Tool | Description | Alias |
|------|-------------|-------|
| **kubectl** | Kubernetes CLI | `k` |
| **kind** | Kubernetes in Docker | `kind` |
| **k9s** | Interactive cluster UI | `k9s` |
| **helm** | Package manager | `helm` |
| **vim** | CKA-optimized (YAML-ready) | `vim` |

### Bash Shortcuts (CKA Exam Style)

```bash
k                    # kubectl
kg                   # kubectl get
kd                   # kubectl describe
kdel                 # kubectl delete
ka                   # kubectl apply -f
kl                   # kubectl logs
kx                   # kubectl exec -it

# YAML generation (dry-run)
kdr nginx            # kubectl run nginx --dry-run=client -o yaml
kdrd app             # kubectl create deployment app --dry-run=client -o yaml
```

---

## 🎯 Available Labs

### 1. Network Policies Lab
**Duration**: 30-45 min
**Difficulty**: Intermediate
**Topics**: Network security, pod isolation

```bash
cd /root/labs/network-policy-lab
cat README.md
bash setup.sh
```

### 2. Gateway API Migration Lab
**Duration**: 40-60 min
**Difficulty**: Advanced
**Topics**: Ingress → Gateway API migration

```bash
cd /root/labs/gateway-migration-lab
cat README.md
# Coming soon!
```

### 3. Taints & Tolerations Lab
**Duration**: 20-30 min
**Difficulty**: Beginner
**Topics**: Node scheduling, workload placement

```bash
cd /root/labs/taints-tolerations-lab
cat README.md
# Coming soon!
```

### 4. Deployment Strategies Lab
**Duration**: 30-45 min
**Difficulty**: Intermediate
**Topics**: Rolling updates, blue/green, canary

```bash
cd /root/labs/deployment-strategies-lab
cat README.md
# Coming soon!
```

---

## 🔧 Usage Guide

### Starting the Lab Environment

```bash
# Fresh start (creates new cluster)
docker run -it --privileged --name cka-lab cka-labs

# Resume existing session
docker start -i cka-lab

# Multiple terminals (same cluster)
docker exec -it cka-lab bash
```

### Stopping the Environment

```bash
# From inside container
exit

# From host
docker stop cka-lab

# Delete everything
docker rm cka-lab
```

### Resetting the Cluster

```bash
# Inside container
kind delete cluster --name cka-lab
kind create cluster --name cka-lab --config /kind-config.yaml

# Or just restart container (auto-recreates cluster)
exit
docker restart -i cka-lab
```

---

## 💡 Tips & Tricks

### Vim Configuration (CKA Exam Style)

Your `.vimrc` is pre-configured for YAML:
- **2-space indentation** (Kubernetes standard)
- **Syntax highlighting** enabled
- **Line numbers** visible
- **Paste mode** for pasting YAML

```bash
# View config
cat ~/.vimrc

# Quick save in Vim
Ctrl+S  (or :w)
```

### Fast YAML Generation

```bash
# Create pod YAML without running it
kubectl run nginx --image=nginx --dry-run=client -o yaml > pod.yaml

# Create deployment YAML
kubectl create deployment web --image=nginx --replicas=3 --dry-run=client -o yaml > deploy.yaml

# Create service YAML
kubectl expose deployment web --port=80 --dry-run=client -o yaml > svc.yaml
```

### Exploring with k9s

```bash
# Launch interactive UI
k9s

# Navigation
:pods       # View pods
:svc        # View services
:deploy     # View deployments
/search     # Search
Ctrl+C      # Exit
```

### Accessing Services

```bash
# Port-forward to access services locally
kubectl port-forward svc/my-service 8080:80

# From host machine, visit: http://localhost:8080
```

---

## 🏗️ Architecture

### How It Works

```
┌─────────────────────────────────────────┐
│  Docker Container (Ubuntu 22.04)        │
│  ┌───────────────────────────────────┐  │
│  │  Docker Daemon                    │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Kind Cluster               │  │  │
│  │  │  - control-plane container  │  │  │
│  │  │  - worker-1 container       │  │  │
│  │  │  - worker-2 container       │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│  kubectl, helm, k9s, vim                │
└─────────────────────────────────────────┘
```

### Why `--privileged` Flag?

Kind requires Docker-in-Docker, which needs privileged mode:
- Allows nested containers (Kind runs K8s nodes as containers)
- Required for cgroups and namespaces

**Security note**: Only run on your local machine, not in production!

---

## 📊 Resource Usage

### Typical Resource Consumption

| Resource | Usage |
|----------|-------|
| **CPU** | 2-4 cores (during setup), 1-2 cores (idle) |
| **RAM** | 4-6 GB |
| **Disk** | 3-5 GB (image + cluster) |

### Checking Resource Usage

```bash
# From host
docker stats cka-lab

# Inside container
kubectl top nodes
kubectl top pods -A
```

---

## 🎓 Study Path

### Recommended Learning Order

1. **Beginner**:
   - Start with `taints-tolerations-lab` (node scheduling basics)
   - Learn `kubectl` shortcuts and YAML generation
   - Practice with `k9s` for cluster exploration

2. **Intermediate**:
   - `network-policy-lab` (pod security)
   - `deployment-strategies-lab` (rolling updates)
   - Practice creating resources from scratch

3. **Advanced**:
   - `gateway-migration-lab` (modern ingress)
   - Combine multiple concepts in one task
   - Time yourself (CKA exam is timed!)

---

## 🐛 Troubleshooting

### "Cannot connect to Docker daemon"

**Problem**: Docker daemon failed to start inside container.

**Solution**:
```bash
# Check if Docker is running
ps aux | grep dockerd

# Manually start Docker daemon
dockerd > /var/log/docker.log 2>&1 &
sleep 5
docker ps
```

### "Kind cluster not found"

**Problem**: Cluster was deleted or failed to create.

**Solution**:
```bash
# Check existing clusters
kind get clusters

# Recreate cluster
kind create cluster --name cka-lab --config=- <<EOF
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
EOF
```

### "Nodes not ready"

**Problem**: Cluster nodes stuck in NotReady state.

**Solution**:
```bash
# Check node status
kubectl get nodes -o wide

# Check system pods
kubectl get pods -n kube-system

# Common fix: Restart container
exit
docker restart cka-lab
```

### "Out of disk space"

**Problem**: Docker ran out of space.

**Solution**:
```bash
# From host, clean Docker cache
docker system prune -a

# Remove old images
docker rmi $(docker images -q)
```

---

## 🌐 Adding Web Access (Optional)

Want to share labs with students over the web?

### Option 1: ttyd (Web Terminal)

```bash
# Install ttyd in Dockerfile
RUN wget https://github.com/tsl0922/ttyd/releases/download/1.7.3/ttyd.x86_64 \
    && chmod +x ttyd.x86_64 \
    && mv ttyd.x86_64 /usr/local/bin/ttyd

# Run with web access
docker run -d -p 8080:8080 --privileged cka-labs ttyd -p 8080 /bin/bash

# Visit: http://localhost:8080
```

### Option 2: Deploy on Hetzner Cloud

**Cost**: €15/month (~$16 USD)

```bash
# On Hetzner VPS (CPX31: 4 vCPU, 8GB RAM)
docker run -d -p 80:8080 --privileged --restart always cka-labs ttyd -p 8080 /bin/bash

# Students access via: http://your-server-ip
```

---

## 🚢 Deployment Options

### Local Use (Current Setup)
- **Cost**: $0/month
- **Users**: 1 (you)
- **Perfect for**: Self-study, practicing CKA

### Cheap Web Access
- **Cost**: $6-15/month (Hetzner CAX11 or CPX31)
- **Users**: 5-10 concurrent
- **Perfect for**: Small study groups, teaching friends

### Educates Platform
- **Cost**: $25-200/month (Hetzner + Educates setup)
- **Users**: 30+ concurrent
- **Perfect for**: Courses, workshops, bootcamps

---

## 📝 Creating Your Own Labs

Want to add custom labs?

### Lab Structure

```
labs/
└── my-custom-lab/
    ├── README.md       # Lab instructions
    ├── setup.sh        # Environment setup
    ├── verify.sh       # Tests student's solution
    └── solution-*.yaml # Solution files
```

### Example: Creating a "StatefulSet" Lab

```bash
# Create lab directory
mkdir -p labs/statefulset-lab

# Write instructions
cat > labs/statefulset-lab/README.md <<'EOF'
# Lab: StatefulSets

Learn how to deploy stateful applications with persistent storage.

## Tasks
1. Create a StatefulSet for MongoDB
2. Configure persistent volumes
3. Test data persistence across pod restarts
...
EOF

# Write setup script
cat > labs/statefulset-lab/setup.sh <<'EOF'
#!/bin/bash
kubectl create namespace stateful-demo
# ... more setup
EOF

# Rebuild image
docker build -t cka-labs .
```

---

## 🤝 Contributing

Want to add more labs or improve existing ones?

1. Fork this repository
2. Create a new lab in `labs/` directory
3. Test your lab thoroughly
4. Submit a pull request!

---

## 📚 Resources

### Official Documentation
- [CKA Exam Curriculum](https://github.com/cncf/curriculum)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kind Documentation](https://kind.sigs.k8s.io/)

### Practice Platforms
- **Killercoda**: Free browser-based labs
- **KodeKloud**: Paid courses with hands-on labs
- **This Docker Image**: Free, unlimited, local practice!

### Exam Tips
- [CKA Exam Tips](https://github.com/walidshaari/Kubernetes-Certified-Administrator)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

---

## 💰 Cost Comparison

| Platform | Cost | Notes |
|----------|------|-------|
| **This Docker Image (local)** | $0/month | ✅ Unlimited practice, offline |
| **Killercoda** | $0/month | Limited scenarios, needs internet |
| **KodeKloud** | $30/month | Great content, subscription needed |
| **AWS EKS Lab** | $73+/month | Overkill for learning |
| **This + Hetzner Web** | $6/month | Share with friends/students |

---

## ❓ FAQ

### Q: Can I use this for CKA exam prep?
**A**: Yes! This image includes all tools allowed in the CKA exam.

### Q: Does this work on M1/M2 Mac (ARM)?
**A**: Mostly yes, but some images may need `--platform linux/amd64` flag.

### Q: Can multiple students use this?
**A**: Locally: 1 user per container. For multiple users, deploy with ttyd on a VPS.

### Q: How is this different from Minikube?
**A**: Minikube runs 1 node. Kind creates multi-node clusters (more realistic).

### Q: Do I need Kubernetes installed on my host?
**A**: No! Everything runs inside Docker.

### Q: Can I run this on Windows?
**A**: Yes, via Docker Desktop (requires WSL2).

---

## 📄 License

MIT License - Free to use, modify, and distribute!

---

## 🙏 Credits

- **Kind**: Kubernetes SIG for the amazing tool
- **Killercoda**: Inspiration for lab format
- **CKA Community**: For exam tips and tricks

---

**Happy Learning! 🚀**

Start with: `docker run -it --privileged --name cka-lab cka-labs`
