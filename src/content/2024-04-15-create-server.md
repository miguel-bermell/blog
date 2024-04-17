---
title: Creando un servidor con ubuntu server
slug: 2024-04-15-my-first-post
description: En esta ocasión, voy a explicar cómo crear desde 0 un servidor y configurarlo junto con Docker, Kubernetes y ArgoCD
coverImage: 'server.webp'
date: 2024-04-15
tags: ['ubuntu', 'kubernetes', 'argocd']
---

## Introducción

Bienvenidos a mi blog. En esta primera entrada, quiero compartir cómo he configurado mi nuevo miniPC para utilizarlo como servidor. He elegido Ubuntu Server como sistema operativo y he implementado herramientas como Docker, Kubernetes y ArgoCD para desplegar aplicaciones de manera eficiente y escalable. Acompáñame en este recorrido por la configuración y las posibilidades que estas tecnologías pueden ofrecer.

### ¿Qué vamos a lograr?

El objetivo de este artículo es guiarte a través de la instalación y configuración de Ubuntu Server, y prepararlo para correr contenedores con Docker y orquestarlos con Kubernetes y ArgoCD. Esto te permitirá tener un ambiente robusto y escalable para despliegues automáticos.

### Instalación de Ubuntu Server

Visita la página oficial de [Ubuntu](https://ubuntu.com/download/server) para descargar la imagen ISO de Ubuntu Server. La instalación es bastante estándar, pero me gustaría destacar algunos puntos clave:

- **Instalación de OpenSSH:** Es esencial para administrar tu servidor de manera remota.
- **Configuración de red:** Opta por configurar una IP estática en vez de utilizar DHCP. Esto asegura que siempre puedas acceder al servidor utilizando la misma dirección IP.

#### Configuración de red detallada

Aquí un ejemplo de cómo configurar una dirección IP estática durante la instalación de Ubuntu Server:

```bash
auto enp3s0
iface enp3s0 inet static
    subnet: 192.168.0.0/24
    address 192.168.1.100
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4
```

### Configuración inicial Docker, Kubernetes y ArgoCD

#### Paso 1: Actualizar el Sistema
Antes de instalar cualquier dependencia, es una buena práctica actualizar lo existente:

```bash
sudo apt update
sudo apt upgrade -y
```

#### Paso 2: Instalar Docker
Docker es fundamental para contenerizar las aplicaciones. Aunque MicroK8s incluye su propio mecanismo para manejar contenedores, es posible que desees tener Docker instalado para tareas de manejo de imágenes o contenedores fuera de Kubernetes.

```bash
sudo apt install docker.io -y
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```
Recuerda cerrar la sesión en SSH y volver a iniciarla para que los cambios en los grupos de usuarios tengan efecto.

#### Paso 3: Instalar MicroK8s
MicroK8s es una distribución de Kubernetes ligera, ideal para pequeñas cargas de trabajo. Viene con un conjunto de complementos que puedes habilitar según sea necesario.

```bash
sudo snap install microk8s --classic
sudo usermod -aG microk8s $USER
sudo chown -f -R $USER ~/.kube
```
Al igual que con Docker, necesitarás cerrar sesión y volver a iniciarla.

Para facilitar el uso del clúster de MicroK8s, es útil establecer un alias en tu entorno:

```bash
echo "alias kubectl='microk8s kubectl'" >> ~/.bashrc
source ~/.bashrc
```
Con este alias, podrás usar el comando **kubectl** directamente sin necesidad de prefijos adicionales.

Asegúrate de que kubectl esté configurado correctamente y pueda acceder a tu clúster. Puedes verificarlo ejecutando:

```bash
kubectl get nodes
```

Si puedes ver los nodos de tu clúster, estás listo para continuar.

#### Paso 4: Habilitar Complementos en MicroK8s
Para potenciar MicroK8s, es recomendable habilitar ciertos complementos esenciales para tus operaciones.

```bash
microk8s enable dns storage
```

#### Paso 5: Instalar y Configurar Argo CD
ArgoCD es una herramienta de entrega continua, que permite la implementación automática de aplicaciones en un entorno de Kubernetes.
Hay varias formas de instalar/configurar ArgoCD, en este caso lo haremos utilizando [Autopilot](https://github.com/argoproj-labs/argocd-autopilot) (Autopilot es una herramienta diseñada para simplificar y automatizar la configuración y gestión de Argo CD, especialmente en entornos de producción.)

**Utilizando brew:**

```bash
# install
brew install argocd-autopilot

# check the installation
argocd-autopilot version
```

**Utilizando curl:**
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
##### Configurar kubectl para usar MicroK8s como contexto por defecto
```bash
microk8s config > ~/.kube/config
```
Este comando exporta la configuración de MicroK8s a tu archivo ~/.kube/config, que es el archivo de configuración estándar utilizado por kubectl. Este paso es importante porque muchos otros comandos y herramientas de Kubernetes, incluido argocd-autopilot, utilizan este archivo para conectarse al clúster de Kubernetes.

Puedes verificar que el contexto correcto esté configurado con:
```bash
kubectl config get-contexts
```
Deberías ver algo similar a esto en tu terminal, confirmando que **microk8s** es el contexto activo:
```bash
CURRENT   NAME       CLUSTER            AUTHINFO   NAMESPACE
*         microk8s   microk8s-cluster   admin
```
