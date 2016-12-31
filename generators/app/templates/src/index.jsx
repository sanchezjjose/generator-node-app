'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import FaSpinner from '../node_modules/react-icons/lib/fa/spinner';

const HeaderComponent = React.createClass({

    getInitialState: function() {
        return {
            showLoader: true
        };
    },

    loadDataFromServer: function () {
        $.ajax({
            url: '/',
            dataType: 'json',
            type: 'POST',
            data: {
                // data variables here
            },
            success: data => {
                this.setState({ showLoader: false });
            },
            error: (xhr, status, err) => {
                this.setState({ showLoader: false });
                console.error(this.props.url, status, xhr.responseText, err.toString());
            }
        });
    },

    componentDidMount: function() {
        this.loadDataFromServer();
    },

    render: function() {
        let loaderClassName = 'loader';

        if (!this.state.showLoader) {
            loaderClassName += ' hide';
        }

        return (
            <div className='components-container'>
                <h1>Header Component</h1>
                <div className={loaderClassName}>
                    <FaSpinner className='spin fa fa-3x fa-spin'/>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <HeaderComponent/>,
    document.getElementById('header-component')
);

