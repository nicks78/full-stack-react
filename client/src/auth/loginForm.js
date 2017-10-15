// src/containers/login/login.jsx

import React from 'react';
import Flash from '../share/flash'; // Take 2 argument (message && type)
import { ValidateMobile, ValidatePassword } from '../share/utils/inputValidation';


class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            err: false,
            type: 'danger',
            message: 'Mobile or password are incorrect !'
        }

        this.handleClick = this.handleClick.bind(this);                
    }

    /* 
        OnClick event 
            - Check mobile && Password 
            - Call actions reducer to login
    */
    handleClick(event) {
        event.preventDefault();

        //  Init error 
        this.setState({ err: false})

        // Init input variable
        let mobile = this.refs.mobile.value
        let password = this.refs.password.value

        //  Check if input are not empty
        if(mobile === '' || password === ''){
            this.setState({ err: true, message: 'All fields are required'})            
        }

        //  Check regex validation
        if(!ValidateMobile(mobile)){this.setState({err:true})}
        if(!ValidatePassword(password)){this.setState({err:true})}
        
        // Quick check valide type input[number] && input[password]
        if(ValidateMobile(mobile) && ValidatePassword(password)){
            const creds = { mobile: mobile.trim(), password: password.trim() }
            this.props.onLoginClick(creds)
        } 
    }


    render() {



        return (
            <div className="uk-position-center" style={{width: '281px'}}>

                {/* Error message handler  */}
                { this.props.errMessage && <Flash message={this.props.errMessage} type="danger" /> }

                { this.state.err && <Flash message={this.state.message} type={this.state.type} /> }
                
                {/* Render the form */}
                { !this.props.isFetching ?
                    <form className="uk-form">
                    

                        <div className="input_container uk-margin">
                                <input ref="mobile" maxLength='10' className="uk-input" type="text" placeholder="Portable"/>
                                <span className="input_icon" data-uk-icon="icon: user"></span>
                        </div>

                        <div className="input_container uk-margin">
                                <input ref="password" maxLength='4' className="uk-input" type="password" placeholder="Mot de passe"/>
                                <span className="input_icon" data-uk-icon="icon: lock"></span>
                        </div>

                        <div className="uk-margin">
                            <button onClick={(event) => this.handleClick(event)} className="uk-button BtnPrimary uk-width-1-1" type="submit"><span>Login</span></button>
                        </div>
                        <div className="uk-text-center"><a href="">Mot de passe oublié ?</a></div>  
                    </form>

                : <div className="uk-text-center"><p>Loading...</p></div>
                }
            </div>
            
        )
    }
}

export default LoginForm;