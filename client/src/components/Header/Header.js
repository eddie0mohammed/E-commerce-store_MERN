import React from 'react';

import styles from './Header.module.css';

import {NavLink, Link} from 'react-router-dom';

const Header = (props) => {
    return (
        <div className={styles.container}>
            
            <Link className={styles.logo} to='/'>Logo</Link>

            <ul className={styles.links}>
                <>
                <li ><NavLink to='/auth/login' activeClassName={styles.isActive} className={styles.link}>Login</NavLink></li>
                <li ><NavLink to='/auth/register' activeClassName={styles.isActive} className={styles.link}>Register</NavLink></li>
                </>

            </ul>
            
        </div>
    )
}


export default Header;