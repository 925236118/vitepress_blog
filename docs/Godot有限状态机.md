## 简介
-  有限状态机（Finite State Machine，简称FSM）是一种计算模型，它由一组状态以及在这些状态之间的转移组成。这个模型可以用于描述系统的行为，其中系统在任何给定时间点都处于某个特定的状态，并且可以根据输入或触发条件从一个状态转移到另一个状态。
## 使用**脚本**构建有限状态机
- 来源: [timothyqiu](https://space.bilibili.com/7092): https://www.bilibili.com/video/BV1yM4y1j79P
### 代码
```gdscript
class_name StateMachine
extends Node

var currenrt_state: int = -1:
	set(v):
		owner.transition_state(currenrt_state, v)
		currenrt_state = v
		state_time = 0

var state_time: float

func _ready() -> void:
	await owner.ready
	currenrt_state = 0

func _physics_process(delta: float) -> void:
	while true:
		var next := owner.get_next_state(currenrt_state) as int
		if currenrt_state == next:
			break
		currenrt_state = next
		
	owner.tick_physics(currenrt_state, delta)
	state_time += delta
	
```
### 说明
- 父节点中需要添加状态机节点。
- 父级节点需要实现三个函数和一个枚举类型
	- `func transition_state(from: State, to: State) -> void:`
		- 切换状态时执行的逻辑
		- 根据`to`参数播放动画
	- `func get_next_state(state: State) -> State:`
		- 主动切换状态
		- 根据当前状态以及某些条件，返回下一个将要变化的状态，默认应返回当前状态
	- `func tick_physics(state:State, delta: float) -> void:`
		- 每一帧根据状态执行代码
		- 一般用于控制移动
	- `State`枚举
		- 用于定义每一种状态
### 示例
- 场景树
	- ![image.png](/image_1717580742081_0.png)
- Player节点脚本
```gdscript
extends CharacterBody2D
@onready var animation_player = $AnimationPlayer

enum State {
	Idle,
	Walk,
}
	
var speed = 100
var direction = Vector2.ZERO

func _ready() -> void:
	pass
	
func get_next_state(state: State) -> State:
	match state:
		State.Walk:
			if direction.length() == 0:
				return State.Idle
		State.Idle:
			if direction.length() > 0:
				return State.Walk
	return state
	
func tick_physics(state:State, _delta: float) -> void:
	direction = Input.get_vector("move_left", "move_right", "move_up", "move_down")
	
	match state:
		State.Walk:
			move()
	
func transition_state(from: State, to: State) -> void:
	#print("state from {0}, to {1}".format([from, to]))
	match to:
		State.Walk:
			animation_player.play("walk")
		State.Idle:
			animation_player.play("idle")
	
func move():
	velocity = direction * speed
	move_and_slide()
```
### 优缺点
- 状态机代码都在父节点脚本中，代码逻辑耦合严重。
- 父节点的三个函数需要对每一种状态分别处理，代码会比较复杂。
## 使用**节点**构建有限状态机
- 来源: [ImRains](https://space.bilibili.com/66079515) : https://www.bilibili.com/video/BV1de411i7Lh/
### 代码
- StateMachine.gd
```gdscript
extends Node

class_name StateMachine

@export var current_state: StateBase

func _ready() -> void:
	for child in get_children():
		if child is StateBase:
			child.state_machine = self
	await get_parent().ready
	current_state.enter()

func _process(delta: float) -> void:
	current_state.process_update(delta)

func _physics_process(delta: float) -> void:
	current_state.physical_process_update(delta)

## 修改状态
func change_state(target_state_name: String) -> void:
	var target_state = get_node(target_state_name)
	if target_state == null:
		printerr("状态传入错误")
		return
	current_state.exit()
	current_state = target_state
	current_state.enter()

```
- StateBase.gd
```gdscript
extends Node

## 基础状态
class_name StateBase

var state_machine: StateMachine

## 进入状态
func enter() -> void:
	pass

## 退出状态
func exit() -> void:
	pass

## 渲染帧触发
func process_update(delta: float) -> void:
	pass

## 物理帧触发
func physical_process_update(delta: float) -> void:
	pass
	
```
### 说明
- 为需要添加状态机的节点添加StateMachine状态机节点，并在状态机节点下创建若干StateBase节点。
- 为每一个StateBase节点修改名称并**扩展脚本**。
- 在扩展脚本中覆写`enter`、`exit`、`process_update`、`physical_process_update`等函数。
	- `func enter() -> void:`
		- 进入这个状态时需要执行的代码，可以用于播放动画，设置属性等。
	- `func exit() -> void:`
		- 退出这个状态时调用的代码，可以用于释放数据等操作。
	- `func process_update(delta: float) -> void:`
		- 当前状态的每一个渲染帧执行的逻辑。
	- `func physical_process_update(delta: float) -> void:`
		- 当前状态的每一个物理帧执行的逻辑。
		- 可以用于移动。
	- 在覆写的时候可以先调用父类super的同名方法。（虽然父类StateBase里面什么都没有）
- 在需要切换状态的地方使用以下代码切换状态
	```gdscript
	state_machine.change_state("需要切换的状态名称")
	```
### 示例
- 场景树
	- ![image.png](/image_1717579679665_0.png)
- Player节点脚本
```gdscript
extends CharacterBody2D
@onready var animation_player = $AnimationPlayer

var direction = Vector2.ZERO

func _ready() -> void:
	pass

func _physics_process(delta: float) -> void:
	direction = Input.get_vector("move_left", "move_right", "move_up", "move_down")
```
- Idle节点扩展脚本
```gdscript
extends StateBase

@onready var animation_player: AnimationPlayer = $"../../AnimationPlayer"
@export var player: CharacterBody2D = null

func enter():
	super.enter()
	animation_player.play("idle_down")

func physical_process_update(delta: float):
	super.physical_process_update(delta)
	if player.direction.length() != 0:
		state_machine.change_state("Walk")
```
- Walk节点扩展脚本
```gdscript
extends StateBase
@onready var animation_player: AnimationPlayer = $"../../AnimationPlayer"
@export var player: CharacterBody2D = null

var speed = 100

func enter():
	super.enter()
	animation_player.play("walk")
	
func physical_process_update(delta: float):
	super.physical_process_update(delta)
	if player.direction.length() == 0:
		state_machine.change_state("Idle")
	move()
	
func move():
	player.velocity = player.direction * speed
	player.move_and_slide()
```
### 优缺点
- 将代码拆分到若干个节点的代码片段中。代码量增加，但逻辑更清晰。
- 由于状态节点经常需要使用父节点的属性，而这些属性只在父节点中声明使用，会导致代码的可读性降低。