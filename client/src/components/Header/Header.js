import React from 'react';

import styles from './Header.module.css';

import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

const Header = (props) => {
    return (
        <div className={styles.container}>
            
            <Link className={styles.logo} to='/'>Logo</Link>

            <ul className={styles.links}>
                {!props.isAuthenticated ? 
                    <>
                    <li ><NavLink to='/auth/login' activeClassName={styles.isActive} className={styles.link}>Login</NavLink></li>
                    <li ><NavLink to='/auth/register' activeClassName={styles.isActive} className={styles.link}>Register</NavLink></li>
                    </>
                    :
                    <>
                    <div className={styles.link} onClick={props.logout}>Logout</div>
                    </>
                }

            </ul>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authActionCreators.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);