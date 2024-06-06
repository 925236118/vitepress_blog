## 说明
- 与Git服务器需要使用SSH认证，要使用SSH认证需要在电脑中通过git工具生成ssh**公钥**和**私钥**，并将公钥保存在Git服务器中。
- **未配置SSH密钥的用户**在推送代码到服务器时会要求输入用户名和密码。
## 配置
- 以下将使用Github完成示例
- 首先在Github网站注册账号并登录。并记住注册的**用户名**和**邮箱**
- 登陆后页面应默认跳转到控制台（Dashboard）页面，如果未跳转，则可手动进入：https://github.com/dashboard
	- ![image.png](/image_1716962868477_0.png)
- 点击右上角头像，在弹出的侧边栏中选择设置（Settings）。进入页面： https://github.com/settings/profile
	- ![image.png](/image_1716962925255_0.png)
- 点击左侧SSH与GPG密钥（SSH and GPG keys），进入页面： https://github.com/settings/keys
- 在页面右上点击按钮`New SSH key`，进入页面： https://github.com/settings/ssh/new
	- ![image.png](/image_1716963063990_0.png)
	- ![image.png](/image_1716963155629_0.png)
- 接下来打开命令提示符
- 在命令提示符中输入命令
	``` shell
	git config --global user.name "替换成用户名"
	git config --global user.email "替换成邮箱"
	ssh-keygen -t rsa -C "替换成邮箱"
	```
- 执行`ssh-keygen`命令时可以全部使用默认配置，一直回车
    - ![image.png](/image_1716963659733_0.png)
- 执行成功之后，SSH密钥将被保存在当前用户的`.ssh`文件夹下
	- Windows系统可找到文件 `C:\Users\用户名\.ssh\id_rsa.pub`复制其中的SSH公钥
	- Linux系统可运行命令` cat ~/.ssh/id_rsa.pub`打印SSH公钥
- 将公钥粘贴到Github的`Add new SSH Key`页面的`Key`中，填写一个标题（Title）。点击添加SSH密钥按钮，即可添加成功。
- 添加成功后可在`SSH and GPG keys`页面中查看到已经添加过的公钥。
## Gitee页面
- 首页及账号设置位置
	- ![image.png](/image_1716977274011_0.png)
- SSH公钥页面
	- ![image.png](/image_1716977215269_0.png)