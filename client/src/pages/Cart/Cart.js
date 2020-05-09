import React from 'react';

import styles from './Cart.module.css';

import {connect} from 'react-redux';

import * as cartActionCreators from '../../Redux/Actions/CartActionCreators';

const Cart = (props) => {



    const handleChange = (type, productId) => {
        if (type === 'inc'){
            props.inc(productId);
        }else{
            props.dec(productId);
        }
    }

    const renderCartItems = () => {

        return props.cartItems.length > 0 && props.cartItems.map((elem, i) => {
            return (
                <div key={i} className={styles.body_row}>
                    <div className={styles.imgContainer}>
                        <img className={styles.img} src={`/images/${elem.productImageURL}`} alt="img"/>
                    </div>

                    <p className={styles.name}>{elem.name}</p>

                    <div className={styles.quantity}>
                        <span className={styles.dec} onClick={() => handleChange('dec', elem._id)}>&larr;</span>
                        <p className={styles.number}>{elem.sold}</p>
                        <span className={styles.dec} onClick={() => handleChange('inc', elem._id)}>&rarr;</span>
                    </div>

                    <p className={styles.price}>${elem.price}</p>

                    <div className={styles.remove} onClick={() => props.remove(elem._id)}>&times;</div>

                </div>   
            )
        })
    }

    return (

        <div className={styles.container}>

            <div className={styles.head}>
                <h1 className={styles.heading}>Cart</h1>
                <div className={styles.checkout} onClick={() => props.history.push('/checkout')}>Checkout</div>
            </div>

            <div className={styles.cartComponent}>

                <div className={styles.header}>
                    <div className={styles.row}>
                        <p className={styles.table_heading}>Product</p>
                        <p className={styles.table_heading}>Name</p>
                        <p className={styles.table_heading}>Quantity</p>
                        <p className={styles.table_heading}>Price</p>
                        <p className={styles.table_heading}>Remove</p>
                    </div>
                </div>

                <div className={styles.body}>

                    {renderCartItems()}
                                     

                </div>

            </div>



            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartReducer.cartItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        inc: (productId) => dispatch(cartActionCreators.inc(productId)),
        dec: (productId) => dispatch(cartActionCreators.dec(productId)),
        remove: (productId) => dispatch(cartActionCreators.removeItem(productId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);