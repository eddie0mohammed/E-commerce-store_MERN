import React from 'react';

import styles from './AdminDashboard.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const AdminDashboard = (props) => {

    return (
        <div className={styles.container}>

            <h1 className={styles.heading}>Admin Dashboard</h1>
            
            { props.user && 
                <div className={styles.row}>

                
                    <div className={styles.leftContainer}>
                        
                        <div className={styles.table}>
                            <p className={styles.tableHead}>Admin Links</p>
                            <p className={styles.content}><Link className={styles.link} to='/create/category'>Create Category</Link></p>
                            <p className={styles.content}><Link className={styles.link} to='/create/product'>Create Product</Link></p>
                            <p className={styles.content}><Link className={styles.link} to='/products'>All Products</Link></p>
        
                        </div>

                    </div>

                    <div className={styles.rightContainer}>

                        <div className={styles.table}>

                            <p className={styles.tableHead}>Admin Information</p>
                            <p className={styles.content}>Name: {props.user.name}</p>
                            <p className={styles.content}>Email: {props.user.email}</p>
                            <p className={styles.content}>Role: {props.user.role === 0 ? 'User' : 'Admin'}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);