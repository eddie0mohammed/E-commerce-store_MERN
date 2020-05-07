import React from 'react';

import styles from './Header.module.css';

import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

const Header = (props) => {

    const handleLogout = () => {
        props.logout();
        props.history.push('/auth/login');
    }

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
                    { props.user && props.user.role === 0 && <NavLink to='/user/dashboard' className={styles.link} activeClassName={styles.isActive}>Dashboard</NavLink> }
                    { props.user && props.user.role === 0 && <NavLink to='/shop' className={styles.link} activeClassName={styles.isActive}>Shop</NavLink> }
                    { props.user && props.user.role === 0 && <NavLink to='/cart' className={styles.link} activeClassName={styles.isActive}>Cart</NavLink> }
                    { props.user && props.user.role === 1 && <NavLink to='/admin/dashboard' className={styles.link} activeClassName={styles.isActive}>Dashboard</NavLink> }
        
                   
                    <NavLink to='/auth/settings' className={styles.link} activeClassName={styles.isActive} >Settings</NavLink>
                    <div className={styles.link} onClick={handleLogout}>Logout</div>
                    </>
                }

            </ul>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authActionCreators.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));