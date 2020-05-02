import React from 'react';

import styles from './Settings.module.css';

import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

// import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';

const Settings = (props) => {

    return (
        <div className={styles.container}>
            
            <div className={styles.form} >
                <h1 className={styles.heading}>Settings</h1>

                {props.user && 
                <>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input className={styles.input} type="text" name='name' placeholder='Name' value={props.user.name} disabled/>

                <label htmlFor="email" className={styles.label}>Email</label>
                <input className={styles.input} type="email" name='email' placeholder='Email' value={props.user.email} disabled/>

                <label htmlFor="createdAt" className={styles.label}>Created At</label>
                <input className={styles.input} type="test" name='createdAt' placeholder='Created At' value={props.user.createdAt.split('T')[0]} disabled/>


                <Link to='/auth/reset-mypassword' className={styles.change}>Change Password</Link>
                </>
                
                }

            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);