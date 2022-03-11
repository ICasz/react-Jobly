import React, {useState} from 'react'
import '../StyleSheets/Login.css'

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({name: "", email: "", password: ""});

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }

    return (
    <form onSubmit={submitHandler}>
        <div className='login-form'>
            <h2>Login</h2>
            <div className='form-group'>
                <label>Email:</label> <br/>
                <input type='text' name='email' id='email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
            </div>
            <div className='from-group'>
                <label>Password:</label> <br/>
                <input type='password' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>
            {(error != "") ? ( <div className="error">{error}</div> ) : ""}
            <input id="button" type='Submit' value='Login'/>
        </div>
    </form>
  )
}

export default LoginForm;
