// Boiler plate - rafce
import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    let location = useLocation();

    let navigate = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        navigate('/login')
    }

    useEffect(() => { //This is useLocation hook provided by react-router-dom so that we can know which tab we are in home or about to highlight it 
        // console.log(location)
    }, [location]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">iNotes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to='/'>Home</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link></li>
                        </ul>
                        {!localStorage.getItem('token')? <form className="d-flex" role="search">
                            <button className="btn btn-outline-light mx-2"><Link className={`nav-link ${location.pathname === '/login' ? "active" : ""}`} to='/login'>Login</Link></button>
                            <button className="btn btn-outline-light mx-2"><Link className={`nav-link ${location.pathname === '/signup' ? "active" : ""}`} to='/signup'>SignUp</Link></button>
                        </form>:<><h5 className='text-light'>Welcome, {localStorage.getItem('email')}!</h5><button className="btn btn-outline-light mx-2" onClick={handleLogout}>Logout</button></>} 
                        {/* When Logged in i.e. localstorage doesn't has the 'token then show Login and Signup else show Logout  */}
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Navbar