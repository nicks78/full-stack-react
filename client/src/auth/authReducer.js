//  src/auth/authReducer

import { LOGIN_AUTH } from './actions';
import { LOGIN_ERROR } from './actions';
import { LOGIN_LOAD } from './actions';
import { LOGOUT } from './actions';


const initialState = [];

const authReducer =  (state =  initialState, action) => {

    switch (action.type) {
        case LOGIN_LOAD:
        return  Object.assign({}, state, {
                    isFetching: true,
                })
        case LOGIN_AUTH:
            return  Object.assign({}, state, {
                    isFetching: false,
                    isAuthenticated: true,
                    data: action.data
                })
        case LOGIN_ERROR:
            return  Object.assign({}, state, {
                        isFetching: false,
                        isAuthenticated: false,
                        data: action.data
                    })
        case LOGOUT:
            return action.isAuthenticated
        default:
            return state;
    }
}

export default authReducer;