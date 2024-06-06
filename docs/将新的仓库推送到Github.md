## 在Github上新建项目
- 进入页面： https://github.com/用户名?tab=repositories
- 点击New按钮，进入创建新的代码仓库页面： https://github.com/new
	collapsed:: true
	- ![image.png](/image_1716964510365_0.png)
- 按需填写仓库名称、仓库描述、是否公用、是否需要添加一个`README.md`、是否添加默认的`.gitignore`、选择许可证
	- 仓库名称尽量不要使用空格，这将产生意料外的问题，你可以使用`_`连接单词。
	- 仓库名称不能和你已有的仓库名一致。
	- 如果你打算将已经存在的本地项目推送到Git，你可以选择**不添加README**。
- 点击创建仓库，即可新建一个空的代码仓库。
- 如果创建的是一个空项目。将会看到这样的页面：
	- ![image.png](/image_1716965609803_0.png)
- 如果创建仓库时选择了添加README或选择了许可证，则会看到以下页面
	- ![image.png](/image_1716965713444_0.png)
## 推送代码
- 本地已有项目
	collapsed:: true
	- 在命令提示符中运行以下代码：
		``` shell
		# git 初始化
		git init
		
		# git 设置远程
		git remote add origin ssh链接
		
		# git 设置主分支
		git branch -M master
		
		# git 推送代码
		git push -u origin master
		```
- 本地没有项目
	collapsed:: true
	- 可直接将新建的git项目克隆下来
		``` shell
			# git 克隆项目
			git clone ssh链接
			```
	- 或者新建一个项目后添加文件，再推送到远程
		```shell
			# 新建文件
			echo "# test_empty_rep" >> README.md
			
			# git 初始化
			git init
			
			# git 暂存文件
			git add README.md
			
			# git 提交暂存
			git commit -m "first commit"
			
			# git 设置主分支
			git branch -M master
			
			# git 设置远程
			git remote add origin ssh链接
			
			# git 推送代码
			git push -u origin master
			```
- 推送成功后在Github仓库页面刷新即可查看到推送的代码。