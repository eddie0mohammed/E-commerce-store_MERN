import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';

import Header from './components/Header/Header';

import Home from './pages/Home/Home';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import RegisterSuccess from './pages/auth/RegisterSuccess/RegisterSuccess';
import RequestPasswordReset from './pages/auth/RequestPasswordReset/RequestPasswordReset';
import ResetPassword from './pages/auth/ResetPassword/ResetPassword';
import ResetMyPassword from './pages/auth/ResetMyPassword/ResetMyPassword';


function App() {
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
        <Route path='/auth/resetpassword' exact component={ResetPassword} />
        <Route path='/auth/reset-mypassword' exact component={ResetMyPassword} />




        <Route  component={Home} />

      </Switch>

      
      
    </div>
  );
}

export default App;
