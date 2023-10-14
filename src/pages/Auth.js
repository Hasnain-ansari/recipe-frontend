import React, { useState } from 'react'
import axios from "axios";
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

export const Auth = () => {
  return (
    <div className='auth'>
        <Login/>
        <Register/>
    </div>
  );
};


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    //setting cookies
    const [_, setCookies] = useCookies(["access_token"]);

    const onSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await axios.post("https://recipebackend-pc6s.onrender.com/auth/login", {username, password});


            setCookies("access_token", response.data.token);
            //savng userid to localstorage
            window.localStorage.setItem("userID", response.data.userID);
            //navigate to home user is logged in
            navigate("/");



        } catch (error) {
            console.error(error);
        }
    }

    return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Login" onSubmit={onSubmit}/>
}


const Register = () => {

    //getting username and pass from form and sending as props to form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) =>{
        e.preventDefault();
        try {
            await axios.post("https://recipebackend-pc6s.onrender.com/auth/register", {username, password});
            alert("Registration Successfull! go to Login.")
        } catch (error) {
            console.error(error);
        }

    }



    return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit}/>

}


const Form = ({username, setUsername, password, setPassword, label, onSubmit}) =>{
    return (
        <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className='form-group'>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name='username' value={username} id='username' onChange={(e) => setUsername(e.target.value) }/>
                </div>

                <div className='form-group'>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name='password' value={password} id='password' onChange={(e) => setPassword(e.target.value) }/>
                </div>

                <button type='submit'>{label}</button>
            </form>
        </div>
    )
}

