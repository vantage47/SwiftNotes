import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"; //Harry has used useHistory hook but in 6.8.0 react-router-dom useNavigate is available... It is used to redirect...

const Login = (props) => {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        //API CALL
        const response = await fetch(`http://localhost:5500/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // We are providing headers and bbody as per we made end points in Thunderclient... 
        });
        const json = await response.json();
        console.log(json);
        if (json.success) { //We have set success default value as false in auth.js login section and will update its value to true if auth token is successfully generated.. 
            //Save the auth-token & redirect
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('email', credentials.email)
            props.showAlert("Logged-in successfully", "success")
            navigate("/");  //harry has used useHistory hook but in 6.8.0 react-router-dom useNavigate is available... 
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h2>Login to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </>
    )
}

export default Login