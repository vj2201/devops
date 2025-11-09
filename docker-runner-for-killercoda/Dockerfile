FROM ubuntu:22.04

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install base packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    vim \
    nano \
    jq \
    netcat \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    software-properties-common \
    && rm -rf /var/lib/apt/lists/*

# Install Docker
RUN curl -fsSL https://get.docker.com | sh

# Install kubectl (latest stable)
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && chmod +x kubectl \
    && mv kubectl /usr/local/bin/

# Install Kind (Kubernetes in Docker)
RUN curl -Lo /usr/local/bin/kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64 \
    && chmod +x /usr/local/bin/kind

# Install Helm
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Install k9s (optional but useful for exploration)
RUN wget https://github.com/derailed/k9s/releases/download/v0.27.4/k9s_Linux_amd64.tar.gz \
    && tar -xzf k9s_Linux_amd64.tar.gz \
    && mv k9s /usr/local/bin/ \
    && rm k9s_Linux_amd64.tar.gz

# Configure Vim for CKA exam (YAML-optimized)
RUN mkdir -p /root/.vim && cat > /root/.vimrc <<EOF
" CKA/CKAD Vim Configuration
set number
set tabstop=2
set shiftwidth=2
set expandtab
set autoindent
set smartindent
syntax on
set paste
set bg=dark
colorscheme desert

" YAML-specific settings
autocmd FileType yaml setlocal ts=2 sts=2 sw=2 expandtab

" Quick save
nnoremap <C-s> :w<CR>

" Fast navigation
set scrolloff=5
set sidescrolloff=5

" Search settings
set incsearch
set hlsearch
set ignorecase
set smartcase
EOF

# Bash aliases for faster work (CKA exam shortcuts)
RUN cat >> /root/.bashrc <<EOF

# Kubernetes shortcuts (CKA exam style)
alias k=kubectl
alias kg='kubectl get'
alias kd='kubectl describe'
alias kdel='kubectl delete'
alias ka='kubectl apply -f'
alias kl='kubectl logs'
alias kx='kubectl exec -it'

# Fast YAML generation
alias kdr='kubectl run --dry-run=client -o yaml'
alias kdrd='kubectl create deployment --dry-run=client -o yaml'

# Autocomplete
source <(kubectl completion bash)
complete -F __start_kubectl k

# Better prompt
export PS1='\[\033[01;32m\]\u@cka-lab\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
EOF

# Copy Killercoda scenarios from parent directory
# NOTE: Build context should be repo root, not docker-runner folder
# Usage: docker build -f docker-runner/Dockerfile -t cka-labs .
COPY . /root/killercoda-scenarios

# Copy entrypoint script from docker-runner folder
COPY docker-runner/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy scenario runner from docker-runner folder
COPY docker-runner/scenario-runner.sh /usr/local/bin/scenario-runner
RUN chmod +x /usr/local/bin/scenario-runner

# Working directory
WORKDIR /root

# Expose nothing (local use only)
# For web access add: EXPOSE 8080 (ttyd)

# Entrypoint starts Docker daemon and Kind cluster
ENTRYPOINT ["/entrypoint.sh"]
CMD ["/bin/bash"]
