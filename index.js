const express = require('express')
const path = require('path')

const app = express()
var PORT = process.env.PORT || 3001
app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//serve landig page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

//serve notes page
app.get("/notes", (req, res) => {
   res.sendFile(path.join(__dirname, "./public/notes.html"))
})


//expose all the routes to frontend
const routes = require('./src/routes')

app.use(routes)


//initialize port to start listening
app.listen(PORT, () => console.log(`Express Server is Running on PORT ${PORT}!`))
