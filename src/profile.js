import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './profile.css';


class Profile extends Component {



    constructor() {
        super()
        this.state = {
        dob: '', // Value of DATE OF BIRTH FIELD
        email: '', // Value of EMAIL FIELD
        state: '', // VALUE OF STATE FIELD
        username: '' // VALUE OF USERNAME FIELD
        }
    }

    componentDidMount(){
        this.getProfile()
    }

    getProfile() {
        axios.get('/api/users').then(response => {
          this.setState({ 
             dob: response.data[0].dob ? response.data[0].dob : "",
             email: response.data[0].email ? response.data[0].email : "",
             state: response.data[0].state ? response.data[0].state : "",
             username: response.data[0].username ? response.data[0].username : ""
            }) //Axios call for posts table
        })
    }

    editUsers(e,prop) {
        this.setState({
            [prop]: e.target.value
        })
        
        //Change modal open from false to true
    }


    
        
    updateUsers(){
        axios.put('/api/users', {
            email: this.state.email,
            dob: this.state.dob,
            state: this.state.state,
            username: this.state.username,
         }).then(() => {
            this.getProfile()

         }).catch(err=> {
            console.log(err)})
        // }) // Update body method
    }


    // displayUsers(form){
    //     axios.post('/api/users', {
    //        users: this.state.users
    //     }) // Create blog method
    // }
    
    // handleChange(value) {
    //     this.setState({ users: value })
    //   }

    
    render() {
        console.log(this.state.dob, this.state.email, this.state.state, this.state.username)
        return (
            <div className="background">
             <div className="topnav">
                <a className="active" href="#Authpage">Home</a>
                <a href="#Profile">Profile</a>
                <a className='auth0' href={'http://localhost:3535/auth/logout' }>Logout</a>
                </div>
             <div className="display">
             <div>
                    <div>
                        <h1 className="profile">Profile</h1>
                    </div>
                    <div className="heading-container">
                        <h2 className="birthdate-heading">Date of Birth</h2>
                        <h2 className="email-heading">Email</h2>
                        <h2 className="state-heading">State of Residency</h2>
                        <h2 className="username-heading">Username</h2>
                    </div>
                    <div className="input-container">
                    <div className= "birthdate">
                        <input onChange={(e) => {this.editUsers(e, "dob")}} value ={ this.state.dob }/>
                    </div>
                    <div className="email">
                       <input onChange={(e) => {this.editUsers(e, "email")}} value ={ this.state.email} />
                    </div>
                    <div className="state">
                       <input onChange={(e) => {this.editUsers(e, "state")}} value ={ this.state.state}/>
                    </div>
                    <div className="username">
                       <input onChange={(e) => {this.editUsers(e, "username")}}  value ={this.state.username}/>
                       </div>
                    </div>
                </div>
             </div>
             <div className="save-container">
             <button className="save" onClick={() => this.updateUsers()} >Save</button>
             </div>
            </div>
        );
    }
}




export default Profile;