import React, {useState, useEffect} from 'react';

import styles from './Login.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';

const Login = (props) => {

    useEffect(() => {
        if (props.isAuthenticated){
            props.history.push('/');
        }
    })

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formValues);

        if (formValues.email && formValues.password){

            const res = await props.login(formValues.email, formValues.password);
            // console.log(res);
            if (res.status === 'success'){    
                props.history.push('/user/dashboard');
            }
        }

    }

    return (
        <div className={styles.container}>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.heading}>Login</h1>

                <label htmlFor="email" className={styles.label}>Email</label>
                <input className={styles.input} type="email" name='email' placeholder='Email' onChange={handleInputChange}/>

                <label htmlFor="password" className={styles.label}>Password</label>
                <input className={styles.input} type="password" name='password' placeholder='Password' onChange={handleInputChange}/>

                {   props.error && 
                    <p style={{textAlign:'center', fontSize: '1.4rem', color: 'red'}}>{props.error}</p>
                }

                <input type="submit" value="Submit" className={styles.submit}/>
                
                <Link to='/auth/request-resetpassword' className={styles.link}>Forgot your password?</Link>
                

            </form>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(authActionCreators.login(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);