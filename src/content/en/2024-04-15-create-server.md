---
title: Ubuntu Server for Automated Deployments
slug: 2024-04-15-create-server-post
description: Learn how to set up Ubuntu Server with Docker, Kubernetes, and ArgoCD for automated deployments. A step-by-step guide to building and managing applications efficiently and scalably.
coverImage: 'server.webp'
date: 2024-04-15
tags: ['ubuntu', 'kubernetes', 'argocd']
---

## Introduction

Welcome to my blog. In this first post, I want to share how I have set up my new miniPC to use it as a server. I have chosen Ubuntu Server as the operating system and implemented tools like Docker, Kubernetes, and ArgoCD to deploy applications efficiently and scalably. Join me on this journey through the setup and possibilities that these technologies can offer.

### What will we achieve?

The goal of this article is to guide you through the installation and setup of Ubuntu Server, and prepare it to run containers with Docker and orchestrate them with Kubernetes and ArgoCD. This will allow you to have a robust and scalable environment for automatic deployments.
Additionally, you will learn to build an application using Docker, to publish the image on GitHub, and finally, to deploy it on your server using ArgoCD. I will provide you all the necessary steps to carry out these processes.

### Installation of Ubuntu Server

Visit the official [Ubuntu](https://ubuntu.com/download/server) page to download the Ubuntu Server ISO image. The installation is quite standard, but I would like to highlight some key points:

- **OpenSSH Installation:** Essential for managing your server remotely.
- **Network Configuration:** Opt for configuring a static IP instead of using DHCP. This ensures you can always access the server using the same IP address.

#### Detailed Network Configuration

Here is an example of how to configure a static IP address during the installation of Ubuntu Server:

```bash
auto enp3s0
iface enp3s0 inet static
    subnet: 192.168.0.0/24
    address 192.168.1.100
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4
```

### Initial Setup of Docker, Kubernetes, and ArgoCD

#### Step 1: Update the System
Before installing any dependencies, it is a good practice to update what exists:

```bash
sudo apt update
sudo apt upgrade -y
```

#### Step 2: Install Docker
Docker is fundamental for containerizing applications. Although MicroK8s includes its own mechanism for handling containers, you might want to have Docker installed for image or container management tasks outside of Kubernetes.

```bash
sudo apt install docker.io -y
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```
Remember to log out of SSH and log back in so that the changes in user groups take effect.

#### Step 3: Install MicroK8s
MicroK8s is a lightweight Kubernetes distribution, ideal for small workloads. It comes with a set of add-ons that you can enable as needed.

```bash
sudo snap install microk8s --classic
sudo usermod -aG microk8s $USER
sudo chown -f -R $USER ~/.kube
```
As with Docker, you will need to log out and log back in.

To facilitate the use of the MicroK8s cluster, it is helpful to set an alias in your environment:

```bash
echo "alias kubectl='microk8s kubectl'" >> ~/.bashrc
source ~/.bashrc
```
With this alias, you can use the **kubectl** command directly without needing additional prefixes.

Make sure that kubectl is correctly configured and can access your cluster. You can verify it by running:

```bash
kubectl get nodes
```

If you can see the nodes of your cluster, you are ready to continue.

#### Step 4: Enable Add-ons in MicroK8s
To empower MicroK8s, it is advisable to enable certain essential add-ons for your operations.

```bash
microk8s enable dns storage
```

#### Step 5: Install and Configure Argo CD
ArgoCD is a continuous delivery tool, which allows the automatic deployment of applications in a Kubernetes environment.
here are several ways to install/configure ArgoCD, in this case, we will do it using [Autopilot](https://github.com/argoproj-labs/argocd-autopilot) (Autopilot is a tool designed to simplify and automate the setup and management of Argo CD, especially in production environments.)

**Using brew:**

```bash
# install
brew install argocd-autopilot

# check the installation
argocd-autopilot version
```

**Using curl:**
```bash
# get the latest version or change to a specific version
VERSION=$(curl --silent "https://api.github.com/repos/argoproj-labs/argocd-autopilot/releases/latest" | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/')

# download and extract the binary
curl -L --output - https://github.com/argoproj-labs/argocd-autopilot/releases/download/$VERSION/argocd-autopilot-linux-amd64.tar.gz | tar zx

# move the binary to your $PATH
sudo mv ./argocd-autopilot-* /usr/local/bin/argocd-autopilot

sudo chmod +x /usr/local/bin/argocd-autopilot

# check the installation
argocd-autopilot version
```
##### Configure kubectl to use MicroK8s as the default context
```bash
microk8s config > ~/.kube/config
```
This command exports the MicroK8s configuration to your ~/.kube/config file, which is the standard configuration file used by kubectl. This step is important because many other Kubernetes commands and tools, including argocd-autopilot, use this file to connect to the Kubernetes cluster.

You can verify that the correct context is configured with:
```bash
kubectl config get-contexts
```
You should see something like this on your terminal, confirming that **microk8s** is the active context:
```bash
CURRENT   NAME       CLUSTER            AUTHINFO   NAMESPACE
*         microk8s   microk8s-cluster   admin
```
Once we have installed Autopilot and correctly configured kubectl, the next step will be to create a **Token de Git** to use it in autopilot.

##### Generate a GitHub Token for Autopilot

1. Go to your GitHub account settings > Developer settings > [Personal access tokens](https://github.com/settings/tokens).
2. Generate a new token adjusting the validity period and necessary permissions (checking the "repo" box is enough).
3. **It is important to copy the token before leaving the page, as you will not be able to see it again**

Once the GitHub token is generated and the repository URL is defined, we will proceed to configure the environment for the startup of ArgoCD using Autopilot. First, set the necessary environment variables in the terminal where Autopilot has been installed:

```bash
# Set the GitHub token as an environmental variable
export GIT_TOKEN=ghp_d3nrpZHPTCGAOYBZop1VDCBDHQVgTj0OYxPu

# Set the URL of your GitHub repository as an environmental variable
export GIT_REPO=https://github.com/miguel-bermell/autopilot.git
```
Run the following command to start the installation process of ArgoCD and its configuration in your Kubernetes cluster:

```bash
argocd-autopilot repo bootstrap
```

This command will perform the following actions:

- Create the repository on GitHub if it does not exist (or use the existing one).
- Configure three main directories within the repository: apps, bootstrap, and projects.
- Install ArgoCD on your Kubernetes cluster.

At the end of the installation, you will be provided with information, such as the username and password to access ArgoCD, and the command needed to establish a port-forward and access the ArgoCD user interface from your local browser:

```bash
INFO pushing bootstrap manifests to repo          
Resolving deltas: 100% (1/1), done.
INFO applying argo-cd bootstrap application       
application.argoproj.io/autopilot-bootstrap created
INFO running argocd login to initialize argocd config 
'admin:login' logged in successfully
Context 'autopilot' updated

INFO argocd initialized. password: **************** 
INFO run:

    kubectl port-forward -n argocd svc/argocd-server 8080:80
```
If you forget the ArgoCD administrator password, you can easily recover it using the following command, which queries the initial administrator secret stored in Kubernetes:

```bash
kubectl get secret argocd-initial-admin-secret -n argocd -ogo-template='{{printf "%s\n" (index (index . "data") "password" | base64decode)}}'
```

To start organizing your applications, first create a project in ArgoCD with the following command:

```bash
argocd-autopilot project create my-project
```
This command sets up a new project called my-project in ArgoCD, providing a separate space to manage related applications.

Lastly, we install our first application in the project. Before installing your first application, make sure you have a repository for it. You can use a test application provided in the Autopilot documentation to understand how the process works. Install the application in the project you just created using the following command:

```bash
argocd-autopilot app create demoapp --app github.com/argoproj-labs/argocd-autopilot/examples/demo-app/ -p my-project
```
This command creates an application called demoapp under the project my-project, using a demo application available in the Autopilot examples.

#### Using port-forward on your local machine

To connect to your remote Kubernetes cluster from your local machine and access the ArgoCD web interface:

##### Step 1: Install kubectl

First, install kubectl on your local machine. The way to install it can vary depending on your operating system. Here I show you how to do it for the most common operating systems:

Linux/curl:
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
```
macOS:
```bash
brew install kubectl
```

Windows con Chocolatey:
```bash
choco install kubernetes-cli
```

##### Step 2: Configure access to the cluster

For **kubectl** to connect to your remote Kubernetes cluster, you will need to configure your credentials and cluster information in the **~/.kube/config** file on your local machine.

Proceed to export the MicroK8s configuration from our server.

```bash
microk8s config
```
Copy the output of this command and save it as your **~/.kube/config** file on your local machine.

If you do not already have a .kube directory, create one in your home directory:

```bash
mkdir -p ~/.kube
```

Open a new file called config in this directory with your text editor.

```bash
vim ~/.kube/config
```
Paste the configuration you copied from your server into this file.

Finally, verify the configuration:

```bash
kubectl get nodes
```
You should see a list of the nodes in your MicroK8s cluster, something like this:

```bash
NAME            STATUS   ROLES    AGE    VERSION
bermellserver   Ready    <none>   3h4m   v1.28.7
```

##### Step 3: Port Forwarding for Argo CD

Now you should be able to access the web interface. you can use the following command to forward a local port to the Argo CD web interface on your cluster:

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

This command will forward port 8080 on your local machine to port 443 of the argocd-server service in the argocd namespace. You can open a web browser and access the Argo CD interface through http://localhost:8080.
