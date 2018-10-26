## 使用缓冲区对象向顶点着色器传入多个顶点的数据
1. 创建缓冲区对象(gl.createBuffer())
2. 绑定缓冲区对象(gl.bindBuffer())
3. 将数据写入缓冲区对象(gl.bufferData())
4. 将缓冲区对象分配给一个attribute对象(gl.vertexAttribPointer())
5. 开启attribute变量(gl.enableVertexAttribArray())

> WebGL中, 矩阵元素是按照列主序存储在数组中的