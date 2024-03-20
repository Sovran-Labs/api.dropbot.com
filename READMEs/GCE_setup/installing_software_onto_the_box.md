# TDLR + TOC

Setting up Dropbot backend...

1. Provision a VM
1. Add SSH key to GCP project for SSH'ing into the box
1. Install nginx
1. Install docker
1. Install .git and clone repo to VM
1. STUPID - copy `service-account.json`, create `tmp` dir, & create `tmp/cropped_images` dir
1. Run the components
    - API + worker
    - Temporal
    - Mongo
1. Connect nginx to the API
1. FINALLY STEPS FOR DEPLOYING TO GCE BOX

## Provision a VM

### VM SPECS

```
N2 - Intel Cascade Lake and Ice Lake 
Debian GNU/Linux 12 (x86/64, amd64)
Identity and API Access - Default compute service account
Access scopes - Default access
Firewall
    - Allow HTTP
    - Allow HTTPS
    - Allow Load Balancer Health Checks
```

## Add SSH key to GCP project for SSH'ing into the box

Go to `Google Compute Engine > Settings > Metadata` section and add an SSH key to the project where the `instance-20240312-042601` instance is hosted

ie: `<ssh_protocol> <public_key> <user@ip_of_gce_vm>

### test SSH'ing in

ssh -i ~/.ssh/db_id_ed25519 tad@35.222.77.137 √

### Verify Linux distro
 
- cat /etc/os-release √
- Debian GNU/Linux 12 (bookworm) √

## Install nginx

- sudo apt-get update √
- sudo apt-get install nginx -y √
- sudo nginx -v √

### Test nginx

- sudo service nginx status √
- curl -I 127.0.0.1 √

### Testing hitting nginx server from outside the instance

- curl -X GET http://35.222.77.137 √

## Install docker

https://docs.docker.com/engine/install/debian/

- sudo apt-get update √
- sudo apt-get install ca-certificates curl gnupg √
- sudo install -m 0755 -d /etc/apt/keyrings √
- curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg √
- sudo chmod a+r /etc/apt/keyrings/docker.gpg √
- echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null √
- sudo apt-get update √
- sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y √
- sudo docker run hello-world √

## Install .git and clone repo to VM

- sudo apt update √
- sudo apt install git √
- git --version √

### Create an SSH key on GCE VM

- ssh-keygen √
- cat /home/tad/.ssh/id_rsa.pub √

### Add SSH key to Jetbrains spaces

- Navigate to `Preferences > Authentication >  Git Keys` and add the SSH key generated on the `cwd-factory-v5` GCE VM √

### Clone the `openlaw-ai-cwd-factory` onto the GCE VM

- git clone git@github.com:Sovran-Labs/api.dropbot.com.git √

## ANY STUPID EXTRA ISH IF NEEDED

## Run the dropbot

### Temporal

- scp -i ~/.ssh/db_id_ed25519 deploy/dev/mongo_+_temporal/.env tad@35.222.77.137:/home/tad/api.dropbot.com/deploy/dev/mongo_+_temporal/.env √
- cd deploy/dev/mongo_+_temporal
- sudo docker compose -f docker-compose.yml up -d

### Mongo

- cd deploy/dev/mongo
- docker-compose -f docker-compose-mongo.yml up -d

### API + worker

- sudo docker compose -f docker-compose.dev.yml up -d <!--  -->
- sudo docker compose -f docker-compose.dev.yml up --build -d

### USEFUL COMMANDS

- sudo docker compose -f docker-compose.staging.yml up --build -d
- sudo docker ps
- ssh -i ~/.ssh/db_id_ed25519 tad@35.222.77.137
- sudo docker compose -f docker-compose.staging.yml logs -f
- sudo docker compose -f docker-compose.staging.yml down
- sudo docker system prune

## Connect nginx to the factory

Run this on the GCE VM

### Generating SSL certs for nginx

- openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365 <!-- TIP the password must be minimum 4 characters -->
- openssl rsa -in key.pem -out newkey.pem <!-- this removes the password protection on the SSL cert -->
- REFERENCE LINK: https://futurestud.io/tutorials/how-to-remove-pem-password-from-ssl-certificate

### Enable `dropbot` site in with nginx

- cd /etc/nginx/sites-available
- sudo touch dropbot

### Populate `dropbot` with the following content

```
server {
    listen 443 default ssl;
    server_name dropbot;
    ssl_certificate /etc/certs/cert.pem; 
    ssl_certificate_key /etc/certs/key.pem; 

    # logs
    error_log /var/log/nginx/example.com_error.log error;
    access_log /var/log/nginx/example.com_access.log;

    location / { 
        proxy_pass http://127.0.0.1:4000; 
        client_body_temp_path /tmp 1 2;
        client_body_buffer_size 256k;
        client_body_in_file_only off;
    }
}
```

### Create a symlink from sites-enabled to sites-available

- cd /etc/nginx/sites-enabled
- sudo ln -s /etc/nginx/sites-available/dropbot dropbot

### Enable `temporal-ui` site in with nginx

- cd /etc/nginx/sites-available
- sudo touch temporal-ui

### Populate `temporal-ui` with the following content

```
server {
    listen 80;
    server_name temporal-ui;
    
    # logs
    error_log /var/log/nginx/example.com_error.log error;
    access_log /var/log/nginx/example.com_access.log;

    location / { 
        # proxy_pass http://127.0.0.1:8233; 

        proxy_pass http://localhost:8233; # Forward requests to another service on port 8233
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        client_body_temp_path /tmp 1 2;
        client_body_buffer_size 256k;
        client_body_in_file_only off;
    }
}
```

### Create a symlink from sites-enabled to sites-available

- cd /etc/nginx/sites-enabled
- sudo ln -s /etc/nginx/sites-available/temporal-ui temporal-ui

### mv certs to location where nginx can access and reload nginx

- sudo mkdir -p /etc/certs
- cd ~
- sudo mv cert.pem /etc/certs/cert.pem
- sudo mv newkey.pem /etc/certs/key.pem

### Reload nginx

- sudo nginx -s reload
- sudo systemctl restart nginx
- sudo nginx -t

### Check nginx status

- sudo systemctl status nginx

### Set up Firewall on Debian

- sudo apt install ufw
- sudo ufw app list
- sudo ufw status
- sudo ufw allow 'Nginx Full'
- sudo ufw allow 22
- sudo ufw enable
- sudo ufw status

### Testing the ssl connection with cURL

curl --insecure https://34.70.172.84/healthcheck

## FINALLY STEPS FOR DEPLOYING TO GCE BOX

- ssh -i ~/.ssh/db_id_ed25519 tad@35.222.77.137
- cd to `api.dropbot.com`
- git pull
- sudo docker compose -f docker-compose.dev.yml down
- sudo docker compose -f docker-compose.yml up -d
- sudo docker compose -f docker-compose.yml up --build -d
- sudo docker ps <!-- to validate -->
- sudo docker compose -f docker-compose.dev.yml logs -f <!-- to validate -->
- SMOKE TEST: `curl --insecure -H "Content-Type: application/json" -X POST -d '{}' https://35.222.77.137/health`
- SMOKE TEST: `curl --insecure -X GET -d '{}' https://35.222.77.137/health`

