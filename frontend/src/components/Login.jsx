import React,{useState} from 'react';
import axios from 'axios'
import getCookie from './utils';
import {Redirect} from 'react-router-dom';

const Login = () => {

    const [loading,setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")

    const loginFunction = (e) => {
        e.preventDefault();
        setLoading(true)
        const form = new FormData(e.target);

        const csrftoken = getCookie('csrftoken');
        const axiosConfig = {
                headers: {
                    "X-CSRFToken": csrftoken
                }
              };
              
        axios.post('/api/login/',form,axiosConfig)
    
        .then(res => {
            console.log(res.data)
            setLoading(false)
            window.location = "/"

        })
        .catch(err => {
            console.log(err.response.data);
            // console.log(err.response.data);
            setErrorMsg(err.response.data[0])
            setLoading(false);
        })

    }

    return (
        isAuthenticated ? <Redirect to = '/' /> :
        <>
            <div className=" login_wrapper">
                <div className="box-element">

                    <p> Create a new account </p>
                    <h2 style = {{
                        textAlign:"center",
                        margin:"4vh 0"
                    }}> Log In </h2>

                    <div style = {{
                        margin:"3vh 0"
                    }}>
                        <p>Please sign in using the given credentials:-</p>
                        <p> Email:- test@gmail.com </p>
                        <p> Password:- testing12345</p>
                    </div>

                    {
                        errorMsg !== ""?
                        <div className="login_error">
                            <p> {errorMsg} </p>
                        </div>
                        :
                        null
                    }

                    <form action="" onSubmit = {loginFunction}>
                        <input className = "formStyle" type="email" name="email" placeholder = "&#61447; johnsmith@gmail.com" required/> <br/> <br/>
                        <input className = "formStyle" type="password" name="password" placeholder = "&#61475; **********" required />

                        <span className = "login_span">
                            <p> Forgot Password </p>
                            <p> Not a member yet? </p>
                        </span>
                        <center>
                            <button className = "btn btn-secondary" disabled = {loading} > SIGN IN </button>
                        </center>
                    </form>
                </div>
            </div>
        </>
    )
} 
export default Login;