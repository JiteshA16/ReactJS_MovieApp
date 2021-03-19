import React, { Component } from 'react';
import Home from './home/Home';
import Details from './details/Details';
import BookShow from './bookshow/BookShow';
import Confirmation from './confirmation/Confirmation';
import moviesData from '../common/moviesData';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' render={(props) => <Home {...props} moviesData={moviesData} />} />
                    <Route exact path='/movie/:id' render={(props) => <Details {...props} />} />
                    <Route exact path='/bookshow/:id' render={(props) => <BookShow {...props} />} />
                    <Route exact path='/confirm/:id' render={(props) => <Confirmation {...props} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;