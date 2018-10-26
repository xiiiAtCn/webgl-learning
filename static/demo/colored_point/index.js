//顶点着色器
let VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main () {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
    }
`

//片元着色器程序
let FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor;
     void main() {
         gl_FragColor = u_FragColor;
     }
`

function main() {
    let canvas = document.querySelector('#webgl')
    let gl = canvas.getContext('webgl')
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('fail to initialize shaders')
        return
    }
    // 获取attribute变量的存储位置
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position')
        return
    }
    
    let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
   
    canvas.onmousedown = function (e) {
        click(e, gl, canvas, a_Position, u_FragColor)
    }
    
    // 将顶点位置传输给attribute变量
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
    // gl.vertexAttrib1f(a_PointSize, 12.0)
    //设置canvas背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    //清除canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
}

main()

let g_points = []
let g_colors = []
function click(ev, gl, canvas, a_Position, u_FragColor) {
    let x = ev.clientX
    let y = ev.clientY
    console.log(ev)
    let rect = ev.target.getBoundingClientRect()
    x = (x - rect.left - canvas.height / 2) / (canvas.height / 2)
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2)
    g_points.push([x, y])

    if (x >= 0.0 && y >= 0.0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0])
    } else if (x < 0.0 && y <0.0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0])
    } else {
        g_colors.push([1.0, 1.0, 1.0, 1.0])
    }

    gl.clear(gl.COLOR_BUFFER_BIT)
    let len = g_points.length
    for (let i = 0; i < len; i++) {
        let rgba = g_colors[i]
        gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0, 0)
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3])
    }
    gl.drawArrays(gl.POINTS, 0, 1)
}