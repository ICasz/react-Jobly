import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../StyleSheets/Register.css'


function Register () {
    const [name, setName] =  useState("");
    const [email, setEmail] =  useState("");
    const [password, setPassword] =  useState("");
    const [cPassword, setCPassword] =  useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        var user = null;
        if(name === "" || email === "" || password === "") {
          setError('All fields are required');
          return;
        }
        else if (password === cPassword) {
            user = {name, email, password};
        }
        else {
            setError('Passwords do not match')
            return;
        }
        console.log("Fethcing")
        if(user.email !== "") {
          fetch ('http://localhost:5000/addUser', {
              method: 'POST',
              headers: { "Content-Type": "application/json"},
              body: JSON.stringify(user)
          }).then(() => {
              console.log('New user added');
              history.push('/login');
          })
        }
    }

    return (
        <div className='registerForm'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label>Name:</label> <br/>
              <input type="text" name="name" placeholder='Name' onChange={(e) => setName(e.target.value)}/><br/>
          </div>
          <div className="form-group">
              <label>Email:</label><br/>
              <input type="text" name="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/><br/>
          </div>
          <div className="form-group">
              <label>Password:</label><br/>
              <input type="password" name="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/><br/>
          </div>
          <div className="form-group">
              <label>Confirm Password:</label><br/>
              <input type="password" placeholder='Password' onChange={(e) => setCPassword(e.target.value)}/> <br/>
          </div>
              <label className="error"> {error} </label><br/>
              <input id="button" type="submit" value="submit"/>
        </form>
        </div>
    )
}

export default Register;
