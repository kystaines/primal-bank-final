import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signIn.scss';

const SignIn = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        // Implement your sign-in logic here
        console.log('Employee ID:', employeeId);
        console.log('Password:', password);
    };

    return (
        <section className='sign-cls'>

            <div className="sign-box">
                <h3 className='title'>Sign In</h3>
                <div className="input-container">
                    <label htmlFor="employeeId">Employee ID</label>
                    <input
                        type="text"
                        id="employeeId"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        placeholder="Enter your Employee ID"
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="btn-cntr">
                    <button onClick={handleSignIn}>Sign In</button>
                </div>

            </div>
            <h4>Not Registered Yet ? <span> <Link to='/signUp'>Sign Up </Link></span></h4>
        </section >
    );
};

export default SignIn;
