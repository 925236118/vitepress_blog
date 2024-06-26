## 说明
- 一个网络服务器
  
## ubuntu使用nginx
- 安装
``` shell
apt install nginx-core
```
- 检查是否安装成功
``` shell
nginx -v
```
- 安装路径
``` shell
whereis nginx
```
- 安装后的常用目录
  - `/usr/sbin/nginx`：主程序
  - `/etc/nginx`：存放配置文件
  - `/usr/share/nginx`：存放静态文件
  - `/var/log/nginx`：存放日志
- 启动服务
``` shell
service nginx start
service nginx restart # 重启
service nginx stop # 停止服务
```
- 修改配置文件
``` shell
sudo vim /etc/nginx/sites-available/default
```
## windows使用nginx
- 安装
打开[下载地址](http://nginx.org/en/download.html), 选择最新的稳定版本。下载后解压。
- 检查是否安装成功
``` shell
nginx -v
```
- 安装后的常用目录（相对于解压目录）
  - `./`：主程序
  - `./conf`：存放配置文件
  - `./html`：存放网站站点文件
  - `./logs`：存放日志
- 启动服务
``` shell
start nginx
nginx -s reopen # 重启
nginx -s stop # 停止服务
nginx -s quit # 停止服务
```
- 修改配置文件
使用编辑器打开`./conf/nginx.conf`

- 报错
	- 有时运行`nginx -s stop`或`nginx -s reopen`都会报错`[error] CreateFile() "path/logs/nginx.pid" fail`。 可以运行命令`nginx -c conf/nginx.conf`
## 配置项
```
server {
		listen 80 default_server;
		listen [::]:80 default_server;
		
		root /var/www/html;
		# Add index.php to the list if you are using PHP
		index index.html index.htm index.nginx-debian.html;

		server_name _;
}
```
- `root`为站点的根目录
- `listen`为监听的端口
- `index`为index页面，可以自动识别
- `server_name`为服务器名称
## 通过域名前缀访问不同的端口的服务
```
# api.*   to   :3000
server {
		listen 80;
		server_name api.*;
		root /var/www/html/lenomand;
		location / {
				proxy_pass http://127.0.0.1:3000;      
		}

}

```

## 常见问题
- 静态服务器上传文件名中带有中文，导致请求失败
  - 解决办法：将文件名转换成utf-8编码
    - sudo convmv -f gbk -t utf-8 -r --notest /var/www/public

## 使用SSL证书
- 申请SSL证书
- 将SSL证书中的.crt文件和.key文件上传到服务器。
- 修改nginx配置
```
server {
        listen 80 default_server;
        root /var/www/html;
        index index.html;
        location / {
			# 重定向到https
			return 301 https://$host$request_uri;
#           try_files $uri $uri/ =404;
        }
}

server {
        listen 443 ssl;
		# 配置网站
        root /var/www/html;
        index index.html;

        ssl_certificate path/to/file.crt;
        ssl_certificate_key path/to/file.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;
        client_max_body_size 200M;
        location / {
        #       proxy_pass http://...;
        #       try_files $uri $uri/ =404;
        }
}
```