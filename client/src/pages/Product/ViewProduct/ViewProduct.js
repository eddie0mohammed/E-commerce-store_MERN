import React, {useState, useEffect} from 'react';

import styles from './ViewProduct.module.css';

import {connect} from 'react-redux';

import * as productActionCreators from '../../../Redux/Actions/ProductActionCreator';
import * as cartActionCreators from '../../../Redux/Actions/CartActionCreators';

const ViewProduct = (props) => {

    const [product, setProduct] = useState(null);
    const [msg, setMsg] = useState('');

    useEffect(() => {

        const fetchProducts = async () => {
            await props.getAllProducts()
        }
         
        let productId;
        let selectedProduct;
        if (props.products.length === 0){
            fetchProducts();
            productId = props.match.params.productId;
            selectedProduct = props.products.filter(product => product._id === productId)[0];
            setProduct(selectedProduct);
        }else{
            productId = props.match.params.productId;
            selectedProduct = props.products.filter(product => product._id === productId)[0];
            setProduct(selectedProduct);
        }
        // eslint-disable-next-line
    }, [props.products.length]);



    const handleDelete = async () => {
        const res = await props.deleteProduct(props.match.params.productId);
        
        if (res.status === 'success'){
            props.history.push('/products');
        }
    }

    const handleAddToCart = () => {
        props.addToCart(product);

        setMsg('Successfully added to cart');
        setTimeout(() => {
            setMsg('');
        }, 2000);
    }

    return (
        <div className={styles.container}>

            <div className={styles.head}>
                <h1 className={styles.heading}>{product && product.name.toUpperCase()}</h1>
            </div>

            <div className={styles.imgContainer}>
                <img className={styles.img} src={product && `/images/${product.productImageURL}`} alt="img"/>
            </div>

            <div className={styles.details}>

                <p className={styles.text}>Name: {product && product.name}</p>
                <p className={styles.text}>Category: {product && product.category.name}</p>
                <p className={styles.text}>Description: {product && product.description}</p>
                <p className={styles.text}>Price: ${product && product.price}</p>
            </div>

            <div className={styles.links}>
                {props.user && props.user.role === 1 ? 
                <>
                    <div className={styles.link1} onClick={() => props.history.push(`/products/edit/${product._id}`)}>Edit</div>
                    <div className={styles.link2} onClick={handleDelete}>Delete</div>
                </>
                :
                <>
                    <p style={{textAlign:'center', fontSize: '1.8rem', color: 'green'}}>{msg}</p>
                    <div className={styles.link} onClick={handleAddToCart}>Add to Cart</div>
                </>
                }
            </div>
            
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        products: state.products.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProducts: () => dispatch(productActionCreators.getAllProducts()),
        deleteProduct: (productId) => dispatch(productActionCreators.deleteProduct(productId)),
        addToCart: (product) => dispatch(cartActionCreators.addToCart(product)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);