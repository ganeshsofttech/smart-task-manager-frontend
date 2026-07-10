https://docs.google.com/document/d/1nASfCGtePeVVl0SDHkO-ePFy1npfez-Z/edit
ubuntu@ip-172-31-41-201:~$ history

    1  clear
    2  sudo apt update
    3  sudo apt install docker.* -y
    4  docker --version
    5  docker images
    6  sudo docker images
    7  history
    
    sudo usermod -aG docker $USER
    newgrp docker
 
   44 docker search hello-world
   45  docker pull ubuntu
   47  docker pull ubuntu:20.04
   48  docker images
   49  clear
   50  #docker run command
   51  #docker run <run-mode> -n <container-name> -e <env> -p <port> <image-name>
   55  docker run -it -d --name demo-container ubuntu
   56  docker ps -a
   57  docker images
   59  docker run -it -d --name container-new ubuntu:18.04
