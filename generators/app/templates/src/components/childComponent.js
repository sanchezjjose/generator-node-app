import React from 'react';

const ChildComponent = React.createClass({

    getInitialState: function() {
        return {
            // state object here
        };
    },

    render: function() {
        return (
            <div className='component'>
                <h3>Child Component</h3>
            </div>
        );
    }
});

export default ChildComponent;
