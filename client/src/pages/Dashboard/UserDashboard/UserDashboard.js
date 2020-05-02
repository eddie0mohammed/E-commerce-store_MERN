import React, {useEffect} from 'react';

import styles from './UserDashboard.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const UserDashboard = (props) => {


    useEffect(() => {
    
        if (props.user && props.user.role === 1){
            props.history.push('/admin/dashboard');
        }
    });

    return (
        <div className={styles.container}>

            <h1 className={styles.heading}>User Dashboard</h1>

            { props.user && 
                <div className={styles.row}>

                
                    <div className={styles.leftContainer}>
                        
                        <div className={styles.table}>
                            <p className={styles.tableHead}>User Links</p>
                            <p className={styles.content}><Link className={styles.link} to='/cart'>My Cart</Link></p>
                            <p className={styles.content}><Link className={styles.link} to='/profile/update'>Update Profile</Link></p>
        
                        </div>

                    </div>

                    <div className={styles.rightContainer}>

                        <div className={styles.table}>

                            <p className={styles.tableHead}>User Information</p>
                            <p className={styles.content}>Name: {props.user.name}</p>
                            <p className={styles.content}>Email: {props.user.email}</p>
                            <p className={styles.content}>Role: {props.user.role === 0 ? 'User' : 'Admin'}</p>
                        </div>


                        <div className={styles.table}>

                            <p className={styles.tableHead}>Purchase History</p>
                            <p className={styles.content}>history</p>

                        </div>

                    </div>


                </div>
            }
            
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);