## USEFUL TIPS

- scp -i ~/.ssh/db_id_ed25519 deploy/dev/mongo_+_temporal/.env tad@35.222.77.137:/home/tad/api.dropbot.com/deploy/dev/mongo_+_temporal/.env
- scp -i ~/.ssh/db_id_ed25519 .env tad@35.222.77.137:/home/tad/api.dropbot.com/.env
- sudo docker compose -f docker-compose.yml up --build -d
- sudo docker compose -f docker-compose.yml logs api.dropbot.com
- sudo docker compose -f docker-compose.yml logs -f
- sudo docker compose -f docker-compose.yml up --build -d
- sudo docker compose -f docker-compose.yml logs api -f
- sudo docker compose -f docker-compose.yml logs temporal-ui -f


- sudo docker compose -f docker-compose.yml up api -d
- sudo docker compose -f docker-compose.yml up api --build -d


## Git stats 3-12-2024

ALL TIME
Frontend
84 Tad
35 Steve
7 Aaron
Backend
191 Tad
119 Steve
28 Aaron
6 Patrick

PAST MONTH
Frontend
72 Tad
23  Steven Bailey
1  Aaron Signorelli
Backend
69 Tad
37  Steven Bailey
1  Aaron Signorelli

PAST WEEK
Frontend
27 Tad
1  Aaron Signorelli
0 Steve
Backend
29 Tad
1 Aaron
1 Steve