const express = require('express')
const opener = require('opener')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.static('static'))



app.get('/raw', (req, res) => {
    console.log(req.query)
    let fileName = req.query.file
    fileName = path.resolve(__dirname, `./static${fileName}`)
    fileName = fileName.replace(/\\/g, '/')
    console.log(fileName)
    fs.readFile( fileName, (err, file) => {
        if (!err) {
            res.send(`<div style='margin: 0 30%;'><pre>${file.toString()}</pre></div>`)
        } else {
            res.send(err.toString())
        }
    })
})

app.listen(3000, () => {
    console.log('server start at http://localhost:3000')
})