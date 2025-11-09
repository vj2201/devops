# Lab: Kubernetes Network Policies

## Objective
Learn how to secure pod-to-pod communication using Kubernetes Network Policies.

## Scenario
You have a multi-tier application with:
- **Frontend** pods (nginx) that need to communicate with **Backend** pods
- **Backend** pods (API server) that need to communicate with **Database** pods
- **Database** pods (postgres) that should ONLY be accessible by Backend pods

Your task: Implement network policies to enforce this security model.

## Duration
30-45 minutes

## Prerequisites
- Basic understanding of Kubernetes pods and services
- Familiarity with YAML syntax
- Understanding of network concepts (ingress/egress)

---

## Setup

Run the setup script to create the initial environment:

```bash
cd /root/labs/network-policy-lab
bash setup.sh
```

This will create:
- Namespace: `secure-app`
- 3 frontend pods (labeled `tier=frontend`)
- 3 backend pods (labeled `tier=backend`)
- 1 database pod (labeled `tier=database`)
- Services for each tier

---

## Tasks

### Task 1: Verify Current State (Insecure)

**Goal**: Confirm that all pods can communicate with each other (default behavior).

```bash
# Get all pods in the namespace
kubectl get pods -n secure-app

# Test: Can frontend reach database? (Should work - INSECURE!)
kubectl exec -n secure-app -it frontend-0 -- curl -s http://database:5432

# Test: Can frontend reach backend? (Should work - EXPECTED)
kubectl exec -n secure-app -it frontend-0 -- curl -s http://backend:8080/health
```

**Expected**: All connections work (insecure state).

---

### Task 2: Deny All Ingress Traffic by Default

**Goal**: Create a default-deny policy for the namespace.

Create a NetworkPolicy that:
- Applies to all pods in `secure-app` namespace
- Denies all ingress traffic by default

<details>
<summary>Hint</summary>

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: secure-app
spec:
  podSelector: {}  # Empty selector = all pods
  policyTypes:
  - Ingress
  # No ingress rules = deny all
```
</details>

**Test**:
```bash
# Apply your policy
kubectl apply -f deny-all.yaml

# Verify: Nothing should work now
kubectl exec -n secure-app -it frontend-0 -- curl -s --max-time 5 http://backend:8080/health
# Should timeout!
```

---

### Task 3: Allow Frontend → Backend Communication

**Goal**: Create a policy allowing frontend pods to reach backend pods.

Create a NetworkPolicy that:
- Applies to **backend** pods (`tier=backend`)
- Allows ingress from **frontend** pods (`tier=frontend`)
- Allows traffic on port 8080

<details>
<summary>Hint</summary>

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: secure-app
spec:
  podSelector:
    matchLabels:
      tier: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          tier: frontend
    ports:
    - protocol: TCP
      port: 8080
```
</details>

**Test**:
```bash
# Apply policy
kubectl apply -f allow-frontend-to-backend.yaml

# Should work now
kubectl exec -n secure-app -it frontend-0 -- curl -s http://backend:8080/health

# Should still fail (frontend → database blocked)
kubectl exec -n secure-app -it frontend-0 -- curl -s --max-time 5 http://database:5432
```

---

### Task 4: Allow Backend → Database Communication

**Goal**: Create a policy allowing backend pods to reach the database.

Create a NetworkPolicy that:
- Applies to **database** pod (`tier=database`)
- Allows ingress from **backend** pods (`tier=backend`)
- Allows traffic on port 5432

**Test**:
```bash
# Apply policy
kubectl apply -f allow-backend-to-database.yaml

# Should work (backend → database)
kubectl exec -n secure-app -it backend-0 -- nc -zv database 5432

# Should fail (frontend → database still blocked)
kubectl exec -n secure-app -it frontend-0 -- nc -zv database 5432
```

---

### Task 5: Allow DNS Traffic (Critical!)

**Goal**: Allow all pods to reach CoreDNS for name resolution.

**Why?** Without this, pods can't resolve service names!

Create a NetworkPolicy that:
- Applies to all pods in `secure-app`
- Allows egress to `kube-system` namespace
- Allows traffic on port 53 (DNS)

<details>
<summary>Hint</summary>

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns
  namespace: secure-app
spec:
  podSelector: {}
  policyTypes:
  - Egress
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: kube-system
    ports:
    - protocol: UDP
      port: 53
```
</details>

---

## Verification

Run the verification script to check your work:

```bash
bash verify.sh
```

Expected output:
```
✓ Frontend → Backend: OK
✓ Backend → Database: OK
✗ Frontend → Database: BLOCKED (correct!)
✓ DNS resolution: OK
✓ All tests passed!
```

---

## Solution

If you get stuck, check the solution files:

```bash
ls solution-*.yaml
cat solution-deny-all.yaml
cat solution-allow-frontend-to-backend.yaml
cat solution-allow-backend-to-database.yaml
cat solution-allow-dns.yaml
```

To apply all solutions:
```bash
kubectl apply -f solution-*.yaml
```

---

## Cleanup

```bash
kubectl delete namespace secure-app
```

---

## Key Takeaways

1. **Default Deny**: Always start with a default-deny policy
2. **Least Privilege**: Only allow necessary traffic
3. **Label Selectors**: Use pod labels to target policies
4. **DNS is Critical**: Don't forget to allow DNS traffic!
5. **Test Thoroughly**: Verify both allowed and blocked traffic

---

## Further Reading

- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [NetworkPolicy Editor](https://editor.cilium.io/)
- [Network Policy Recipes](https://github.com/ahmetb/kubernetes-network-policy-recipes)

---

**Next Lab**: [Gateway API Migration](../gateway-migration-lab/)
