//顶点着色器
let VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform float u_CosB, u_SinB;
    void main () {
        gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
        gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
        gl_Position.z = a_Position.z;
        gl_Position.w = 1.0;
    }
`

//片元着色器程序
let FSHADER_SOURCE = `
     void main() {
         gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
     }
`

// let Tx = 0.5, Ty = 0.5, Tz = 0.0
let ANGLE = 90.0
function main() {
    let canvas = document.querySelector('#webgl')
    let gl = canvas.getContext('webgl')
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('fail to initialize shaders')
        return
    }
    
    let n = initVertexBuffers(gl)

    let radian = Math.PI * ANGLE / 180.0;
    let cosB = Math.cos(radian);
    let sinB = Math.sin(radian);

    let u_CosB = gl.getUniformLocation(gl.program, 'u_CosB')
    let u_SinB = gl.getUniformLocation(gl.program, 'u_SinB')
    


    let u_Translation = gl.getUniformLocation(gl.program, 'u_Translation')

    // gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0)
    gl.uniform1f(u_CosB, cosB)
    gl.uniform1f(u_SinB, sinB)
    //设置canvas背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    //清除canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    gl.drawArrays(gl.TRIANGLES, 0, n)
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
main()