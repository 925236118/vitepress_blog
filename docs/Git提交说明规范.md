## 说明
- 参照 https://juejin.cn/post/6871050102379642894
- 用于`git commit` 命令中`-m`参数的说明。这个说明应满足某种规范，方便知道当前提交的类别以及内容。
## 格式
```
	<type>(<scope>): <subject>
	// 空一行
	<body>
	// 空一行
	<footer>
	```
- > type和subject必需，scope、body、footer可选。
- type
	- | type     | 描述                                                         |
		| -------- | ------------------------------------------------------------ |
		| feat     | 新增feature                                                  |
		| fix      | 修复bug                                                      |
		| docs     | 修改文档，如readme.md                                        |
		| style    | 修改代码格式，不改变代码逻辑，如逗号、缩进、空格等           |
		| refactor | 代码重构，没有新增功能或修复bug                              |
		| perf     | 优化相关，如提升性能、用户体验等                             |
		| test     | 测试用例，包括单元测试、集成测试                             |
		| ci       | 修改ci配置文件或脚本，如jenkins fastlame                     |
		| chore    | 修改构建脚本、或者增加依赖库、工具等                         |
		| revert   | 回滚之前的commit                                             |
- scope
	- commit影响的范围，可以是影响的文件名、模块名、组件名、国家等
- subject
	- commit的简短描述，符合[50/72 formatting](https://link.juejin.cn?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F2290016%2Fgit-commit-messages-50-72-formatting)
- body
	- commit的详细描述，符合[50/72 formatting](https://link.juejin.cn?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F2290016%2Fgit-commit-messages-50-72-formatting)
- footer
	- 备注，通常是Breaking changes或者Closed issues