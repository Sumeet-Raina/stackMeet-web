✅ Stack Meet – Deployment Notes (on AWS)

1. Signup on AWS
   Create an AWS account at aws.amazon.com.

Required to access EC2 (Elastic Compute Cloud) and other AWS services.

2. Launch EC2 Instance
   Go to the EC2 Dashboard and launch a new instance.

Choose:

Ubuntu Server 20.04 LTS

t2.micro (free tier eligible)

Create or download a key pair (.pem file) for SSH access.

Configure security group to allow port 22 (SSH) and port 80 (HTTP) access.

3. Set permissions on the .pem file

```
chmod 400 devTinder-secret.pem
```

Ensures the .pem file is secure (read-only by the user).

Without this, SSH will reject the file for being too open.

4. SSH into the EC2 instance

```
ssh -i "stackmeet-secret.pem" ubuntu@--2-??-2--4-9?--.ap-south-1.compute.amazonaws.com
```

Connects to your EC2 instance using the private key.

Replace the IP/domain with your instance’s public DNS/IP.

5. Install Node.js (version 16.17.0)

# Example using Node Version Manager (nvm):

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh |
source ~/.bashrc
nvm install 16.17.0
```

Required to run your frontend build process and manage JavaScript dependencies.

6. Clone your Git repository

```
git clone <repo-url>
cd <repo-folder>
```

Downloads your project code into the instance.

🔧 Frontend Deployment Steps 7. Install dependencies

```
npm install
```

Installs all required Node modules listed in package.json.

8. Build frontend

```
npm run build
```

Generates static files in the dist/ or build/ folder (depending on config).

These are the files that will be served by Nginx.

9. Update package list

```
sudo apt update
```

Ensures your system knows about the latest packages and versions.

10. Install Nginx

```
sudo apt install nginx
```

Nginx will serve the static frontend files to users over HTTP.

11. Start Nginx

```
sudo systemctl start nginx
```

Starts the Nginx web server.

12. Enable Nginx on boot

```
sudo systemctl enable nginx
```

Ensures Nginx starts automatically when the instance reboots.

13. Copy build files to web root

```
sudo scp -r dist/* /var/www/html/
```

Moves your built frontend files into Nginx’s default web directory.

14. Enable Port 80 (HTTP)
    In EC2 instance's security group, allow Inbound Rule:

Type: HTTP

Port: 80

Source: 0.0.0.0/0 (for global access)

✅ Final Result:
Visit EC2 instance's public IP or DNS in a browser (e.g., http://<public-ip>)

Stack Meet frontend should load via Nginx!
