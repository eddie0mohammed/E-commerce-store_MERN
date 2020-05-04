import React, {useState, useEffect} from 'react'

import styles from './CreateCategory.module.css';

import {connect} from 'react-redux';
import * as categoriesActionCreators from '../../../Redux/Actions/CategoriesActionCreators';


const CreateCategory = (props) => {

    const [category, setCategory] = useState('');
    
    useEffect(() => {
        const getAllCategories = async () => {
            await props.getCategories();
        };
        getAllCategories()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(category);
        await props.createCategory(category);
        
        setCategory('');

    }

    const renderCategories = () => {

        return props.categories.length > 0 && props.categories.map(elem => {
            return (
                <li className={styles.category} key={elem._id}>
                        <p>{elem.name}</p>
                        <div className={styles.icons}>
                            {/* <span className={styles.edit}>Edit</span> */}
                            <span className={styles.delete} onClick={() => props.deleteCategory(elem._id)}>&times;</span>
                        </div>
                    </li>
            )
        })
    }

    return (

        <div className={styles.container}>
            
            <div className={styles.formContainer}>
                
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>Add New Category</label>
                    <input className={styles.input} type="text" name='name' placeholder='Category Name' value={category} onChange={(e) => setCategory(e.target.value)}/>    
                    <input className={styles.submit} type="submit" value="Submit" />

                </form>

            </div>
            
            <div className={styles.categoriesContainer}>

                <ul className={styles.categoriesList}>
                    {renderCategories()}
                   
                </ul>
            </div>        
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(categoriesActionCreators.getAllCategories()),
        createCategory: (name) => dispatch(categoriesActionCreators.createCategory(name)),
        deleteCategory: (id) => dispatch(categoriesActionCreators.deleteCategory(id)), 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);