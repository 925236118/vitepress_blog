- 设置tileset
- 点击tilemap时可根据鼠标位置获取tilemap的坐标
	``` gdscript
	  	var global_pos = get_global_mouse_position()
	      var tile_coord = tile_map.local_to_map(global_pos)
	      print(tile_coord)
	  ```
	-
-
-
-
- one way collision
  - 只设置一个方向的碰撞