## ubuntu安装mongodb
``` shell
sudo apt-get update
sudo apt-get install gnupg curl
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /etc/apt/trusted.gpg.d//mongodb-server-6.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
echo "deb http://security.ubuntu.com/ubuntu focal-security main" | sudo tee /etc/apt/sources.list.d/focal-security.list
sudo apt-get update
sudo apt-get install libssl1.1
sudo apt-get install mongodb-org
sudo systemctl start mongod
sudo systemctl status mongod
mongosh
```

## 添加远程用户
``` shell
vim /etc/mongod.conf
# 将bindIp 127.0.0.1 改为bindIp 0.0.0.0

mongosh
use admin
db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});
db.auth('admin', '123456')
```

