import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import Nav from './components/Nav';
import Welcome from './components/Welcome';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  useEffect(() => {
      setError("")
  }, [])

  const Login = details => {
    fetch('http://localhost:5000/login', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(details)
    }).then((res) => {
        return res.json();
    }).then(user => {
      setCurrentUser(user);
    })
    .catch((e) => {
      console.log(e);
      setError("User doesn't exist")
    })
  }

  const Logout = () => {
    setCurrentUser({name: "", email:""});
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/login">
            {(currentUser.email !== "") ? (
              <div className="welcome">
                <h2>Welcome, <span>{currentUser.name}</span></h2>
                <button onClick={Logout}>Logout</button>
              </div>
              ) : (
              <LoginForm  Login={Login} error={error}/>
              )}
            </Route>
            <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
