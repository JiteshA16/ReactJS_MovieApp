import React, { Component } from 'react';
import Home from './home/Home';
import Details from './details/Details';
import BookShow from './bookshow/BookShow';
import Confirmation from './confirmation/Confirmation';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {
    constructor() {
        super();
        this.baseUrl = "http://localhost:8085/api/v1/";
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
                    <Route exact path='/movie/:id' render={(props) => <Details {...props} baseUrl={this.baseUrl} />} />
                    <Route exact path='/bookshow/:id' render={(props) => <BookShow {...props} baseUrl={this.baseUrl} />} />
                    <Route exact path='/confirm/:id' render={(props) => <Confirmation {...props} baseUrl={this.baseUrl} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;