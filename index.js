const express = require('express')
const opener = require('opener')
const fs = require('fs')
const path = require('path')
const mume = require("@shd101wyy/mume")
const app = express()

app.use(express.static('static'))

mume.init()

app.get('/raw', async (req, res) => {
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
    /* const engine = new mume.MarkdownEngine({
        filePath: fileName,
        config: {
          previewTheme: "github-light.css",
          // revealjsTheme: "white.css"
          codeBlockTheme: "default.css",
          printBackground: true,
          enableScriptExecution: true, // <= for running code chunks
        },
      });
      let page =await engine.htmlExport({ offline: false, runAllCodeChunks: true }) */
})

app.listen(3000, () => {
    console.log('server start at http://localhost:3000')
})