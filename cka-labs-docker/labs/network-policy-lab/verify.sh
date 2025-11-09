#!/bin/bash

echo "================================"
echo "  Network Policy Verification"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get pod names
FRONTEND_POD=$(kubectl get pod -n secure-app -l tier=frontend -o jsonpath='{.items[0].metadata.name}')
BACKEND_POD=$(kubectl get pod -n secure-app -l tier=backend -o jsonpath='{.items[0].metadata.name}')
DATABASE_POD=$(kubectl get pod -n secure-app -l tier=database -o jsonpath='{.items[0].metadata.name}')

if [ -z "$FRONTEND_POD" ] || [ -z "$BACKEND_POD" ] || [ -z "$DATABASE_POD" ]; then
    echo -e "${RED}ERROR: Pods not found. Did you run setup.sh?${NC}"
    exit 1
fi

echo "Testing with pods:"
echo "  Frontend: $FRONTEND_POD"
echo "  Backend:  $BACKEND_POD"
echo "  Database: $DATABASE_POD"
echo ""

# Test 1: Frontend → Backend (should work)
echo -n "Test 1: Frontend → Backend... "
if kubectl exec -n secure-app -it $FRONTEND_POD -- timeout 5 curl -s http://backend:8080 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ PASS${NC} (allowed)"
    TEST1=1
else
    echo -e "${RED}✗ FAIL${NC} (should be allowed)"
    TEST1=0
fi

# Test 2: Backend → Database (should work)
echo -n "Test 2: Backend → Database... "
if kubectl exec -n secure-app -it $BACKEND_POD -- timeout 5 nc -zv database 5432 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ PASS${NC} (allowed)"
    TEST2=1
else
    echo -e "${RED}✗ FAIL${NC} (should be allowed)"
    TEST2=0
fi

# Test 3: Frontend → Database (should fail - blocked!)
echo -n "Test 3: Frontend → Database... "
if kubectl exec -n secure-app -it $FRONTEND_POD -- timeout 5 nc -zv database 5432 > /dev/null 2>&1; then
    echo -e "${RED}✗ FAIL${NC} (should be BLOCKED!)"
    TEST3=0
else
    echo -e "${GREEN}✓ PASS${NC} (correctly blocked)"
    TEST3=1
fi

# Test 4: DNS resolution (should work)
echo -n "Test 4: DNS resolution... "
if kubectl exec -n secure-app -it $FRONTEND_POD -- nslookup backend > /dev/null 2>&1; then
    echo -e "${GREEN}✓ PASS${NC} (DNS working)"
    TEST4=1
else
    echo -e "${YELLOW}⚠ WARN${NC} (DNS might be blocked - check egress policies)"
    TEST4=0
fi

# Test 5: Check if default-deny policy exists
echo -n "Test 5: Default-deny policy... "
if kubectl get networkpolicy -n secure-app default-deny-ingress > /dev/null 2>&1; then
    echo -e "${GREEN}✓ PASS${NC} (policy exists)"
    TEST5=1
else
    echo -e "${YELLOW}⚠ WARN${NC} (default-deny policy not found)"
    TEST5=0
fi

# Summary
echo ""
echo "================================"
TOTAL=$((TEST1 + TEST2 + TEST3 + TEST4 + TEST5))
if [ $TOTAL -eq 5 ]; then
    echo -e "${GREEN}✓ All tests passed! ($TOTAL/5)${NC}"
    echo "Network policies are correctly configured!"
else
    echo -e "${YELLOW}⚠ Some tests failed ($TOTAL/5)${NC}"
    echo ""
    echo "Debug tips:"
    echo "  kubectl get networkpolicy -n secure-app"
    echo "  kubectl describe networkpolicy -n secure-app <policy-name>"
    echo "  kubectl get pods -n secure-app --show-labels"
fi
echo "================================"
echo ""

# Show current policies
echo "Current Network Policies:"
kubectl get networkpolicy -n secure-app -o wide
echo ""

exit $((5 - TOTAL))
