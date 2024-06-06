## 初始化仓库（init）
```shell
git init
```
## 克隆（clone）
- 用于将远程的项目克隆到本地。
``` shell
# git 克隆项目
git clone 仓库链接 [本地项目名称]

# 示例
git clone https://github.com/username/test_rep.git # http链接
git clone git@github.com:username/test_rep.git # ssh链接

git clone git@github.com:username/test_rep.git my_project # 将代码克隆到my_project目录中
```
## 暂存修改（add）
- 用于将本地的修改暂存
``` shell
# 暂存
git add 文件名 [文件名2]

# 示例
git add README.md
git add README.md other_file.md
git add . # 暂存所有修改
```
## 撤销或恢复修改（restore）
- 用于将文件恢复到**最新提交**的状态（丢弃所有更改），或仅撤销暂存，仍保留未提交的更改。
```shell
# 将指定文件恢复到最新的提交状态，丢弃所有未提交的更改
git restore 文件名
# 如果你已经使用 git add 将文件添加到暂存区，但希望撤销这些更改
git restore --staged 文件名
```
## 查看状态（status）
- 查看仓库当前的状态，显示有变更的文件。
```shell
git status

# 运行后打印的日志中：
# Changes not staged for commit 中的时未暂存的文件，可使用add和restore操作
# Changes to be committed 中的时已暂存未提交的文件，可使用restore --staged操作
```
## 提交（commit）
- 当完成了一个功能或者修改后，应使用提交功能将代码保存下来。
- 提交后会更新当前分支的头节点到最新的位置。
```shell
git commit -m "本次提交说明"
```
- > 注意：除非你知道你在做什么，否则一定要加上`-m`参数以及后面的提交说明。
- 提交说明应最好有意义。可以查看此处的[Git提交说明规范](/Git提交说明规范)。
## 日志（log）
id:: 6656d7f0-0fc2-40df-a0f4-6f0bf8499a5c
- 打印当前分支的所有提交日志
``` shell
git log
```
- > 运行命令后会进入vim，此时需要使用`j`键向下翻动，`k`键向上翻动。`q`键退出查看模式。
- 每一条提交日志都应是以下格式：
```
commit commitID
Author: 作者username <作者email>
Date:   commit时间

	commit说明
```
- `commitID`是一串十六进制数，在代码版本回退等操作中需要使用到这个id
	id:: 6656d98e-ada2-4acc-8136-6e4fcad14f07
## 回滚版本（reset）
- 该命令用于回退版本
- 说明参照 https://www.runoob.com/git/git-reset.html
``` shell
git reset [--soft | --mixed | --hard] [HEAD]
```
- 回退类型
- **--mixed** 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。
- **--soft** 参数用于回退到某个版本：
- **--hard** 参数撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有信息提交：
- HEAD
- 应为要回退到的版本的commitID，详见 ((6656d7f0-0fc2-40df-a0f4-6f0bf8499a5c))
## 推送（push）
- 用于将未推送的提交推送到远程仓库
```shell
git push
```
## 拉取（pull）
- 用于将远程仓库未同步的提交同步到本地
```shell
git pull
```
## 分支操作（checkout）
- 用于切换、新建分支
```shell
# 新建并切换到分支
git checkout -b new_branch

# 切换分支
git checkout master

# 以当前分支的某次提交创建新分支
git checkout -b new_test_branch commitID
```