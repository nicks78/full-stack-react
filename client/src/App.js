import React, { Component } from 'react';
// import io from 'socket.io-client';
import { BrowserRouter as Router  } from 'react-router-dom'
import Routes from './routes';
import {connect} from 'react-redux';
import './App.css';


class App extends Component {

  state = {
    isAuthenticated: localStorage.getItem('token') ? true : false
  }

  componentWillReceiveProps(nextProps){
      this.setState({
          isAuthenticated: nextProps.auth.isAuthenticated
      })
  }

  render() {
    if(!this.props.auth && this.state.isAuthenticated === true){
      return <p>Loading...</p>
    }

    return (
      <div className="App">
          <Router onUpdate={() => window.scrollTo(0, 0)}>
              <Routes auth={this.state.isAuthenticated} />
          </Router>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
      auth: state.authReducer
  }
}

export default connect(mapStateToProps)(App);