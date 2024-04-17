---
title: Ubuntu Server para Despliegues Automáticos
slug: 2024-04-15-my-first-post
description: Aprende a configurar Ubuntu Server con Docker, Kubernetes y ArgoCD para despliegues automáticos. Guía paso a paso para construir y administrar aplicaciones de manera eficiente y escalable.
coverImage: 'server.webp'
date: 2024-04-15
tags: ['ubuntu', 'kubernetes', 'argocd']
---

## Introducción

Bienvenidos a mi blog. En esta primera entrada, quiero compartir cómo he configurado mi nuevo miniPC para utilizarlo como servidor. He elegido Ubuntu Server como sistema operativo y he implementado herramientas como Docker, Kubernetes y ArgoCD para desplegar aplicaciones de manera eficiente y escalable. Acompáñame en este recorrido por la configuración y las posibilidades que estas tecnologías pueden ofrecer.

### ¿Qué vamos a lograr?

El objetivo de este artículo es guiarte a través de la instalación y configuración de Ubuntu Server, y prepararlo para correr contenedores con Docker y orquestarlos con Kubernetes y ArgoCD. Esto te permitirá tener un ambiente robusto y escalable para despliegues automáticos.
Además, aprenderás a construir una aplicación usando Docker, a publicar la imagen en GitHub, y finalmente, a desplegarla en tu servidor utilizando ArgoCD. Te proporcionaré todos los pasos necesarios para llevar a cabo estos procesos.

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
Una vez tenemos instalado Autopilot y configurado correctamente kubectl, el siguiente paso será crear un **Token de Git** para utilizarlo en autopilot.
##### Generar un Token de GitHub para Autopilot

1. Ve a los ajustes de tu cuenta de GitHub > Developer settings > [Personal access tokens](https://github.com/settings/tokens).
2. Genera un nuevo token ajustando el periodo de validez y los permisos necesarios (marcando la casilla "repo" es suficiente).
3. **Es importante copiar el token antes de salir de la página, ya que no podrás volver a verlo**

Una vez generado el token de GitHub y definida la URL del repositorio, procederemos a configurar el entorno para el arranque de ArgoCD utilizando Autopilot. Primero, configura las variables de entorno necesarias en la terminal donde Autopilot ha sido instalado:

```bash
# Nuestro token de Git
export GIT_TOKEN=ghp_d3nrpZHPTCGAOYBZop1VDCBDHQVgTj0OYxPu

# La URL de nuestro repositorio
export GIT_REPO=https://github.com/LaraPruna/autopilot.git
```
Ejecuta el siguiente comando para iniciar el proceso de instalación de ArgoCD y su configuración en tu clúster de Kubernetes:

```bash
argocd-autopilot repo bootstrap
```

Este comando realizará las siguientes acciones:

- Creará el repositorio en GitHub si no existe (o utilizará el existente).
- Configurará tres directorios principales dentro del repositorio: apps, bootstrap, y projects.
- Instalará ArgoCD en tu clúster de Kubernetes.

Al final de la instalación, se te proporcionará información, como el usuario y la contraseña para acceder a ArgoCD, y el comando necesario para establecer un port-forward y acceder a la interfaz de usuario de ArgoCD desde tu navegador local:

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
Si olvidas la contraseña del administrador de ArgoCD, puedes recuperarla fácilmente utilizando el siguiente comando, que consulta el secreto inicial de administrador almacenado en Kubernetes:

```bash
kubectl get secret argocd-initial-admin-secret -n argocd -ogo-template='{{printf "%s\n" (index (index . "data") "password" | base64decode)}}'
```

Para comenzar a organizar tus aplicaciones, primero crea un proyecto en ArgoCD con el siguiente comando:

```bash
argocd-autopilot project create my-project
```
Este comando configura un nuevo proyecto llamado my-project en ArgoCD, proporcionando un espacio aislado para gestionar las aplicaciones relacionadas.

Por último, instalamos nuestra primera aplicación en el proyecto. Antes de instalar tu primera aplicación, asegúrate de tener un repositorio para ella. Puedes usar una aplicación de prueba proporcionada en la documentación de Autopilot para entender cómo funciona el proceso. Instala la aplicación en el proyecto que acabas de crear utilizando el siguiente comando:

```bash
argocd-autopilot app create demoapp --app github.com/argoproj-labs/argocd-autopilot/examples/demo-app/ -p my-project
```
Este comando crea una aplicación llamada demoapp bajo el proyecto my-project, utilizando una aplicación de demostración disponible en los ejemplos de Autopilot.

#### Utilizar port-forward en tu máquina local

Para conectarte a tu clúster de Kubernetes remoto desde tu máquina local y poder acceder a la interfaz web de ArgoCD:

##### Paso 1: Instalar kubectl

Primero, instala kubectl en tu máquina local. La manera de instalarlo puede variar según tu sistema operativo. Aquí te muestro cómo hacerlo para los sistemas operativos más comunes:

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

##### Paso 2: Configurar acceso al clúster

Para que **kubectl** se conecte a tu clúster de Kubernetes remoto, necesitarás configurar tus credenciales y la información del clúster en el archivo ~/.kube/config de tu máquina local.

Procedemos a exportar la configuración de MicroK8s de nuestro servidor.

```bash
microk8s config
```
Copia la salida de este comando y guárdala como tu archivo ~/.kube/config en tu máquina local.

Si aún no tienes un directorio .kube, créalo en tu directorio home:

```bash
mkdir -p ~/.kube
```

Abre un nuevo archivo llamado config dentro de este directorio con tu editor de texto.

```bash
vim ~/.kube/config
```
Pega la configuración que copiaste desde tu servidor en este archivo.

Por último, verifica la configuración:

```bash
kubectl get nodes
```
Deberías ver una lista de los nodos en tu clúster de MicroK8s, algo similar a esto:

```bash
NAME            STATUS   ROLES    AGE    VERSION
bermellserver   Ready    <none>   3h4m   v1.28.7
```

##### Paso 3: Reenvío de Puerto para Argo CD

Ahora deberías poder acceder a la interfaz web. puedes usar el siguiente comando para reenviar un puerto local a la interfaz web de Argo CD en tu clúster:

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```
Este comando reenviará el puerto 8080 de tu máquina local al puerto 443 del servicio argocd-server en el espacio de nombres argocd. Puedes abrir un navegador web y acceder a la interfaz de Argo CD mediante http://localhost:8080.
