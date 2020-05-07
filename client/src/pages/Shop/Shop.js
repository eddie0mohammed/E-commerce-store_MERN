import React, {useEffect, useState} from 'react';

import styles from './Shop.module.css';

import {connect} from 'react-redux';

import * as productActionCreators from '../../Redux/Actions/ProductActionCreator';

const Shop = (props) => {

    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            await props.getAllProducts()
        };
        fetchProducts();
        // eslint-disable-next-line
    }, []);


    const renderProducts = () => {
        return props.products && filterProducts(props.products, search).length === 0 ? 
        
        <div className={styles.notFound}> 
            <h2 >No products found</h2>
        </div>
        
        :
        filterProducts(props.products, search).map((product) => {

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

    const filterProducts = (products, filter = '') => {

        return products.filter(elem => elem.name.startsWith(filter));
    }

    return (

        <div className={styles.container}>
            
            <div className={styles.head}>
                <h1 className={styles.heading}>Shop</h1>
            </div>

            <div className={styles.searchContainer}>
                
                <input type="text" className={styles.search} placeholder="Search by Product Name" value={search} onChange={(e) => setSearch(e.target.value)}/>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(Shop);