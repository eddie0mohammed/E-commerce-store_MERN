import React, {useEffect} from 'react';

import styles from './UserDashboard.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as orderActionCreators from '../../../Redux/Actions/OrderActionCreators';

const UserDashboard = (props) => {


    useEffect(() => {
    
        if (props.user && props.user.role === 1){
            props.history.push('/admin/dashboard');
        }
    });

    useEffect(() => {
        props.getUserOrders();
        // eslint-disable-next-line
    }, []); 


    const renderOrders = () => {
        if (props.orders.length > 0){
            return (
              
                props.orders.map((elem, i) => {
                    return (
                        <div key={elem._id} className={`${styles.row} ${styles.content}` }>
                            <p>{i + 1}. {elem._id}</p>
                            <p>{elem.createdAt.split('T')[0]}</p>
                            <p>{elem.status}</p>

                        </div>
                    )
                })
            );

        }else{
            return <p className={styles.content}>No orders found</p>
        }
    }

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
                            {/* <p className={styles.content}>history</p> */}
                            {renderOrders()}

                        </div>

                    </div>


                </div>
            }
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        orders: state.orders.orders
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getUserOrders: () => dispatch(orderActionCreators.getUserOrders()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);