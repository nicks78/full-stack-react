import React from 'react';
import ReactDOM from 'react-dom';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons'; 
import App from './App';

// Redux init
import { Provider } from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

UIkit.use(Icons);

ReactDOM.render(

    ( <Provider store={store}><App/></Provider> ),
    
    document.getElementById('root'));
registerServiceWorker();
