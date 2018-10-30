//顶点着色器
let VSHADER_SOURCE = `
    precision mediump float;    //此句不加会报错, 原因不明
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    void main () {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
        v_Color = a_Color;
    }
`

//片元着色器程序
let FSHADER_SOURCE = `
    precision mediump float;
    varying vec4 v_Color;
     void main() {
         gl_FragColor = v_Color;
     }
`

function main() {
    let canvas = document.querySelector('#webgl')
    let gl = canvas.getContext('webgl')
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('fail to initialize shaders')
        return
    }

    
    let n = initVertexBuffers(gl)
    
    //设置canvas背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    //清除canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, n)
}

function initVertexBuffers(gl) {
    let vertices = new Float32Array([0.0, 0.5, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0])
    let n = 3
    let vertexBuffer = gl.createBuffer()
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object')
        return -1
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    let FSIZE = vertices.BYTES_PER_ELEMENT

    // 向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    // 获取attribute变量的存储位置
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position')
        return
    }
    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0)

    // 连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position)

    let a_Color = gl.getAttribLocation(gl.program, 'a_Color')
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2)
    gl.enableVertexAttribArray(a_Color)
    return n

}
main()