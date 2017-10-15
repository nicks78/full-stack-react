import React from 'react';
import Loading from '../assets/img/loading.gif';

const LoaderHOC = (propName) => (WrapperComponent) => {
    
    return class LoaderHOC extends React.Component {
        
        isEmpty(prop){
            return (
                prop === '' ||
                prop === undefined ||
                (prop.hasOwnProperty('lenght') && prop.length === 0) ||
                (prop.constructor === Object && Object.keys(prop).lenght === 0)
            )
        }

        
        render () {
            return this.isEmpty(this.props[propName]) ? <div className="uk-position-center"><img src={Loading} alt="loading" /></div> : <WrapperComponent data={ this.props[propName] } />
        }
    }
}

export default LoaderHOC;