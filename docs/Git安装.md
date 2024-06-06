## 安装（Windows系统）
- 官网 https://git-scm.com/
	- ![image.png](/image_1716955385347_0.png)
- 进入官网后，点击右侧的Download for WIndows，进入下载页面
	- ![image.png](/image_1716955420766_0.png)
- 选择合适的版本，此处选择`64-bit Git for Windows Setup`
- 下载结束后，双击打开安装包
	- ![image.png](/image_1716955534412_0.png)
- 点击安装（Install）开始配置安装，全部按照默认配置，一直点击下一步（Next）。
- 安装结束后，点击完成（Finish）
- 检查是否安装成功
	- 打开命令提示符（3种方式）
		- win + r 打开运行对话框，输入cmd，回车
		- 开始 -> windows系统 -> 命令提示符
		- 开始 -> 输入cmd -> 选择命令提示符
	- 输入`git -v`，回车
		- ![image.png](/image_1716955892763_0.png)
	- 查看打印的安装版本，示例中为`2.45.1.windows.1`
## 安装（Linux系统）
- 运行命令
	``` shell
		# sudo安装
		sudo apt-get install git
		```