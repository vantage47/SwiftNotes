import NoteContext from "./NoteContext";
import { useState } from 'react'
const NoteState = (props) => {
  const host = "http://localhost:5500"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  //Get all Note
  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json)
  }

  //Add a Note
  const addNotes = async (title, description, tag) => {
    //Basically a Syntax.. title, description and tag is a argument of function can be anything, that we wanna push using this function and we are pushing it to notes array we defined above..
    //API CALL
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const note = await response.json();
    setNotes(notes.concat(note))
    
    // console.log(json);
    // console.log("Added a Note");
  }

  //Delete a Note
  const deleteNotes = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
    });
    // eslint-disable-next-line
    const json = await response.json();
    // console.log(json);
    // console.log("Deleted Note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id }) //filter out notes with same id, we want to delete.. 
    setNotes(newNotes);
  }

  //Edit a Note
  const editNotes = async (id, title, description, tag) => {
    //API CALL FOR FETCHING NOTES - This we can get on google directly like search "Fetch with headers"
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic for editing note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index]; //element will have the value of notes which is currently on index while traversing the loop..  
      if (element._id === id) {  //We are comparing with the id we have provided in argument of function of const editnotes.. When the notes id we provide to editnote matches any particular notes id while traversing we will set its (note matched during traversal) value with the title, description and tag we entered as an argument in editnote... 
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag.toUpperCase();
        break;
      }
    }
    setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addNotes, deleteNotes, editNotes, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;