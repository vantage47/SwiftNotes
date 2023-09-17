import React, { useContext, useState } from 'react' //useContext is used to call global props we defined in context API in notes folder... 
import noteContext from '../context/notes/NoteContext'
const AddNotes = (props) => {
    const context = useContext(noteContext); //Made using useContext Snippet to make use of props defined in context API..
    // eslint-disable-next-line   ---- This is used to disable warning of particular line which you will work later.. Just add it before the desired line to disable its warning.... 
    const { addNotes } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const onChange = (e) => { //Onchange gives us an event that is mentioned using "e"
        setNote({ ...note, [e.target.name]: e.target.value })   //We want to change state of "note" as we make any change.. So this is a syntax for it.. We are just setting e.target.name which is "title" and "description" for Title and Description respectively.. 
    }

    const addnotes_btn = (e) => {
        e.preventDefault(); //So when we add a new note by clicking addnotes_btn it shouldn't refresh page hence added this.. 
        addNotes(note.title, note.description, note.tag.toUpperCase()); //Using context API we are making new notes and appending it to the string of notes defind in NoteState in context folder...
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Successfully added the note", "success")
    }
    
    return (
        <div>
            <div className='container my-3'>
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label> {/* "htmlFor" i.e. "for" and "id" connects the form to its label so anyone clicking on label will active form for edit */}
                        <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                    </div>
                    <p className='fw-bold text-danger'>{(note.title.length>0&&note.title.length<5)? "Length should be more than 5":""}</p>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                    </div>
                    <p className='fw-bold text-danger'>{(note.description.length>0&&note.description.length<5)? "Length should be more than 5":""}</p>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={addnotes_btn}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNotes