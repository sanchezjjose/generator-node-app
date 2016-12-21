'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const MainComponent = React.createClass({

    getInitialState: function() {
        return { 
            // state object here 
        };
    },

    render: function() {
        return (
            <div className='components-container'>
                <h3>Main Component</h3>
            </div>
        );
    }
});

ReactDOM.render(
    <MainComponent/>,
    document.getElementById('main-component')
);

