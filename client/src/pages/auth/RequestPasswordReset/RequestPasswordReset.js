import React, {useState} from 'react';

import styles from './RequestPasswordReset.module.css';

import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';

const RequestPasswordReset = (props) => {

    const [formValues, setFormValues] = useState({
        email: '',
    });

    const handleInputChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formValues);

        if (formValues.email){
            const res = await props.requestPasswordReset(formValues.email);
            console.log(res);
            if (res.status === 'success'){
                props.history.push('/auth/confirm-passwordReset');
            }

        }
    }

    return (
        <div className={styles.container}>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.heading}>Reset Password</h1>


                <p className={styles.message}>Enter your email. A password reset link will be sent to your email. Use the link to reset your password</p>

                <input className={styles.input} type="email" name='email' placeholder='Email' onChange={handleInputChange}/>

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
        error: state.error.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestPasswordReset: (email) => dispatch(authActionCreators.requestPasswordReset(email)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPasswordReset);