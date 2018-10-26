# WebGL API

## gl.clear(buffer)
将指定缓冲区设定为预定的值. 如果清空的是颜色缓冲区, 那么将使用gl.clearColor()指定的值(作为预设值)

|参数|buffer|指定待清空的缓冲区, 位操作符OR(\|)可用来指定多个缓冲区|
|---|---|---|
||gl.COLOR_ BUFFER_BIT|指定颜色缓存|
||gl.DEPTH_BUFFER_BIT|指定深度缓存区|
||gl.STENCIL_BUFFER_BIT|指定模板缓存区|
|返回值|无||
|错误|INVALID_VALUE|缓冲区不是以上三种类型|

### 清空缓冲区的默认颜色及其相关函数
|缓冲区名称|默认值|相关函数|
|---|---|---|
|颜色缓存区|(0.0, 0.0, 0.0, 0.0)|gl.clearColor(red, green, blue, alpha)|
|深度缓冲区|1.0|gl.clearDepth(depth)|
|模板缓冲区|0|gl.clearStencil(s)|

## gl.drawArrays(mode, first, count)
执行顶点着色器, 按照mode参数指定的方式绘制图形  

- 参数 
    - mode 指定绘制的方式, 可接收以下常量符号: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN
        - 点 gl.POINTS 一系列点, 绘制在v0、v1、v2......处
        - 线段 gl.LINES 一系列单独的线段, 绘制在(v0, v1)、(v2, v3) ......处, 如果点的个数是奇数, 最后一个点将被忽略
        - 线条 gl.LINE_STRIP 一系列连接的线段
        - 回路 gl.LINE_LOOP 一系列连接的线段. 与gl.LINE_STRIP绘制的线条相比, 增加了一条从最后一个点到第1个点的线段
        - 三角形 gl.TRIANGLES 一系列单独的三角形. 绘制在(v0, v1, v2), (v3, v4, v5)......处. 如果点的个数不是3的整数倍, 最后剩下的一或两个点将被忽略.
        - 三角带 gl.TRIANGLE_STRIP 一系列条带状的三角形, 前三个点构成了第1个三角形, 从第2个点开始的三个点构成了第2个三角形(逆时针顺序绘制三角形)
        - gl.TRIANGLE_FAN 一系列三角形组成的类似于扇形的图形. 前三个点构成了第1个三角形, 接下来的一个点和前一个三角形的最后一条边组成接下来的一个三角形
    - first 指定从哪个顶点开始绘制(整数型)
    - count 指定绘制需要用到多少顶点(整数型)
- 返回值 无
- 错误
    - INVALID_ENUM 传入的mode参数不是前述参数之一
    - INVALID_VALUE 参数first或count是负数

## gl.getAttribLocation(program, name)
获取由name参数指定的attribute变量的存储地址

- 参数
    - program 指定包含顶点着色器和片元着色器的着色器程序对象
    - name 指定想要获取其存储地址的attribute变量的名称
- 返回值
    - 大于等于0 attribute变量的存储地址
    - -1 指定的attribute变量不存在, 或者其命名具有gl_或webgl_前缀
- 错误
    - INVALID_OPERATION 程序对象未能成功连接
    - INVALID_VALUE name参数的长度大于attribute变量名的最大长度(默认256字节)

## gl.vertexAttrib3f(location, v0, v1, v2)
将数据(v0, v1, v2)传给由location参数指定的attribute变量.

- 参数
    - location 指定将要修改的attribute变量的存储位置
    - v0 v1 v2 指定填充attribute变量的第一、二、三个分量的值
- 返回值 无
- 错误
    - INVALID_OPERATION 没有当前的program对象
    - INVALID_VALUE locatio大于等于attribute变量的最大数目(默认为8)

### 同族函数

#### gl.vertexAttrib1f(location, v0)
#### gl.vertexAttrib2f(location, v0, v1)
#### gl.vertexAttrib3f(location, v0, v1, v2)
#### gl.vertexAttrib4f(location, v0, v1. v2, v3)
gl.vertexAttrib1f仅传输一个值, 这个值将被填充到attribute变量的第一个分量中, 第2、3个分量将被设为0.0, 第4个分量将被设置为1.0. 其他与此类似

## gl.getUniformLocation(program, name)
获取指定名称的uniform变量的存储位置

- 参数
    - program 指定包含顶点着色器和片元着色器的着色器程序对象
    - name 指定想要获取其存储位置的uniform变量的名称
- 返回值
    - non-null 指定的uniform变量的位置
    - null 指定的uniform变量不存在, 或者其命名具有gl_或webgl_前缀
- 错误
    - INVALID_OPERATION 程序对象未能成功连接
    - INVALID_VALUE name参数的长度大于uniform变量名的最大长度(默认256个字节)

## gl.uniform4f(location, v0, v1, v2, v3)
将数据(v0, v1, v2, v3)传输给由location参数指定的uniform变量

