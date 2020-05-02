import React, {useState} from 'react';

import styles from './ResetPassword.module.css';

import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';

const ResetPassword = (props) => {

    const [formValues, setFormValues] = useState({
        
        password: '',
        confirmPassword: ''

    });

    const handleInputChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formValues);
        if (formValues.password && formValues.confirmPassword && formValues.password === formValues.confirmPassword){
            
            const res = await props.resetPassword(formValues.password, props.match.params.token);

            if (res.status === 'success'){
                props.history.push('/auth/login');
            }

        }
    }

    return (
        <div className={styles.container}>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.heading}>Reset Password</h1>


                <label htmlFor="password" className={styles.label}>Password</label>
                <input className={styles.input} type="password" name='password' placeholder='Password' onChange={handleInputChange}/>

                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                <input className={styles.input} type="password" name='confirmPassword' placeholder='Confirm Password' onChange={handleInputChange}/>

                {props.error && 
                    <p style={{color: 'red', textAlign: 'center', fontSize: '1.4rem'}}>{props.error}</p>
                }
                <input type="submit" value="Submit" className={styles.submit}/>
    
                
                
            </form>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (password, token) => dispatch(authActionCreators.resetPassword(password, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);