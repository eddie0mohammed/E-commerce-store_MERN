import React, {useEffect} from 'react'

import styles from './Order.module.css';

import {connect} from 'react-redux';

import * as orderActionCreators from '../../Redux/Actions/OrderActionCreators';

const Order = (props) => {

    useEffect(() => {

        const fetchOrders = async () => {
            await props.getAllOrders();
        }

        fetchOrders();

        // eslint-disable-next-line
    }, []);

    const renderOrders = () => {

        if (props.orders.length > 0){

            return props.orders.map((elem, i) => (
                <div key={i} className={styles.row}>
                    <p className={styles.content}>{i + 1}. {elem._id}</p>
                    <p className={styles.content}>{elem.createdAt.split('T')[0]}</p>
                    <p className={styles.content}>{elem.user}</p>
                    <p className={styles.content}>{elem.status}</p>
                </div>

            ))

        }else{
            return <h2 className={styles.h2}>No orders</h2>
        }
    }

    return (
        <div className={styles.container} >

            <div className={styles.head}>
                <h1 className={styles.heading}>All Orders</h1>
            </div>


            <div className={styles.mainContainer}>

                <div className={styles.header__row}>
                    <p className={styles.content}>Order #</p>
                    <p className={styles.content}>Date</p>
                    <p className={styles.content}>UserId</p>
                    <p className={styles.content}>Status</p>

                </div>


                <div>
                    {renderOrders()}
                </div>
                
               

            </div>

            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        getAllOrders: () => dispatch(orderActionCreators.getAllOrders()),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Order);