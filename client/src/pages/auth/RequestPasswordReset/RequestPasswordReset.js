import React, {useState} from 'react';

import styles from './RequestPasswordReset.module.css';

const RequestPasswordReset = (props) => {

    const [formValues, setFormValues] = useState({
        email: '',
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
                <h1 className={styles.heading}>Reset Password</h1>


                <p className={styles.message}>Enter your email. A password reset link will be sent to your email. Use the link to reset your password</p>

                <input className={styles.input} type="email" name='email' placeholder='Email' onChange={handleInputChange}/>

                <input type="submit" value="Submit" className={styles.submit}/>
                
            </form>
            
        </div>
    )
}

export default RequestPasswordReset;