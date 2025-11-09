# 📦 How to Add docker-runner to Your killercoda-scenarios Repo

Follow these steps to add the Docker runner to your existing `killercoda-scenarios` repository.

---

## 🎯 Goal

Add this folder structure to your repo:

```
killercoda-scenarios/
├── cert-manager-lab/
├── network-policy-lab/
├── ... (your 14 scenarios)
└── docker-runner/           ← NEW!
    ├── Dockerfile
    ├── build.sh
    ├── run.sh
    ├── scenario-runner.sh
    ├── entrypoint.sh
    └── README.md
```

---

## 📋 Option 1: Manual Copy (Easiest)

### Step 1: Download the docker-runner Files

The files are ready in: `/home/user/devops/docker-runner-for-killercoda/`

### Step 2: Copy to Your Local killercoda-scenarios Repo

On your local computer:

```bash
# Clone your repo (if not already)
git clone https://github.com/vj2201/killercoda-scenarios.git
cd killercoda-scenarios

# Create docker-runner folder
mkdir docker-runner

# Copy files from this location to docker-runner/
# (You'll need to download these files from the devops repo first)
```

### Step 3: Files to Copy

Copy these 6 files to `killercoda-scenarios/docker-runner/`:

1. ✅ `Dockerfile`
2. ✅ `build.sh`
3. ✅ `run.sh`
4. ✅ `scenario-runner.sh`
5. ✅ `entrypoint.sh`
6. ✅ `README.md`

### Step 4: Commit and Push

```bash
cd killercoda-scenarios
git add docker-runner/
git commit -m "Add Docker runner to run scenarios locally

- Run all 14 Killercoda scenarios without Killercoda platform
- Uses Docker + Kind for local Kubernetes cluster
- Zero cost ($0/month local use)
- Includes CKA exam tools and shortcuts
"
git push origin main
```

---

## 📋 Option 2: Using Git (If You Have Access to Both Repos)

### Step 1: Copy Files Using Git

```bash
# From the devops repo
cd /path/to/devops
cp -r docker-runner-for-killercoda /tmp/docker-runner

# To killercoda-scenarios repo
cd /path/to/killercoda-scenarios
cp -r /tmp/docker-runner ./docker-runner

# Commit
git add docker-runner/
git commit -m "Add Docker runner for local scenario execution"
git push
```

---

## 📋 Option 3: Download from devops Repo

If the files are in your `vj2201/devops` repo:

### Step 1: Clone devops Repo

```bash
git clone https://github.com/vj2201/devops.git
cd devops
git checkout claude/au-classifieds-mvp-analysis-011CUpdZefdVoh6T8mw95V61
```

### Step 2: Copy docker-runner Files

```bash
# Create docker-runner in killercoda-scenarios
cd /path/to/killercoda-scenarios
mkdir docker-runner

# Copy from devops repo
cp /path/to/devops/docker-runner-for-killercoda/* docker-runner/

# Or if using the old cka-labs-docker (need to update paths):
# Don't use this - use docker-runner-for-killercoda instead
```

### Step 3: Verify Files

```bash
cd killercoda-scenarios/docker-runner
ls -la
```

Should see:
```
-rw-r--r-- Dockerfile
-rwxr-xr-x build.sh
-rwxr-xr-x run.sh
-rwxr-xr-x scenario-runner.sh
-rwxr-xr-x entrypoint.sh
-rw-r--r-- README.md
```

### Step 4: Make Scripts Executable (if needed)

```bash
chmod +x build.sh run.sh scenario-runner.sh entrypoint.sh
```

### Step 5: Commit and Push

```bash
git add docker-runner/
git commit -m "Add Docker runner - Run Killercoda scenarios locally"
git push origin main
```

---

## ✅ Verification

After adding, your repo should look like:

```
killercoda-scenarios/
├── README.md                   (your existing README)
├── cert-manager-lab/
│   ├── index.json
│   ├── intro.md
│   └── setup.sh
├── network-policy-lab/
│   ├── index.json
│   ├── intro.md
│   ├── setup.sh
│   └── solution.md
├── ... (12 other scenarios)
└── docker-runner/              ← NEWLY ADDED
    ├── Dockerfile              ← NEW
    ├── build.sh                ← NEW
    ├── run.sh                  ← NEW
    ├── scenario-runner.sh      ← NEW
    ├── entrypoint.sh           ← NEW
    └── README.md               ← NEW
```

---

## 🧪 Test It

```bash
cd killercoda-scenarios/docker-runner

# Build (takes 5-10 min first time)
./build.sh

# Run
./run.sh

# Inside container
scenario-runner list
scenario-runner network-policy-lab
```

---

## 📝 Update Main README (Optional but Recommended)

Add this section to your `killercoda-scenarios/README.md`:

```markdown
## 🐳 Run Locally with Docker

Don't want to use Killercoda platform? Run all scenarios locally!

### Quick Start

cd docker-runner
./build.sh
./run.sh

# Inside container
scenario-runner list
scenario-runner network-policy-lab


### Features
- ✅ All 14 scenarios available offline
- ✅ Unlimited practice time (no 60-min limit)
- ✅ 3-node Kubernetes cluster (Kind)
- ✅ CKA exam tools included
- ✅ $0/month cost (local use)

See [docker-runner/README.md](docker-runner/README.md) for details.
```

---

## 🎉 Done!

Once committed, anyone can:

```bash
# Clone your repo
git clone https://github.com/vj2201/killercoda-scenarios.git
cd killercoda-scenarios/docker-runner

# Build and run
./build.sh
./run.sh

# Practice all 14 scenarios locally!
scenario-runner network-policy-lab
```

---

## 📦 Files Location

The ready-to-copy files are in:

**Current location**: `/home/user/devops/docker-runner-for-killercoda/`

**Files**:
- Dockerfile (updated to use scenarios from parent dir)
- build.sh (builds from repo root)
- run.sh (starts container)
- scenario-runner.sh (runs scenarios)
- entrypoint.sh (auto-creates cluster)
- README.md (usage instructions)

---

## ❓ Questions?

- Files not working? Check that build.sh runs from docker-runner directory
- Scenarios not found? Verify parent directory has all 14 scenario folders
- Build fails? Check Docker is running and has 10GB+ space

---

**Next**: Copy files to killercoda-scenarios repo and push!
