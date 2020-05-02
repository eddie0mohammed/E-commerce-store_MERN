import React from 'react';

import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {
    
    return ( 
        <Route 
            {...rest}

            render={(props) => 
                
                rest.isAuthenticated ? 
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
    }
}


export default connect(mapStateToProps)(PrivateRoute);