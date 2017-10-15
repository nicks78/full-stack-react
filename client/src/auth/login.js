// src/containers/login/login.jsx

import React from 'react';
import LoginForm from './loginForm';
import {getAuth} from './actions';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';


class Login extends React.Component {


    state = {
        isAuthenticated: localStorage.getItem('token') ? true : false
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isAuthenticated: nextProps.auth.isAuthenticated
        })

        if(nextProps.auth.isAuthenticated === true){
            //  Init localstorage
            localStorage.setItem('token', nextProps.auth.data.token);
            localStorage.setItem('role', nextProps.auth.data.role);
        }
    }

    render(){
        

        if( this.state.isAuthenticated ){
            return <Redirect to="/"/>
        }

        return (
            <div className="uk-container">
			<div className="LoginPage">

                    <LoginForm 
                        isFetching={ this.props.auth.isFetching  ? true : false }
                        errMessage={ this.props.auth.isAuthenticated === false ? this.props.auth.data.message : false}
                        onLoginClick={ creds => this.props.getAuth(creds) }
                    />
			</div>	
		</div>
            
        )
    }
}


const mapStateToProps = ( state ) => {
    return {
        auth: state.authReducer
    }
  }
  
  // Get all data for child components
  const mapDispatchToProps = (dispatch) => {
      return {
        getAuth : (creds) => dispatch(getAuth(creds))
      }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);
