import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import Authpage from './Authpage'


class Home extends Component {
  render() {
    return (
      <div className="background-home">   
        <div >
           <h1 className="title">Blog Site</h1>
           <h1 className="slogan">Discover Expression</h1>
        </div>
        <div>
            <a href={'http://localhost:3535/auth' }>
            <center><button className='SignIn'>Get Started</button></center> 
            </a>
        </div>
      </div>
    );
  }
}

export default Home;
