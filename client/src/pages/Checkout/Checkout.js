import React, {useState, useEffect} from 'react'

import styles from './Checkout.module.css';

import {connect} from 'react-redux';
import DropIn from 'braintree-web-drop-in-react';

import * as paymentActionCreators from '../../Redux/Actions/PaymentActionCreators';
import * as cartActionCreators from '../../Redux/Actions/CartActionCreators';
import * as orderActionCreators from '../../Redux/Actions/OrderActionCreators';

const Checkout = (props) => {

    const [data, setData] = useState({
        loading: true,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    

    useEffect(() => {
        const getToken = async () => {
            const res = await props.getPaymentToken();
            console.log(res);
            if (res.success){
                console.log(res.status);
                setData({...data, clientToken: res.clientToken, loading: false});       
            }
        }

        getToken();
        
    // eslint-disable-next-line
    }, []);


    const DropInComponent = () => (
        <div className={styles.DropInContainer}>
            {data.clientToken !== null && props.cartItems.length > 0 &&

                <div >
                    <DropIn options={{
                        authorization: data.clientToken,
                        // paypal: {
                        //     flow: 'vault'
                        // }
                    }} onInstance={instance => data.instance = instance}/>

                    <div className={styles.btn} onClick={handlePayment}>Pay</div>
                </div>
            }

        </div>
    )

    const calculateTotal = () => {
        let total = 0;
        
        if (props.cartItems.length > 0){
            
            total = props.cartItems.reduce((acc, elem) => {
                return acc + elem.price
            }, 0);

        }

        return total;
    }

    

    const handlePayment = async () => {
        //send nonce to the server
        //nonce is equal to data.instance.requestPaymentMethod()
        let nonce;

        // data.instance.requestPaymentMethod()
        //     .then((response) => {
        //         // console.log(response);
        //         nonce = response.nonce;
        //         //once you have nonce (cardtype, card number), send nonce as payment + total
        //         const paymentData = {
        //             paymentMethodNonce: nonce,
        //             amount: calculateTotal()
        //         }
        //         props.processPayment(paymentData)
        //             .then(res => {
        //                 // console.log(res.data)
        //                 setData({...data, success: res.data.success});
                        
        //                 //empty cart 
        //                 props.clearCartItems();
        //                 //create order

        //             })
        //             .catch(err => console.log(err));
        //     })
        //     .catch(err => {
        //         console.log('DropIn error', err);
        //         setData({...data, error: err.message});
        //     })


        try{
            const response = await data.instance.requestPaymentMethod();
            nonce = response.nonce;
            
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: calculateTotal()
            }

            props.processPayment(paymentData)
                .then(async (res) => {
                    // console.log(res.data)
                    setData({...data, success: res.data.success});
                    
                    const orderData = {
                        products: props.cartItems,
                        amount: calculateTotal(),
                        transactionId: res.data.transaction.id
                    }
                    //create order
                    await props.createOrder(orderData);
                    
                    
                    //empty cart 
                    props.clearCartItems();

                    props.history.push('/user/dashboard');
                })
                .catch(err => console.log(err));


        }catch(err){
            console.log('DropIn error', err);
            setData({...data, error: err.message});

        }
    }


    return (
        <div className={styles.container}>

             <div className={styles.head}>
                <h1 className={styles.heading}>Checkout</h1>
            
            </div>

            {!data.success && !data.loading && <div className={styles.details}>
                <h2 className={styles.total}>Your total is ${calculateTotal()}</h2>

            </div>}

            {data.loading? 
                <h1 className={styles.loading}>Loading</h1>
                :
                !data.success && DropInComponent()

            }

            {data.success && <h2 style={{textAlign:'center', color: 'green'}}>Payment Successful</h2> }
        
            
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
        getPaymentToken: () => dispatch(paymentActionCreators.getPaymentToken()),
        processPayment: (paymentData) => dispatch(paymentActionCreators.processPayment(paymentData)),
        clearCartItems: () => dispatch(cartActionCreators.clearCartItems()),
        createOrder: (orderData) => dispatch(orderActionCreators.createOrder(orderData)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
