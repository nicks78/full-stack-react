// src/containers/login/logout.jsx

import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getLogout} from './actions'

class Logout extends React.Component {

    state = {
        isAuthenticated: localStorage.getItem('token') ? true : false
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isAuthenticated: nextProps.auth.isAuthenticated
        })
    }
    
    render(){

    if(!this.state.isAuthenticated){
        return (
            <Redirect to="/connexion" />
        )
    }

        return (
            <a onClick={() => {this.props.getLogout()} }><span className="uk-hidden@m" data-uk-icon="icon: sign-out"></span>&nbsp;&nbsp;&nbsp;Déconnexion</a>
        )
    }
}
  

const mapStateToProps = ( state ) => {
    return {
        auth: state.authReducer
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getLogout : () => dispatch(getLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);