import React, {useEffect} from 'react';

import styles from './ViewAllProducts.module.css';

import {connect} from 'react-redux';

import * as productActionCreators from '../../../Redux/Actions/ProductActionCreator';

const ViewAllProducts = (props) => {

    useEffect(() => {
        const fetchProducts = async () => {
            await props.getAllProducts()
        };
        fetchProducts();
        // eslint-disable-next-line
    }, []);


    const renderProducts = () => {
        return props.products && props.products.map((product) => {
            return (
                <div key={product._id} className={styles.card}>
                    <div className={styles.imgContainer}>
                    <img className={styles.img} src={`/images/${product.productImageURL}`} alt="product img"/>
                    </div>

                    <p className={styles.name}>Name: {product.name}</p>
                    <p className={styles.category}>Category: {product.category.name}</p>
                    <p className={styles.price}>Price: ${product.price}</p>

                    <div className={styles.link} onClick={() => props.history.push(`/products/${product._id}`)}>View</div>

                </div>
            );
        });
    }

    return (

        <div className={styles.container}>
            
            <div className={styles.head}>
                <h1 className={styles.heading}>All Products</h1>
            </div>

            <div className={styles.cardContainer}>

                {renderProducts()}
                
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProducts: () => dispatch(productActionCreators.getAllProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllProducts);