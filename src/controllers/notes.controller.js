const fs = require('fs')

const path = require('path')
const getAllNotes = (req, res) => {
    fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", (error,notes) => {
        if (error) {
            return console.log(error)
        }
        res.json(JSON.parse(notes))
    })
} //end function

const createNewNote = (req, res) => {
//get the request json object
const currentNote = req.body

//read the existing db.json file
//then add 1 to get unique id

fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", (error, notes) => {
  if (error) {
      return console.log(error)
  }
  notes = JSON.parse(notes)
  //give unique id to every new note depending on last id.
  //if no items in notes array, assign id as 10
  if (notes.length > 0) {
  let lastId = notes[notes.length - 1].id
  var id =  parseInt(lastId)+ 1
  } else {
    var id = 10
  }

  //create new note object
  let newNote = { 
    title: currentNote.title, 
    text: currentNote.text, 
    id: id 
    }

  //combine new note and existing notes array
  var newNotesArr = notes.concat(newNote)

  //save data to db.json file and retuern it back
  fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(newNotesArr), (error, data) => {
    if (error) {
      return error
    }
    console.log(newNotesArr)
    res.json(newNotesArr)
  })
})
} //end function

const deleteNote = (req, res) => {
    let deleteId = JSON.parse(req.params.id)
    
    //read db.json
    fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", (error,notes) => {
      if (error) {
          return console.log(error)
      }
     let notesArray = JSON.parse(notes)

     //iterate over notes array and remove note with id matching deleteId
     for (var i=0; i<notesArray.length; i++){
       if(deleteId == notesArray[i].id) {
         notesArray.splice(i,1)
  
         fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(notesArray), (error, data) => {
          if (error) {
            return error
          }
          console.log(notesArray)
          res.json(notesArray)
        })
       }
    }
    
}) 
} //end function


//export all functions to connecct with routes
module.exports = {
    getAllNotes,
    createNewNote,
    deleteNote
}