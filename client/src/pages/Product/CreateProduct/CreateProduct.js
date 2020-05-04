import React, {useState, useRef, useEffect} from 'react';

import styles from './CreateProduct.module.css';

import {connect} from 'react-redux';

import * as categoriesActionCreators from '../../../Redux/Actions/CategoriesActionCreators';
import * as productActionCreators from '../../../Redux/Actions/ProductActionCreator';

const CreateProduct = (props) => {

    useEffect(() => {
        const getAllCategories = async () => {
            await props.getAllCategories();
        }
        getAllCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [image, setImage] = useState(null);
    const [values, setValues] = useState({
        name: '',
        desc: '',
        price: '',
        category: '',
        shipping: '',
        quantity: '',

    });

    const fileInput = useRef();

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleInputChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);
        // console.log(image);
        
        const {name, desc, price, category, shipping, quantity} = values;
        const res = await props.createProduct(name, desc, price, category, quantity, image, shipping);
        console.log(res);

        // if (res.status === 'success'){
        //     props.history.push('/allProducts');
        // }


    }

    const renderCategories = () => {
        return props.categories && props.categories.map(category => {
            return (
                <option key={category._id} value={category._id}>{category.name}</option>
            )
        });
    }


    return (
        <div className={styles.container}>

            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.heading}>New Product</h1>

                <label htmlFor="name" className={styles.label}>Product Name</label>
                <input className={styles.input} type="text" name='name' placeholder='Product Name' required onChange={handleInputChange}/>

                <label htmlFor="image" className={styles.label}>Product Image</label>
                <input type='file' ref={fileInput} className={styles.fileInput} name="image" onChange={handleImage} style={{display:'none'}}/>
                <div className={styles.inputDiv} onClick={() => fileInput.current.click()}>Choose File</div>
                {image && <div className={styles.fileName}>{image && image.name}</div>}

                <label htmlFor="desc" className={styles.label}>Product Description</label>
                <textarea className={styles.input} type="text" name='desc' placeholder='Product Description' rows='5' style={{resize:'none'}}  required onChange={handleInputChange}/>

                <label htmlFor="price" className={styles.label}>Price</label>
                <input className={styles.input} type="text" name='price' placeholder='Price' required onChange={handleInputChange}/>

                <label htmlFor="category" className={styles.label}>Category</label>
                <select className={styles.select} name='category' onChange={handleInputChange}>
                    <option value='default' hidden>Category</option>
                    {renderCategories()}
                </select>

                <label htmlFor="quantity" className={styles.label}>Quantity</label>
                <input className={styles.input} type="text" name='quantity' placeholder='Quantity' onChange={handleInputChange}/>


                <label htmlFor="shipping" className={styles.label}>Shipping</label>
                <select className={styles.select} name="shipping" onChange={handleInputChange}>
                    <option value='default' hidden>Shipping</option>
                    <option value='yes' >Yes</option>
                    <option value='no' >No</option>
                </select>

                {props.error && 
                    <p style={{color: 'red', textAlign: 'center', fontSize: '1.4rem'}}>{props.error}</p>
                }
                <input type="submit" value="Submit" className={styles.submit}/>

            </form>
            
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        error: state.error.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => dispatch(categoriesActionCreators.getAllCategories()),
        createProduct: (name, description, price, category, quantity, productImageUrl, shipping) => dispatch(productActionCreators.createProduct(name, description, price, category, quantity, productImageUrl, shipping)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);