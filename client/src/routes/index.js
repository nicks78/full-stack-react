import React from 'react'
import {  Route, Switch, Redirect } from 'react-router-dom'

// 
import RedirectTo from './redirectTo';
import Login from '../auth/login';
import PrivateRoute from './privateRoute';
import NotFound from './notFound';


class Routes extends React.Component {

    render(){

        return(
            <div>
            <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Login} auth={this.props.auth} />
                <Route path="" render={ () => { return <Redirect to="/" /> }}/>
                <Route path="*" render={ () => { return <NotFound /> }}/> 
            </Switch>
        </div>
        )
    }
}

export default Routes;