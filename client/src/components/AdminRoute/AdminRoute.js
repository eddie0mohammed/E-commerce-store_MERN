import React from 'react';

import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const AdminRoute = ({component: Component, ...rest}) => {
    
    return ( 
        <Route 
            {...rest}

            render={(props) => 
                
                rest.isAuthenticated && rest.user && rest.user.role === 1 ? 
                <Component {...props} />
                :
                <Redirect to='/auth/login' />
            }

        />

    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}


export default connect(mapStateToProps)(AdminRoute);