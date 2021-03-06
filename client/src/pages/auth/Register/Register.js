import React, {useState, useEffect} from 'react';

import styles from './Register.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';

const Register = (props) => {

    useEffect(() => {
        if (props.isAuthenticated){
            props.history.push('/');
        }
    })

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formValues);
        const {name, email, password} = formValues;
        if (name && email && password){
            const res = await props.register(name, email, password);
            // console.log(res);
            if (res.status === 'success'){
                props.history.push('/auth/confirm-email');
            }
        }

    }

    return (
        <div className={styles.container}>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.heading}>Register</h1>

                <label htmlFor="name" className={styles.label}>Name</label>
                <input className={styles.input} type="text" name='name' placeholder='Name' onChange={handleInputChange}/>

                <label htmlFor="email" className={styles.label}>Email</label>
                <input className={styles.input} type="email" name='email' placeholder='Email' onChange={handleInputChange}/>

                <label htmlFor="password" className={styles.label}>Password</label>
                <input className={styles.input} type="password" name='password' placeholder='Password' onChange={handleInputChange}/>

                {   props.error && 
                    <p style={{textAlign:'center', fontSize: '1.4rem', color: 'red'}}>{props.error}</p>
                }

                <input type="submit" value="Submit" className={styles.submit}/>

                
                <Link to='/auth/login' className={styles.link}>Already have an account ? Login</Link>
                
            </form>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error,
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (name, email, password) => dispatch(authActionCreators.register(name, email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);