# ⚡ Quick Start - Get Running in 5 Minutes

## Prerequisites Check

1. **Docker Desktop installed?**
   - Mac/Windows: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Linux: `sudo apt install docker.io` or `brew install docker`

2. **Docker running?**
   ```bash
   docker --version
   # Should show: Docker version 20.x.x or higher
   ```

3. **Enough resources?**
   - Docker Desktop → Settings → Resources
   - Set: 4GB RAM minimum (6GB recommended)
   - Set: 2 CPUs minimum (4 recommended)

---

## 🚀 Start in 3 Commands

```bash
# 1. Build the image (one-time, ~5 minutes)
./build.sh

# 2. Run the lab environment
./run.sh

# 3. Inside container: Check cluster
k get nodes
```

**That's it!** You now have a 3-node Kubernetes cluster running locally.

---

## 🎯 Try Your First Lab (2 Minutes)

Inside the container:

```bash
# Go to network policy lab
cd /root/labs/network-policy-lab

# Read the instructions
cat README.md

# Run setup
bash setup.sh

# Start working on tasks!
```

---

## 📖 What Just Happened?

1. **Docker built the image** (~1.5GB) with:
   - Ubuntu 22.04
   - Docker + Kind + kubectl
   - Vim (CKA-configured)
   - All lab materials

2. **Container started** and automatically:
   - Started Docker daemon inside container
   - Created Kind cluster (3 nodes: 1 control-plane, 2 workers)
   - Configured kubectl
   - Dropped you into bash shell

3. **You're now inside** a fully functional Kubernetes environment:
   ```bash
   k get nodes
   # NAME                     STATUS   ROLES           AGE
   # cka-lab-control-plane    Ready    control-plane   2m
   # cka-lab-worker           Ready    <none>          2m
   # cka-lab-worker2          Ready    <none>          2m
   ```

---

## 💡 Common Commands

### Cluster Management

```bash
# Check cluster nodes
k get nodes

# See all pods (system + yours)
k get pods -A

# Launch interactive cluster viewer
k9s

# Check cluster info
kubectl cluster-info
```

### Container Management

```bash
# Exit container (stops cluster)
exit

# Resume later (from host)
./run.sh
# Choose: 1) Resume existing container

# Open another terminal window (from host)
docker exec -it cka-lab bash

# Completely delete and start fresh (from host)
docker rm -f cka-lab
./run.sh
```

### Lab Commands

```bash
# List available labs
ls /root/labs/

# Go to a lab
cd /root/labs/network-policy-lab

# Read instructions
cat README.md

# Run setup
bash setup.sh

# Verify your solution
bash verify.sh
```

---

## 🐛 Troubleshooting

### Build fails with "Cannot connect to Docker daemon"

**Problem**: Docker Desktop not running

**Fix**:
1. Open Docker Desktop app
2. Wait for "Docker Desktop is running" in menu bar/system tray
3. Try build again: `./build.sh`

---

### Run fails with "Image not found"

**Problem**: Image not built yet

**Fix**:
```bash
./build.sh
./run.sh
```

---

### "Nodes not ready" after 5 minutes

**Problem**: Cluster failed to start

**Fix**:
```bash
# Inside container
kind delete cluster --name cka-lab

# Exit and restart
exit
./run.sh
```

---

### Out of disk space

**Problem**: Docker cache full

**Fix** (from host):
```bash
# Clean Docker cache
docker system prune -a

# Remove old containers
docker rm $(docker ps -a -q)

# Rebuild
./build.sh
```

---

## 🎓 Next Steps

1. **Complete your first lab**:
   ```bash
   cd /root/labs/network-policy-lab
   cat README.md
   bash setup.sh
   ```

2. **Learn kubectl shortcuts**:
   ```bash
   # These are already configured!
   k         # kubectl
   kg        # kubectl get
   kd        # kubectl describe
   kdel      # kubectl delete
   ka        # kubectl apply -f
   ```

3. **Practice YAML generation**:
   ```bash
   # Create pod YAML without running it
   kubectl run nginx --image=nginx --dry-run=client -o yaml

   # Create deployment YAML
   kubectl create deployment web --image=nginx --dry-run=client -o yaml
   ```

4. **Explore with k9s**:
   ```bash
   k9s
   # Press :pods to view pods
   # Press :svc for services
   # Press Ctrl+C to exit
   ```

---

## 📚 Full Documentation

For complete documentation, see [README.md](./README.md)

Topics covered:
- All available labs
- Advanced usage
- Creating custom labs
- Web access setup
- Resource usage
- Deployment options

---

## 💰 Cost

**$0/month** - Everything runs locally on your machine!

Optional:
- Add web access: $6/month (Hetzner VPS)
- Share with 10+ students: $15/month (Hetzner CPX31)

---

## 🙋 Questions?

- **Check main README**: [README.md](./README.md)
- **Lab issues**: Check `labs/<lab-name>/README.md`
- **CKA exam prep**: [CKA Curriculum](https://github.com/cncf/curriculum)

---

**Ready to learn? Run `./run.sh` and start your first lab! 🚀**
