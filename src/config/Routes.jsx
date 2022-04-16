import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Profile from '../pages/profile/Profile';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import SignIn from '../pages/SignIn';

const Routes = () => {
    return (
        <Switch>
            <Route 
                path='/signin'
                component={SignIn}
            />
            <Route 
                path='/profile'
                component={Profile}
            />
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                exact
                component={Home}
            />
        </Switch>
    );
}

export default Routes;
