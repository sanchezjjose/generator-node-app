import React from 'react';
import styles from './App.less';
import ChildComponent from './childComponent';

const App = React.createClass({

    getInitialState: function() {
        return {};
    },

    loadDataFromServer: function () {
        console.log('Loading data from server...');

        fetch('/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
              return response.json();
            } else {
              const error = new Error(response.statusText);
              error.response = response;
              throw error;
            }
        }).then(result => {
            console.log(result.message); 
        }).catch(error => {
            console.log(error); 
        });
    },

    componentDidMount: function() {
        this.loadDataFromServer();
    },

    render: function() {
        return (
            <div className='app'>
                <h1>Parent Component</h1>
                <div>
                    <ChildComponent/>
                </div>
            </div>
        );
    }
});

export default App;
