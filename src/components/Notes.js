import React, { useContext, useEffect, useRef, useState } from 'react' //useContext is used to call global props we defined in context API in notes folder... 
// import { Modal } from 'react-bootstrap';
import noteContext from "../context/notes/NoteContext"
import AddNotes from './AddNotes'; //This is component which will provide a input to make a new note..
import NoteItem from "./NoteItem" //This component will make use of fetch Notes api to display all notes of a user..

const Notes = (props) => {

    //Context-API 
    const context = useContext(noteContext); //Made using useContext Snippet to make use of props defined in context API..
    // eslint-disable-next-line   ---- This is used to disable warning of particular line which you will work later.. Just add it before the desired line to disable its warning....
    const { notes, getNotes, editNotes } = context;

    //Running getNotes whenever page opens... 
    useEffect(() => { //Use effect is used by us to display all the fetched notes at start because we are not adding a button to display all notes it is done when the page opens..  
        getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps   
        }, [])

    //Setting up MODAL for editing note and using useRef to click button which opens MODAL when we click "pen" button in Noteitems.js...
    const ref = useRef(null) //useRef Snippet.. Useref is used to make a click at one button when someother btn is actually clicked.. 
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        // console.log("hh");
        ref.current.click(); //When we click pen button, it will call updateNote function which will call ref.curent.click which will trigger action inside ref mentioned in button tag of Modal.. 
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        // props.showAlert("Successfully edited the note", "success") -- Here actually we are just opening modal.. See 5th lines below.. 
    }
    const handleClick = (e) => {
        editNotes(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Successfully edited the note", "success")  //Here actual editing is completed
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const { showAlert } = props; //Destructuring
    return (
        <div>
            <AddNotes showAlert={showAlert} />

            {/* Modal  */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Displaying all notes */}
            <div className='row my-3'>
                <h2>Your Note</h2>
                {notes.length === 0 && <div className="text-center">
                    <h1 className="display-6">No Notes to display...</h1>
                    <img src="https://i.ibb.co/vcJNznz/No-results-found-illustration-generated.jpg" alt='No Results Found
                    ' className="shp" width={500} height={250}></img>
                </div>}
                {notes.map((note) => {   //This is just a syntax where we can write anything instead of 'note' and 'note' is used to get value of JS Object which was used to define props (Context API) in NoteState.js 
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />
                })}
            </div>
        </div>
    )
}
export default Notes