import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"; //Harry has used useHistory hook but in 6.8.0 react-router-dom useNavigate is available... It is used to redirect...

const Signup = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        //API CALL
        const response = await fetch(`http://localhost:5500/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }) // We are providing headers and body as per we made end points in Thunderclient... We could also use destructuring to give all arguments in stringify.. Just write {name,email,password} = credentials below handleSubmit function and write body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success) { //We have set success default value as false in auth.js create user section and will update its value to true if auth token is successfully generated.. 
            //Save the auth-token & redirect
            props.showAlert("Account created successfully", "success")
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('email', credentials.email)
            navigate("/");  //harry has used useHistory hook but in 6.8.0 react-router-dom useNavigate is available... 
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    // if (credentials.cpassword.length===0) {
    //     var disp = "none"
    // }
    // else{
    //     disp = ""
    // }
    return (
        <>
        <h2>Enter your details to Signup</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
                <label htmlFor="name">Enter your Name</label>
                <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" placeholder="Enter your name" required />
            </div>
            <div className="form-group my-3">
                <label htmlFor="email">Enter Email address</label>
                <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" required />
            </div>

            <div className="form-group my-3">
                <label htmlFor="password">Create a New Password</label>
                <input type="password" className="form-control" id="password" name='password' onChange={onChange} placeholder="Password" minLength={5} required />
            </div>

            <div className="form-group my-3">
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} placeholder="Password" minLength={5} required />
            </div>
            <p className='fw-bold text-danger'>{credentials.password.toString() !== credentials.cpassword.toString() ? "Confirm Password and Password doesn't Match":""}</p>
            <p className='fw-bold text-success' style={{display: credentials.cpassword.length===0? "none":""}}>{credentials.password.toString() === credentials.cpassword.toString() ? "Confirm Password and Password Match":""}</p>
            <button type="submit" disabled={credentials.password !== credentials.cpassword || credentials.password.length<5} className="btn btn-primary" >Submit</button>
        </form>
        </>
    )
}

export default Signup