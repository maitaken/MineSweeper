const express = require('express')

const app = express()

app.use(express.static('static'))

var server = app.listen(3000,() => {
    console.log("Server is running!")
})