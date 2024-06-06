## 描边着色器
### 标签
- #片段着色器 #HDR

### 教程
- https://www.bilibili.com/video/BV1fn4y1R7yg/

### 原理
- 导出两个变量`outline_width`和`outline_color`
- 将像素分别向上下左右移动`outline_width`像素
- 将上下左右四个方向的描边相加后的颜色值改为`outline_color`
- 将描边与原纹理合并
- 需要在角色的周围留出空间

### 代码
``` gdshader
shader_type canvas_item;

uniform float outline_width = 1.0;
uniform vec4 outline_color: source_color = vec4(0, 0, 0, 1);

void fragment() {
	vec2 uv = UV;
	vec2 uv_up = uv + vec2(0, TEXTURE_PIXEL_SIZE.y) * outline_width;
	vec2 uv_down = uv + vec2(0, TEXTURE_PIXEL_SIZE.y) * -outline_width;
	vec2 uv_left = uv + vec2(TEXTURE_PIXEL_SIZE.x, 0) * outline_width;
	vec2 uv_right = uv + vec2(TEXTURE_PIXEL_SIZE.x, 0) * -outline_width;

	vec4 color_up = texture(TEXTURE, uv_up);
	vec4 color_down = texture(TEXTURE, uv_down);
	vec4 color_left = texture(TEXTURE, uv_left);
	vec4 color_right = texture(TEXTURE, uv_right);
	
	vec4 outline = color_up + color_down + color_left + color_right;
	outline.rgb = outline_color.rgb;
	
	COLOR = mix(outline, texture(TEXTURE, UV), texture(TEXTURE, UV).a);
}
```

### 设置HDR
- 打开项目设置 -> 渲染 -> 视口 -> HDR 2D -> 启用。设置后重新启动Godot。
- 添加一个`WorldEnvironment`节点，在节点检查器中添加Environment，将`Background`属性设置为`Canvas`，设置属性`Glow`为`Enabled`。
- 设置着色器的`outline_color`的值的rgb超过最大值后即可看到HDR效果。
- 设置HDR后会发现描边重叠部分的颜色变得更亮，这是因为绘制描边时将上下左右四个方向颜色相加，`outline.a`的值大于1；所以需要使用mix函数将其限制在1以内。
``` gdshader
outline.a = min(outline.a, 1);
```

### 案例效果
- ![image.png](/image_1717471059850_0.png)

## 像素化着色器
### 标签
  - #片段着色器
### 原理
  - 将片段着色器的UV放大若干倍后向下取整，再缩小相同倍数
### 代码
``` gdshader
  shader_type canvas_item;
  
  uniform vec2 pixel_count = vec2(64);
  
  void fragment() {
	vec2 uv = UV;
	uv *= pixel_count;
	uv = floor(uv);
	uv /= pixel_count;
	COLOR = texture(TEXTURE, uv);
  }
```

### 示例
  - ![image.png](/image_1717484631612_0.png)