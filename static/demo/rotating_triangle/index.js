//顶点着色器
let VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform mat4 u_ModelMatrix;
    void main () {
        gl_Position = u_ModelMatrix * a_Position;

    }
`

//片元着色器程序
let FSHADER_SOURCE = `
     void main() {
         gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
     }
`

let ANGLE_STEP = 45.0
function main() {
    let canvas = document.querySelector('#webgl')
    let gl = canvas.getContext('webgl')
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('fail to initialize shaders')
        return
    }

    
    let n = initVertexBuffers(gl)

    let u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')

    
    //设置canvas背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    //清除canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    gl.drawArrays(gl.TRIANGLES, 0, n)

    let currentAngle = 0.0

    let modelMatrix = new Matrix4()
    
    let tick = function () {
        currentAngle = animate(currentAngle)
        draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix)
        requestAnimationFrame(tick)
    }

    tick()
}

function initVertexBuffers(gl) {
    let vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
    let n = 3
    let vertexBuffer = gl.createBuffer()
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
    return n

}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
    modelMatrix.setRotate(currentAngle, 0, 0, 1)

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)

    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, n)
}

let g_last = Date.now()
function animate (angle) {
    let now = Date.now()

    let elapsed = now - g_last
    g_last = now

    let newAngle = angle + (ANGLE_STEP * elapsed)  / 1000.0
    return newAngle %= 360
}
main()