import React, { Component } from 'react';
import Home from './Home.js';
import Authpage from './Authpage.js';
import axios from 'axios';
import {Switch, Route, Link} from 'react-router-dom';
import Profile from './profile';




class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path = '/' component={Home}/>
                    <Route path ='/Authpage' component={Authpage}/>
                    <Route path ='/profile' component={Profile} /> 
                </Switch>
            </div>
        );
    }
}

export default App;