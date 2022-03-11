import React from 'react';

function Welcome(user, Logout) {
    console.log(user);
    return (
        <div className="welcome">
            <h2>Welcome, <span>{user.name}</span></h2>
            <button onClick={Logout}>Logout</button>
        </div>
    )
}

export default Welcome;
