import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import AllArticles from './AllArticles';

export default class Articles extends Component {
    render(){
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">Articles</div>
    
                            <div className="card-body">
                                <AllArticles />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}



