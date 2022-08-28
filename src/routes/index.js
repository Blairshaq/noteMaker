const express = require('express')
const router = express.Router()

//get controller
const controller = require('../controllers').notes

//map api routes to controller functions to handle requests and response
router.get('/api/notes', controller.getAllNotes)
router.post('/api/notes', controller.createNewNote)
router.delete('/api/notes/:id', controller.deleteNote)

module.exports = router