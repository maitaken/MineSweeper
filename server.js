const http =  require('http')
const fs = require('fs')
const url = require('url')
// const ejs = require('ejs')

var server = http.createServer(getFromClient)

server.listen(3000)

const index_page = fs.readFileSync('./static/index.html','utf8')
const index_js = fs.readFileSync('./static/js/main.js','utf8')
const vue_js = fs.readFileSync('./static/js/vue.js','utf8')
const index_css = fs.readFileSync('./static/css/main.css','utf8')

const flag_image = fs.readFileSync('./static/image/flag.png','binary')
const bom_image = fs.readFileSync('./static/image/bom.png','binary')

console.log("server start listening")

function getFromClient(req,res){
    var url_parts = url.parse(req.url,true)

    console.log(url_parts.pathname)

    switch(url_parts.pathname){
        case "/":
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(index_page)
            break
        case "/js/vue.js":
            res.writeHead(200,{'Content-Type':'text/js'})
            res.write(vue_js)
            break
        case "/js/main.js":
            res.writeHead(200,{'Content-Type':'text/js'})
            res.write(index_js)
            break
        case "/css/main.css":
            res.writeHead(200,{'Content-Type':'text/css'})
            res.write(index_css)
            break
        case "/image/flag.png":
            res.writeHead(200,{'Content-Type':'image/png'})
            res.write(flag_image,'binary')
            break
        case "/image/bom.png":
            res.writeHead(200,{'Content-Type':'image/png'})
            res.write(bom_image,'binary')
            break
        default:
            res.write("No Page")
            break
    }
    res.end()
}