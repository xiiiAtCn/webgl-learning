## 使用缓冲区对象向顶点着色器传入多个顶点的数据
1. 创建缓冲区对象(gl.createBuffer())
2. 绑定缓冲区对象(gl.bindBuffer())
3. 将数据写入缓冲区对象(gl.bufferData())
4. 将缓冲区对象分配给一个attribute对象(gl.vertexAttribPointer())
5. 开启attribute变量(gl.enableVertexAttribArray())

> WebGL中, 矩阵元素是按照列主序存储在数组中的

> 在WebGL中, 如果顶点着色器与片元着色器有类型和命名都相同的varying变量, 那么顶点着色器赋给该变量的值就会被自动地传入片元着色器
## 顶点着色器和片元着色器之间, 存在这样两个步骤
1. 图形装配过程: 这一步的任务是, 将孤立的顶点坐标装配成几何图形. 几何图形的类别由gl.drawArrays()函数的第一个参数决定
2. 光栅化过程: 这一步的任务是, 将装配好的几何图形转化为片元

## 片元着色器的内置变量
* vec4 gl_FragCoord 该内置变量的第1个和第2个分量表示片元在&lt;canvas&gt;坐标系统中的坐标值