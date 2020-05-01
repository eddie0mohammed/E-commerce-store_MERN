import React, {useState} from 'react';

import styles from './ResetMyPassword.module.css';

const ResetMyPassword = (props) => {

    const [formValues, setFormValues] = useState({
        currentPassword: '',
        password: '',
        confirmPassword: ''

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

                <label htmlFor="currentPassword" className={styles.label}>Current Password</label>
                <input className={styles.input} type="password" name='currentPassword' placeholder='Current Password' onChange={handleInputChange}/>

                <label htmlFor="password" className={styles.label}>Password</label>
                <input className={styles.input} type="password" name='password' placeholder='Password' onChange={handleInputChange}/>

                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                <input className={styles.input} type="password" name='confirmPassword' placeholder='Confirm Password' onChange={handleInputChange}/>

                <input type="submit" value="Submit" className={styles.submit}/>
    
                
                
            </form>
            
        </div>
    )
}

export default ResetMyPassword;