import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './Layout';
import { AuthContextComponent } from './AuthContext';
import Signup from './Pages/Signup.js';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Home from './Pages/Home';
import PrivateRoute from './PrivateRoute';

export default class App extends Component {
    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <PrivateRoute exact path='/' component={Home} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/logout' component={Logout} />
                </Layout>
            </AuthContextComponent>
        )
    }
}
