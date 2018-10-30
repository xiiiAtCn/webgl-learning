//顶点着色器
let VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main () {
        gl_Position = a_Position;
        gl_PointSize = a_PointSize;
    }
`

//片元着色器程序
let FSHADER_SOURCE = `
     void main() {
         gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
     }
`

let Tx = 0.5, Ty = 0.5, Tz = 0.0
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
    let vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
    let n = 3
    let sizes = new Float32Array([
        10.0, 20.0, 30.0
    ])
    let vertexBuffer = gl.createBuffer()
    let sizeBuffer = gl.createBuffer()
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object')
        return -1
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    
    // 向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    // 获取attribute变量的存储位置
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position')
        return
    }
    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

    // 连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position)

    // 将顶点尺寸写入缓冲区对象并开启
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW)
    let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_PointSize)
    return n

}
main()