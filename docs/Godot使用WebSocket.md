## 说明
WebSocket用于游戏和游戏服务器交换数据。适合多人游戏。

## 代码
``` gdscript
extends Node

var socket = WebSocketPeer.new()

func _ready():
	# 连接到WebSocket服务器
	socket.connect_to_url("ws://localhost:8080")

func _process(delta):
	# 定期调用poll以处理连接状态和接收数据
	socket.poll()
	
	# 检查连接状态
	var state = socket.get_ready_state()
	match state:
		WebSocketPeer.STATE_OPEN:
			# 连接已打开，可以发送和接收数据
			while socket.get_available_packet_count():
				var data = socket.get_packet().get_string_from_utf8()
				print("Received message: ", data)
		WebSocketPeer.STATE_CLOSING:
			# 连接正在关闭
			pass
		WebSocketPeer.STATE_CLOSED:
			# 连接已关闭
			print("Connection closed with code:", socket.get_close_code(), "and reason:", socket.get_close_reason())
			socket = WebSocketPeer.new() # 重新初始化WebSocketPeer以备重新连接
		_:
			pass
			# 其他状态，如连接中或错误状态，可以在这里处理

	# 发送消息示例（请确保在连接成功后发送）
	# if state == WebSocketPeer.STATE_OPEN and Input.is_action_just_pressed("ui_accept"):
	#     var message = "Hello, World!"
	#     socket.send(message.to_utf8())


```

## 说明
使用`WebSocketPeer`示例连接、发送、接收ws数据。
