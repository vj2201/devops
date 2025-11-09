#!/bin/bash
set -e

CONTAINER_NAME="cka-lab"
IMAGE_NAME="cka-labs:latest"

echo "================================"
echo "  Starting CKA Labs Environment"
echo "================================"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "ERROR: Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Check if image exists
if ! docker image inspect $IMAGE_NAME > /dev/null 2>&1; then
    echo "ERROR: Image '$IMAGE_NAME' not found."
    echo "Please build it first: ./build.sh"
    exit 1
fi

# Check if container already exists
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "Container '$CONTAINER_NAME' already exists."
    echo ""
    echo "Choose an option:"
    echo "  1) Resume existing container"
    echo "  2) Delete and create new container"
    echo "  3) Open new terminal in existing container"
    echo ""
    read -p "Enter choice (1-3): " choice

    case $choice in
        1)
            echo "Resuming existing container..."
            docker start -i $CONTAINER_NAME
            ;;
        2)
            echo "Deleting existing container..."
            docker rm -f $CONTAINER_NAME
            echo "Creating new container..."
            docker run -it --privileged --name $CONTAINER_NAME $IMAGE_NAME
            ;;
        3)
            echo "Opening new terminal..."
            docker exec -it $CONTAINER_NAME /bin/bash
            ;;
        *)
            echo "Invalid choice. Exiting."
            exit 1
            ;;
    esac
else
    echo "Creating new container '$CONTAINER_NAME'..."
    echo ""
    docker run -it --privileged --name $CONTAINER_NAME $IMAGE_NAME
fi
