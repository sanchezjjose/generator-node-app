import React from 'react';
import styles from './App.less';
import ChildComponent from './childComponent';
import jQuery from '../../node_modules/jquery/dist/jquery.min.js';

let $ = $ || jQuery;

const App = React.createClass({

    getInitialState: function() {
        return {};
    },

    loadDataFromServer: function () {
        console.log('Loading data from server...');
        // console.log($.ajax !== undefined);

        // $.ajax({
        //     url: '/',
        //     dataType: 'json',
        //     type: 'POST',
        //     data: {
        //         // data variables here
        //     },
        //     success: data => {
        //         this.setState({ showLoader: false });
        //     },
        //     error: (xhr, status, err) => {
        //         this.setState({ showLoader: false });
        //         console.error(this.props.url, status, xhr.responseText, err.toString());
        //     }
        // });
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
