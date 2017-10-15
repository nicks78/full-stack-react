// src/containers/login/actions.jsx

import axios from 'axios';


export const LOGIN_AUTH = 'LOGIN_AUTH';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_LOAD = 'LOGIN_LOAD';
export const LOGOUT = 'LOGOUT';


export function getAuth(creds){

    return dispatch => {

        //  Loading init
        dispatch(setLoad()); 

        // Set auth token 
        axios.post(`/api/authenticate`, {
            method: 'POST',
            mode: 'cors',
            mobile: creds.mobile,
            password: creds.password
        })
        .then(function (response) {  
            return response.data
        }) 
        .then( data => {
            if(data.success === true){
                dispatch(setAuth(data))
            }else{
                dispatch(setError(data)) 
            }
        })
        .catch(error => {
            dispatch(setError(error))
        })
    }
}


export function setLoad(){
    return {
        type: LOGIN_LOAD,
        isFetching: true,
    }
}

export function setAuth(data){
    return {
        type: LOGIN_AUTH,
        isAuthenticated: true,
        isFetching: false,
        data
    }
}

export function setError(data){
        return {
            type: LOGIN_ERROR,
            isFetching: false,
            isAuthenticated: false,
            data
        }
}

// ────────────────────────────────────────────────────────────────────────────────
// LOGOUT ACTIONS

export function getLogout(){
    return dispatch => {
        //  Loading init
        dispatch(setLoad()); 

        localStorage.removeItem('token');
        localStorage.removeItem('role');

        dispatch(setLogout());
    }

}

export function setLogout() {
    return{
        type: LOGOUT,
        isAuthenticated: false
    }
}
