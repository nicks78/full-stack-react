import React from 'react';

const Flash = ({message, type}) => {
    return <div className={`uk-alert-${type}`} data-uk-alert>
            {type === 'success' || type === 'warning' ?<span className="uk-alert-close" data-uk-close></span> : null }
            <p className="uk-text-center">
                
            <b>{message}</b>
            
            </p>
        </div>
}

export default Flash;