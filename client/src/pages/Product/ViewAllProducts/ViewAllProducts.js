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

    return (

        <div className={styles.container}>
            
            <div className={styles.head}>
                <h1 className={styles.heading}>All Products</h1>
            </div>


            <div className={styles.cardContainer}>

                <div className={styles.card}>
                    <div className={styles.imgContainer}>
                    <img className={styles.img} src="https://source.unsplash.com/random" alt=""/>
                    </div>

                    <p className={styles.name}>Name</p>
                    <p className={styles.category}>Category</p>
                    <p className={styles.price}>Price</p>

                    <div className={styles.link}>View</div>

                </div>

                <div className={styles.card}>
                    <div className={styles.imgContainer}>
                        <img className={styles.img} src="https://source.unsplash.com/random" alt=""/>
                    </div>

                    <p className={styles.name}>Name</p>
                    <p className={styles.category}>Category</p>
                    <p className={styles.price}>Price</p>

                    <div className={styles.link}>View</div>

                </div>

                <div className={styles.card}>
                    <div className={styles.imgContainer}>
                        <img className={styles.img} src="https://source.unsplash.com/random" alt=""/>
                    </div>

                    <p className={styles.name}>Name</p>
                    <p className={styles.category}>Category</p>
                    <p className={styles.price}>Price</p>

                    <div className={styles.link}>View</div>

                </div>
                

            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProducts: () => dispatch(productActionCreators.getAllProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllProducts);