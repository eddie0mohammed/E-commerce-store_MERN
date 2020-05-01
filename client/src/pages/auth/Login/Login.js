import React, {useState} from 'react';

import styles from './Login.module.css';

import {Link} from 'react-router-dom';

const Login = (props) => {

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
    }

    return (
        <div className={styles.container}>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.heading}>Login</h1>

                <label htmlFor="email" className={styles.label}>Email</label>
                <input className={styles.input} type="email" name='email' placeholder='Email' onChange={handleInputChange}/>

                <label htmlFor="password" className={styles.label}>Password</label>
                <input className={styles.input} type="password" name='password' placeholder='Password' onChange={handleInputChange}/>

                <input type="submit" value="Submit" className={styles.submit}/>
                
                <Link to='/auth/request-resetpassword' className={styles.link}>Forgot your password?</Link>
                

            </form>
            
        </div>
    )
}

export default Login;