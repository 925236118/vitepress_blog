## 教程
[游戏设计模式 命令模式](https://gpp.tkchu.me/command.html)

## 什么是命令模式
命令模式的思想是将对某个对象操作逻辑封装到一起，包含了要操作的目标对象和操作的逻辑。

从命令发起者的角度来看，不需要知道目标对象是如何执行命令的。只需要关心执行的结果。

## 从战棋游戏看命令模式
命令模式适合可以将用户操作或AI操作封装成命令的场景。

例如，在一个战旗游戏的棋盘中，棋盘上有A、B两个棋子。我们游戏的逻辑需要让A前进2步和让B后退1步。我们通常会设计成以下样式：
::: details 点我查看代码
``` gdscript
# 测试使用的棋子类
class Chess: 
    func _init() -> void:
        pass

    func move () -> void:
        pass

# 游戏管理器
class GameManager:
    func _init() -> void:
        var a: Chess = Chess.new()
        var b: Chess = Chess.new()

        a.move(2)
        b.move(-1)
```
:::
有了以上的代码，接下来，我们想要将“移动”这个逻辑从棋子类中抽象出来，变成为一个命令。首先可以先设计一个命令类。
::: details 点我查看代码
``` gdscript
# 定义命令类
class Command:
    # 命令名称
	var name = ""
    # 命令逻辑
	var execute: Callable

	func _init(command_name, command_execute: Callable):
		name = command_name
		execute = command_execute
```
:::
则我们可以有以下代码：
::: details 点我查看代码
``` gdscript
# 测试使用的棋子类
class Chess:
	var name: String = ""
	func _init(chess_name: String) -> void:
		name = chess_name


# 游戏管理器，在此处作为命令的发起者
class GameManager:
    # 移动棋子的函数
	func move_chess(chess: Chess, step: int):
		print("{0} move {1} step.".format([chess.name, step]))
	
	func _init() -> void:
        # 创建移动命令
		var moveCommand = Command.new("jump", move_chess)
		
        # 实例化两个棋子
		var a: Chess = Chess.new("A")
		var b: Chess = Chess.new("B")

    # 运行游戏，模拟棋子移动
    func play_game() -> void:
        # 命令两个棋子移动
		moveCommand.execute.call(a, 2)
		moveCommand.execute.call(b, -1)

func _ready() -> void:
	var game_manager = GameManager.new()

```
:::

## 先总结一下
根据以上的案例，可以看出，将执行的逻辑封装成命令模式有以下好处：
- 将目标对象、执行逻辑、参数分开。方便分别修改和管理。
- 将不同的命令区分开，不与目标对象耦合。
- 方便记录，撤销和还原。
如果以上的逻辑你都理解了，那么接下来就是正餐了。

## 命令的撤销 {#undo_command}
使用命令模式的另一大好处是可以撤销命令。要实现撤销命令，需要重新改造命令类。

以下我继续使用移动棋子的例子来尝试说明。由于命令类需要保存执行命令前的状态，所以代码耦合严重，请根据自己的逻辑进行删减。

首先需要在命令类中添加撤销函数。而且由于移动的逻辑需要添加撤销操作，所以将命令封装成`Command`基类，并添加`MoveCommand`命令。
::: details 点我查看代码
``` gdscript
# 命令基类
class Command:
	func _init() -> void:
		pass
	func execute() -> void:
		pass
	func undo() -> void:
		pass

# 移动命令类
class MoveCommand:
	# 执行命令之前的状态
	var before_pos = 0
	# 命令的目标对象
	var unit: Chess
	# 命令的执行函数
	var execute_func: Callable
	# 由于执行函数需要的参数可能有多个，而godot不支持动态参数，所以传入Dictionary类型
	var param: Dictionary
	
	# 初始化需要传入执行的对象，函数，参数
	func _init(
			unit: Chess, 
			execute_func: Callable, 
			param: Dictionary
			) -> void:
		self.unit = unit
		self.execute_func = execute_func
		self.param = param
	
	# 执行命令
	func execute() -> void:
		# 记录执行命令之前的状态
		before_pos = unit.pos
		# 执行命令函数
		execute_func.call(unit, param.pos)
		
	# 撤销命令
	func undo() -> void:
		# 根据之前的状态还原
		execute_func.call(unit, before_pos)
```
:::
其中`MoveCommand`类中添加了移动前的位置`before_pos`，并将目标对象、命令函数、函数参数都封装在命令中。这使得一个命令实例包含了完整的执行逻辑。

接下来实例化移动命令，并执行。
::: details 点我查看代码
``` gdscript
# 用于移动的函数
func move_chess(chess: Chess, target_pos: int):
    chess.pos = target_pos
    print("chess {0} move to {1}".format([chess.name, target_pos]))

func _ready() -> void:
    var a: Chess = Chess.new("A")
    # 某种事件触发了新的命令
    var move_command1: MoveCommand = MoveCommand.new(a, move_chess, {"pos": 2})
    # 声明后需要调用执行函数
    move_command1.execute()
    # 当撤销命令时
    move_command1.undo()
```
:::
实例化一个命令对象后，可以调用他的`execute`函数执行命令，也可以使用`undo`函数撤销命令。这样我们就完成了命令的撤销功能。

完整示例代码如下：
::: details 点我查看代码
``` gdscript
extends Node2D

# 命令基类
class Command:
	func _init() -> void:
		pass
	func execute() -> void:
		pass
	func undo() -> void:
		pass

# 移动命令类
class MoveCommand:
	# 执行命令之前的状态
	var before_pos = 0
	# 命令的目标对象
	var unit: Chess
	# 命令的执行函数
	var execute_func: Callable
	# 由于执行函数需要的参数可能有多个，而godot不支持动态参数，所以传入Dictionary类型
	var param: Dictionary
	
	# 初始化需要传入执行的对象，函数，参数
	func _init(
			unit: Chess, 
			execute_func: Callable, 
			param: Dictionary
			) -> void:
		self.unit = unit
		self.execute_func = execute_func
		self.param = param
	
	# 执行命令
	func execute() -> void:
		# 记录执行命令之前的状态
		before_pos = unit.pos
		# 执行命令函数
		execute_func.call(unit, param.pos)
		
	# 撤销命令
	func undo() -> void:
		# 根据之前的状态还原
		execute_func.call(unit, before_pos)

# 测试使用的棋子类
class Chess:
	var name: String = ""
	var pos = 0
	func _init(name: String) -> void:
		self.name = name

# 游戏管理器，在此处作为命令的发起者
class GameManager:
	# 用于移动的函数
	func move_chess(chess: Chess, target_pos: int):
		chess.pos = target_pos
		print("chess {0} move to {1}".format([chess.name, target_pos]))
		
	func _init() -> void:
		var a: Chess = Chess.new("A")
		var b: Chess = Chess.new("B")
		
		# 某种事件触发了新的命令
		var move_command1: MoveCommand = MoveCommand.new(a, move_chess, {"pos": 2})
		# 声明后需要调用执行函数
		move_command1.execute()
		# 当撤销命令时
		move_command1.undo()
		
		# 另一个命令
		var move_command2: MoveCommand = MoveCommand.new(b, move_chess, {"pos": -1})
		move_command2.execute()
		move_command2.undo()

func _ready() -> void:
	var game_manager = GameManager.new()

```
:::

## 历史记录功能
> 本章节需要先阅读[命令的撤销](./Godot设计模式-命令模式#undo_command)章节

在使用命令模式时，经常会出现需要撤销多个命令的历史记录功能。

这种场景可以声明一个命令栈，用来保存所有的命令对象。当入栈时执行命令的`execute`函数，当出栈时可以执行命令的`undo`函数。

得益于gdscript是一门高级编程语言，我们可以直接使用`Array`的内置方法`push_back`和`pop_back`，无需像C一样自己实现栈结构。新添加了`History`类用于保存历史记录。

以上示例的代码可以改写成：

::: details 点我查看代码
``` gdscript
extends Node2D

# 命令基类
class Command:
	func _init() -> void:
		pass
	func execute() -> void:
		pass
	func undo() -> void:
		pass

# 移动命令类
class MoveCommand:
	# 执行命令之前的状态
	var before_pos = 0
	# 命令的目标对象
	var unit: Chess
	# 命令的执行函数
	var execute_func: Callable
	# 由于执行函数需要的参数可能有多个，而godot不支持动态参数，所以传入Dictionary类型
	var param: Dictionary
	
	# 初始化需要传入执行的对象，函数，参数
	func _init(
			unit: Chess, 
			execute_func: Callable, 
			param: Dictionary
			) -> void:
		self.unit = unit
		self.execute_func = execute_func
		self.param = param
	
	# 执行命令
	func execute() -> void:
		# 记录执行命令之前的状态
		before_pos = unit.pos
		# 执行命令函数
		execute_func.call(unit, param.pos)
		
	# 撤销命令
	func undo() -> void:
		# 根据之前的状态还原
		execute_func.call(unit, before_pos)

# 测试使用的棋子类
class Chess:
	var name: String = ""
	var pos = 0
	func _init(name: String) -> void:
		self.name = name

# 历史记录类
class History:
	# 命令栈
	var stack: Array = []
	# 命令入栈
	func push(history_item):
		if not history_item.execute:
			push_error("not a command")
			return
		history_item.execute()
		stack.push_back(history_item)
	
	# 命令出栈
	func pop():
		var history_item = stack.pop_back()
		if not history_item.undo:
			push_error("command has not undo")
			return
		history_item.undo()
		return history_item

# 游戏管理器，在此处作为命令的发起者
class GameManager:
	# 用于移动的函数
	func move_chess(chess: Chess, target_pos: int):
		chess.pos = target_pos
		print("chess {0} move to {1}".format([chess.name, target_pos]))
		
	func _init() -> void:
		var history = History.new()
		var a: Chess = Chess.new("A")
		var b: Chess = Chess.new("B")
		
		history.push(MoveCommand.new(a, move_chess, {"pos": 2}))
		history.push(MoveCommand.new(b, move_chess, {"pos": -1}))
		history.pop()
		history.pop()

func _ready() -> void:
	var game_manager = GameManager.new()

```
:::

当然，也可以自己添加一个指针，这样就可以回退到任意位置后再重做任意步命令。

这个就作为练习吧。

## 命令的重放
事实上，命令还有一个功能是可以重放所有的操作（前提是你的历史记录足够的多）。

有一些游戏的**重放功能**或者**精彩时刻**就是记录下那附近的玩家输入的所有命令，并根据时间一一重放。（毕竟只存储一些命令节点可比直接录屏占用的存储小多了）。

实现的方法就是将历史记录正序依次执行。

## 最后的总结
- 命令模式可以方便的控制玩家和AI在游戏中的行为，但却需要将大量的逻辑封装成命令，会大大加大游戏开发难度和时间。需要开发者权衡两者之间的平衡。
- 命令模式需要尽可能的记录下**所有**的行为，这样才可以准确的执行或撤销命令。
- 以上代码使用class完成。其实也可以使用**函数闭包**的方式完成。可以参照[用类还是用函数?](https://gpp.tkchu.me/command.html#%E7%94%A8%E7%B1%BB%E8%BF%98%E6%98%AF%E7%94%A8%E5%87%BD%E6%95%B0%EF%BC%9F)修改以上代码。
- 由于撤销功能需要记录目标对象的某些属性，所以耦合比较严重。而存储一个完整的对象很明显更加耗费内存。此处可以权衡存储和开发之间的平衡。
- 历史记录如果过长会占用过多的内存。最好应将历史记录控制在固定数量以内，例如最多20条。超过的部分从头部删除。
- 如果一个命令多次调用且无状态（即没有参数，不需要通过参数来控制逻辑），在历史记录中实例化多个相同的命令是很浪费的行为，可以使用享元模式进行优化。