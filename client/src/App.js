import React, {useEffect} from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from './Redux/Actions/AuthActionCreators';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AdminRoute from './components/AdminRoute/AdminRoute';

import Header from './components/Header/Header';

import Home from './pages/Home/Home';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import Settings from './pages/auth/Settings/Settings';
import RegisterSuccess from './pages/auth/RegisterSuccess/RegisterSuccess';
import RequestPasswordReset from './pages/auth/RequestPasswordReset/RequestPasswordReset';
import ResetPassword from './pages/auth/ResetPassword/ResetPassword';
import ResetMyPassword from './pages/auth/ResetMyPassword/ResetMyPassword';

import UserDashboard from './pages/Dashboard/UserDashboard/UserDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard/AdminDashboard';

import CreateCategory from './pages/Categories/CreateCategory/CreateCategory';

import CreateProduct from './pages/Product/CreateProduct/CreateProduct';
import ViewAllProducts from './pages/Product/ViewAllProducts/ViewAllProducts';
import ViewProduct from './pages/Product/ViewProduct/ViewProduct';
import EditProduct from './pages/Product/EditProduct/EditProduct';

import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';


const App = (props) => {

  useEffect(() => {
    
    fetchUser();
  });

  const fetchUser = async () => {
    const res = await props.getUser();
    if (res.status === 'fail'){
      localStorage.removeItem('token');
    }
  }


  return (
    <div className="App">


      <Header />

      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/auth/login" exact component={Login} />
        <Route path="/auth/register" exact component={Register} />
        <Route path="/auth/request-resetpassword" exact component={RequestPasswordReset} />
        <Route path='/auth/confirm-email' exact component={RegisterSuccess} />
        <Route path='/auth/confirm-passwordReset' exact render={(props) => <RegisterSuccess {...props} action='reset'/>} />
        <Route path='/auth/resetPassword/:token' exact component={ResetPassword} />
        <Route path='/auth/reset-mypassword' exact component={ResetMyPassword} />
        <Route path='/auth/settings' exact component={Settings} />

        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />

        {/* <Route path='/create/category' exact component={CreateCategory} /> */}
        <AdminRoute path='/create/category' exact component={CreateCategory} />

        {/* <Route path='/create/product' exact component={CreateProduct} /> */}
        <AdminRoute path='/create/product' exact component={CreateProduct} />

        <Route path='/products' exact component={ViewAllProducts} />
        <Route path='/products/:productId' exact component={ViewProduct} />
        <Route path="/products/edit/:productId" exact component={EditProduct} />

        <Route path='/shop' exact component={Shop} />

        <Route path='/cart' exact component={Cart} />
        



        <Route  component={Home} />

      </Switch>

      
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(authActionCreators.getUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
