import React, {useState} from 'react';

import styles from './ResetMyPassword.module.css';

import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';

const ResetMyPassword = (props) => {

    const [formValues, setFormValues] = useState({
        currentPassword: '',
        password: '',
        confirmPassword: ''

    });

    const handleInputChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formValues);

        if (formValues.currentPassword && formValues.password && formValues.confirmPassword){
            if (formValues.password === formValues.confirmPassword){
                const res = await props.changePassword(formValues.currentPassword, formValues.password);
                 
                if (res.status === 'success'){
                    props.history.push('/auth/settings');
                }
            }
        }
    }

    return (
        <div className={styles.container}>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.heading}>Reset Password</h1>

                <label htmlFor="currentPassword" className={styles.label}>Current Password</label>
                <input className={styles.input} type="password" name='currentPassword' placeholder='Current Password' onChange={handleInputChange}/>

                <label htmlFor="password" className={styles.label}>Password</label>
                <input className={styles.input} type="password" name='password' placeholder='Password' onChange={handleInputChange}/>

                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                <input className={styles.input} type="password" name='confirmPassword' placeholder='Confirm Password' onChange={handleInputChange}/>

                { props.error && 
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
        changePassword: (currentPassword, newPassword) => dispatch(authActionCreators.changePassword(currentPassword, newPassword)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetMyPassword);