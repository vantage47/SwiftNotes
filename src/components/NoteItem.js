import React, { useContext } from 'react'
import noteContext from "../context/notes/NoteContext"
const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {deleteNotes} = context;
    const { note , updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{width: "18rem"}}>
                {/* <img src="..." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                    <h4 className="card-title">{note.title}</h4>
                    <p className="card-text">{note.description}</p>
                    <p className="card-subtitle mb-2 text-muted">{note.tag}</p>
                    <p className="card-text font-italic">{note.date.substr(0,10)}</p>
                    <p className="card-text font-italic">{note.date.substring(11,16)}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNotes(note._id); props.showAlert("Deleted Successfully", "success");}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem