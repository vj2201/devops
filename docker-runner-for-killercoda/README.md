# 🐳 Docker Runner for Killercoda Scenarios

Run your Killercoda scenarios locally using Docker + Kind (Kubernetes in Docker).

**No cloud needed. No Killercoda platform needed. $0/month.**

---

## 🎯 What This Does

This Docker environment runs **all your Killercoda scenarios** from this repository locally:

✅ All 14 scenarios from parent directory
✅ Same Killercoda format (`index.json`, `setup.sh`, `intro.md`)
✅ 3-node Kubernetes cluster (Kind)
✅ CKA exam tools (kubectl, helm, k9s, vim)
✅ Works offline after initial build
✅ Unlimited practice time

---

## 📋 Prerequisites

- Docker Desktop installed ([download](https://www.docker.com/products/docker-desktop))
- 4GB+ RAM available
- 10GB disk space

---

## 🚀 Quick Start (2 Commands)

```bash
# 1. Build the image (from this directory)
./build.sh

# 2. Run it
./run.sh

# 3. Inside container: List scenarios
scenario-runner list

# 4. Run a scenario
scenario-runner network-policy-lab
```

---

## 📖 How to Use

### Building the Image

```bash
cd docker-runner
./build.sh
```

**What happens**:
- Builds Docker image from parent directory (to include all scenarios)
- Installs Kubernetes tools (kubectl, kind, helm, k9s)
- Configures Vim for CKA exam (YAML optimized)
- Copies all scenarios from parent directory
- Takes 5-10 minutes first time

### Running a Scenario

```bash
# Start the environment
./run.sh

# Inside container
scenario-runner list                    # See all scenarios
scenario-runner network-policy-lab      # Run specific scenario
```

**What happens**:
1. Creates 3-node Kind cluster automatically
2. Runs scenario's `setup.sh` (background)
3. Shows scenario's `intro.md` (instructions)
4. You work on the task
5. Use `show-solution` to check answer

### Example Session

```bash
root@cka-lab:~# scenario-runner network-policy-lab

================================
  CKA Practice: Network Policy Configuration
================================
Description: Create least-permissive NetworkPolicy for cross-namespace communication
Difficulty: intermediate
Time: 15 minutes

Running environment setup (background)...
✓ Environment ready!

# Now work on the task
kubectl get namespaces
kubectl get pods -n frontend

# Need help?
show-solution

# Done?
show-finish
cleanup
```

---

## 📂 Repository Structure

```
killercoda-scenarios/
├── cert-manager-lab/          # Your scenario
├── network-policy-lab/        # Your scenario
├── ... (12 other scenarios)
└── docker-runner/             # ← THIS FOLDER
    ├── Dockerfile             # Docker image definition
    ├── build.sh               # Build script
    ├── run.sh                 # Run script
    ├── scenario-runner.sh     # Runs your scenarios
    ├── entrypoint.sh          # Starts cluster
    └── README.md              # This file
```

**Key point**: All scenarios in parent directory are copied into Docker image.

---

## 🛠️ Available Commands

### Build & Run
- `./build.sh` - Build Docker image
- `./run.sh` - Start lab environment

### Inside Container
- `scenario-runner list` - List all scenarios
- `scenario-runner <name>` - Run specific scenario
- `show-solution` - View solution (when in scenario)
- `show-finish` - View completion message
- `cleanup` - Clean up lab resources
- `k` / `kubectl` - Kubernetes CLI
- `k9s` - Interactive cluster viewer

### Kubernetes Shortcuts (CKA Exam Style)
- `k` → `kubectl`
- `kg` → `kubectl get`
- `kd` → `kubectl describe`
- `kdel` → `kubectl delete`
- `ka` → `kubectl apply -f`
- `kl` → `kubectl logs`
- `kx` → `kubectl exec -it`

---

## 📊 Your Scenarios (All Available!)

From the parent directory, these scenarios are included:

1. ✅ cert-manager-lab
2. ✅ cni-lab
3. ✅ cri-docker-scenario
4. ✅ gateway-migration-lab
5. ✅ hpa-lab
6. ✅ ingress-lab
7. ✅ mariadb-pvc-lab
8. ✅ network-policy-lab
9. ✅ nodeport-lab
10. ✅ priority-lab
11. ✅ resources-lab-q04
12. ✅ sidecar-lab
13. ✅ taints-tolerations-lab
14. ✅ tls-config-lab

Each scenario: 5-20 minutes (perfect for CKA exam prep!)

---

## 💰 Cost Options

### Option 1: Local Use ($0/month) - Recommended
Students run on their laptops:
```bash
git clone https://github.com/vj2201/killercoda-scenarios.git
cd killercoda-scenarios/docker-runner
./build.sh && ./run.sh
```

**Cost**: Free
**Students**: Unlimited

### Option 2: Web Access ($6/month)
Deploy on VPS for browser access:
```bash
# On Hetzner CAX11 (€5.83/mo)
docker run -d -p 80:8080 --privileged --restart always \
  cka-labs ttyd -p 8080 /bin/bash
```

**Cost**: €5.83/month (~$6 USD)
**Students**: 5-10 concurrent
**URL**: Students access via browser

---

## 🔧 Advanced Usage

### Publishing to Docker Hub

```bash
# Build
./build.sh

# Tag
docker tag cka-labs:latest YOUR_USERNAME/cka-labs:latest

# Push
docker push YOUR_USERNAME/cka-labs:latest

# Students use
docker run -it --privileged YOUR_USERNAME/cka-labs
```

### Multiple Terminal Sessions

```bash
# Terminal 1: Start environment
./run.sh

# Terminal 2: Attach to same container
docker exec -it cka-lab bash
```

### Resetting the Cluster

```bash
# Inside container
kind delete cluster --name cka-lab
exit

# Restart
./run.sh  # Cluster recreated automatically
```

---

## 📝 Adding New Scenarios

Just add to parent directory and rebuild:

```bash
# In repo root
cd ..
mkdir my-new-scenario
# Create index.json, intro.md, setup.sh, solution.md
git add my-new-scenario
git commit -m "Add new scenario"

# Rebuild Docker image
cd docker-runner
./build.sh
```

New scenario immediately available!

---

## 🐛 Troubleshooting

### "Docker daemon failed to start"
```bash
# Inside container
ps aux | grep dockerd
dockerd > /var/log/docker.log 2>&1 &
```

### "Scenarios not found"
Check if parent directory has scenarios:
```bash
ls /root/killercoda-scenarios/
```

Should show all 14 scenario folders.

### "Out of disk space"
```bash
# From host
docker system prune -a
docker volume prune
```

---

## 📚 Resources

- **Your Scenarios**: https://github.com/vj2201/killercoda-scenarios
- **CKA Curriculum**: https://github.com/cncf/curriculum
- **Kind Docs**: https://kind.sigs.k8s.io/
- **kubectl Cheat Sheet**: https://kubernetes.io/docs/reference/kubectl/cheatsheet/

---

## 🙏 Credits

- **Your Killercoda scenarios** - Perfect CKA exam prep content
- **Kind** (Kubernetes SIG) - Local cluster tool
- **Docker** - Container platform

---

## 📄 License

Same as parent repository.

---

**Ready to practice? Run `./build.sh` and start your CKA journey! 🚀**