- 参数 
    - location 指定将要修改的uniform变量的存储位置
    - v0 v1 v2 v3 指定填充uniform变量的第一, 二, 三, 四个分量的位置
- 返回值 无
- 错误 INVALID_OPERATION 没有当前program对象, 或者location是非法的变量存储位置

### 同族函数
#### gl.uniform1f(location, v0)
#### gl.uniform2f(location, v0, v1)
#### gl.uniform3f(location, v0, v1, v2)
#### gl.uniform4f(location, v0, v1, v2, v3)
将数据传输到location参数指定的uniform变量. 类似于vertexAttrib*f.

- 参数 
    - location 指定uniform变量的存储位置
    - v0 v1 v2 v3 指定传输给uniform变量四个分量的值
- 返回值 无
- 错误 INVALID_OPERATION 没有当前program对象, 或者location是非法的变量存储位置

## gl.createBuffer
创建缓冲区对象
- 返回值 
    - 非null 新创建的缓冲区对象
    - null 创建缓冲区对象失败
- 错误 无

## gl.deleteBuffer(buffer)
删除参数buffer表示的缓冲区对象

- 参数 buffer 待删除的缓冲区对象
- 返回值 无
- 错误 无
## gl.bindBuffer(target, buffer)
允许使用buffer表示的缓冲区对象并将其绑定到target表示的目标上
- 参数 
    - target参数可以是以下中的一个:
        - gl.ARRAY_BUFFER 表示缓冲区对象中包含顶点的数据
        - gl.ELEMENT_ARRAY_BUFFER 表示缓冲区对象中包含了顶点的索引值
    - buffer 指定之前由gl.createBuffer()返回的待绑定的缓冲区对象.如果指定为null, 则禁用对target的绑定
- 返回值 无
- 错误 INVALID_ENUM target不是上述值之一, 这时将保持原有的绑定情况不变

## gl.bufferData(target, data, usage)
开辟存储空间, 向绑定在target上的缓冲区对象中写入数据data

- 参数
    - target gl.ARRAY_BUFFER或gl.ELEMENT_ARRAY_BUFFER
    - data 写入缓冲区对象的数据(类型化数组)
    - usage 表示程序将如何使用存储在缓冲区对象中的数据. 该参数将帮助WebGL优化操作, 但即使传入了错误的值, 也不会终止程序(仅仅是降低程序的效率)
        - gl.STATIC_DRAW 只会向缓冲区对象中写入一次数据, 但需要绘制很多次
        - gl.STREAM_DRAW 只会向缓冲区对象中写入一次数据, 然后绘制若干次
        - gl.DYNAMIC_DRAW 会向缓冲区对象中多次写入数据, 并绘制多次
- 返回值 无
- 错误 INVALID_ENUM target不是上述值之一, 这时将保持原有的绑定形式不变

## gl.vertexAttribPointer(location, size, type, normalized, stride, offset)
将绑定到gl.ARRAY_BUFFER的缓冲区对象分配给由location指定的attribute变量

- 参数
    - location 指定待分配attribute变量的存储位置
    - size 指定缓冲区中每个顶点的分量个数. 若size比attribute变量需要的分量数小, 则会按照gl.vertexAttrib*f相同的规则自动补全
    - type 用以下类型之一来指定数据格式
        - gl.UNSIGNED_BYTE 无符号字节, Uint8Array
        - gl.SHORT 短整型, Int16Array
        - gl.UNSIGNED_SHORT 无符号短整型, Uint16Array
        - gl.INT 整型, Int32Array
        - gl.UNSIGNED_INT 无符号整型, Uint32Array\
        - gl.FLOAT 浮点型, Float32Array
    - normalized 传入true或false, 表明是否将非浮点型的数据归一化到[0, 1]或[-1, 1]区间
    - stride 指定相邻两个顶点之间的字节数, 默认为0
    - offset 指定缓冲区对象中的偏移量(以字节为单位), 即attribute变量从缓冲区中的何处开始存储. 如果是从起始位置开始的, offset设置为0
- 返回值 无
- 错误
    - INVALID_OPERATION 不存在当前程序对象
    - INVALID_VALUE location大于等于attribute变量的最大数目. 或者stride或offset是负值

## gl.enableVertexAttribArray()
开启location指定的attribute变量
- 参数 
    - location 指定attrib变量的存储位置
- 返回值 无
- 错误
    - INVALID_VALUE location大于等于attribute变量的最大数目(默认为8)

### gl.disableVertexAttribArray()
关闭location指定的attribute变量

## gl.uniformMatrix4fv(location, transpose, array)
将array表示的4*4矩阵分配给由location指定的uniform变量
- 参数
    - location uniform变量的存储位置
    - transpose 在WebGL中必须指定为false
    - array 待传输的矩阵数组, 4 x 4矩阵按列主序存储在其中
- 返回值 无
- 错误 
    - INVALID_OPERATION 不存在当前程序对象
    - INVALID_VALUE transpose不为false, 或者数组的长度小于16