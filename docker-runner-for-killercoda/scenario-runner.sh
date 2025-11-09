#!/bin/bash
# Killercoda Scenario Runner for Local Execution
# Runs your GitHub scenarios in local Docker/Kind environment

set -e

SCENARIOS_DIR="/root/killercoda-scenarios"
SCENARIO_NAME="$1"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

function print_header() {
    echo ""
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}================================${NC}"
    echo ""
}

function print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

function print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

function print_error() {
    echo -e "${RED}✗ $1${NC}"
}

function list_scenarios() {
    print_header "Available Scenarios"

    if [ ! -d "$SCENARIOS_DIR" ]; then
        print_error "Scenarios not found. Run: git clone https://github.com/vj2201/killercoda-scenarios /root/killercoda-scenarios"
        exit 1
    fi

    echo "From: https://github.com/vj2201/killercoda-scenarios"
    echo ""

    for dir in "$SCENARIOS_DIR"/*/; do
        if [ -f "$dir/index.json" ]; then
            scenario=$(basename "$dir")

            # Extract info from index.json
            title=$(jq -r '.title // "No title"' "$dir/index.json" 2>/dev/null || echo "No title")
            difficulty=$(jq -r '.difficulty // "Unknown"' "$dir/index.json" 2>/dev/null || echo "Unknown")
            time=$(jq -r '.time // "Unknown"' "$dir/index.json" 2>/dev/null || echo "Unknown")

            echo -e "${GREEN}$scenario${NC}"
            echo "  Title: $title"
            echo "  Difficulty: $difficulty | Time: $time"
            echo ""
        fi
    done

    echo "Usage: scenario-runner <scenario-name>"
    echo "Example: scenario-runner network-policy-lab"
}

function run_scenario() {
    local scenario_path="$SCENARIOS_DIR/$SCENARIO_NAME"

    if [ ! -d "$scenario_path" ]; then
        print_error "Scenario '$SCENARIO_NAME' not found!"
        echo ""
        list_scenarios
        exit 1
    fi

    if [ ! -f "$scenario_path/index.json" ]; then
        print_error "Invalid scenario: index.json not found"
        exit 1
    fi

    # Read scenario metadata
    TITLE=$(jq -r '.title // "Untitled"' "$scenario_path/index.json")
    DESCRIPTION=$(jq -r '.description // ""' "$scenario_path/index.json")
    DIFFICULTY=$(jq -r '.difficulty // "Unknown"' "$scenario_path/index.json")
    TIME=$(jq -r '.time // "Unknown"' "$scenario_path/index.json")

    print_header "$TITLE"

    echo -e "${BLUE}Description:${NC} $DESCRIPTION"
    echo -e "${BLUE}Difficulty:${NC} $DIFFICULTY"
    echo -e "${BLUE}Time:${NC} $TIME"
    echo ""

    # Run background setup (like Killercoda does)
    SETUP_SCRIPT="$scenario_path/setup.sh"
    if [ -f "$SETUP_SCRIPT" ]; then
        print_info "Running environment setup (background)..."
        bash "$SETUP_SCRIPT" > /tmp/setup.log 2>&1 &
        SETUP_PID=$!
        echo "Setup running in background (PID: $SETUP_PID)"
        echo "Log: tail -f /tmp/setup.log"
        echo ""
        sleep 2  # Give setup a moment to start
    fi

    # Run foreground script (visible to user)
    FOREGROUND_SCRIPT="$scenario_path/foreground.sh"
    if [ -f "$FOREGROUND_SCRIPT" ]; then
        print_info "Running foreground setup..."
        bash "$FOREGROUND_SCRIPT"
        echo ""
    fi

    # Display intro
    INTRO_FILE="$scenario_path/intro.md"
    if [ -f "$INTRO_FILE" ]; then
        print_header "Lab Instructions"
        cat "$INTRO_FILE"
        echo ""
    fi

    # Wait for setup to complete
    if [ -n "$SETUP_PID" ]; then
        print_info "Waiting for environment setup to complete..."
        wait $SETUP_PID 2>/dev/null || true
        print_success "Environment ready!"
        echo ""
    fi

    print_header "Ready to Start!"

    echo "You can now work on the lab tasks."
    echo ""
    echo "Available commands:"
    echo "  show-solution     - View the solution"
    echo "  show-finish       - View completion message"
    echo "  cleanup           - Clean up lab resources (if available)"
    echo "  kubectl ...       - Work on your tasks"
    echo ""

    # Create helper commands
    cat > /tmp/show-solution.sh <<EOF
#!/bin/bash
if [ -f "$scenario_path/solution.md" ]; then
    echo ""
    echo "================================"
    echo "  SOLUTION"
    echo "================================"
    echo ""
    cat "$scenario_path/solution.md"
    echo ""
else
    echo "No solution file found."
fi
EOF
    chmod +x /tmp/show-solution.sh

    cat > /tmp/show-finish.sh <<EOF
#!/bin/bash
if [ -f "$scenario_path/finish.md" ]; then
    echo ""
    echo "================================"
    echo "  CONGRATULATIONS!"
    echo "================================"
    echo ""
    cat "$scenario_path/finish.md"
    echo ""
else
    echo "Great job completing the lab!"
fi
EOF
    chmod +x /tmp/show-finish.sh

    cat > /tmp/cleanup.sh <<EOF
#!/bin/bash
if [ -f "$scenario_path/cleanup.sh" ]; then
    echo "Running cleanup..."
    bash "$scenario_path/cleanup.sh"
else
    echo "No cleanup script available."
    echo "You can manually clean up resources if needed."
fi
EOF
    chmod +x /tmp/cleanup.sh

    # Add to PATH
    export PATH="/tmp:$PATH"

    # Make commands available as functions in current shell
    alias show-solution='/tmp/show-solution.sh'
    alias show-finish='/tmp/show-finish.sh'
    alias cleanup='/tmp/cleanup.sh'

    echo "Type 'show-solution' when you need help!"
}

# Main execution
if [ -z "$SCENARIO_NAME" ]; then
    list_scenarios
    exit 0
fi

if [ "$SCENARIO_NAME" == "list" ] || [ "$SCENARIO_NAME" == "--list" ] || [ "$SCENARIO_NAME" == "-l" ]; then
    list_scenarios
    exit 0
fi

run_scenario

# Keep shell open (scenario is active)
exec /bin/bash
