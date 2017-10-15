import React from 'react'; 
import { connect } from 'react-redux';
import LoaderHOC from '../HOC/loaderHOC';

//  Component 
import Home from '../home';



// GET INFORMATIONS PROFILE 

class RedirectTo extends React.Component {

    render() {

    // Check which role and redirect to the corresponding dashboard
    let user = this.props.data.data;
    let role = localStorage.getItem('role');
    
        return (
            <div className="Layout">
                { role === "ROLE_USER" ? <Home user={user} />  : null }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      user: state.authReducer
    }
  }

export default connect(mapStateToProps)(LoaderHOC('user')(RedirectTo));


