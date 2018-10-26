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

function main() {
    let canvas = document.querySelector('#webgl')
    let gl = canvas.getContext('webgl')
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('fail to initialize shaders')
        return
    }
    // 获取attribute变量的存储位置
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    canvas.onmousedown = function (e) {
        click(e, gl, canvas, a_Position)
    }

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position')
        return
    }
    
    let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    // 将顶点位置传输给attribute变量
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
    gl.vertexAttrib1f(a_PointSize, 12.0)
    //设置canvas背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    //清除canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
}

let g_points = []

function click(ev, gl, canvas, a_Position) {
    let x = ev.clientX
    let y = ev.clientY
    console.log(ev)
    let rect = ev.target.getBoundingClientRect()
    x = (x - rect.left - canvas.height / 2) / (canvas.height / 2)
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2)
    g_points.push(x)
    g_points.push(y)
    gl.clear(gl.COLOR_BUFFER_BIT)
    let len = g_points.length
    for (let i = 0; i < len; i+=2) {
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0, 0)
    }
    gl.drawArrays(gl.POINTS, 0, 1)
}

main()