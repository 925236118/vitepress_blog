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
