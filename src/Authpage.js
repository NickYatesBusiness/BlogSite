import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Authpage.css';


const customStyles = {
    content : {  
     
      border: '2px black solid',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      width                 : '50vw',
      height                : '50vh',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Access extends Component {



    constructor() {
        super()
        this.state = {
            editModalIsOpen: false,
            modalIsOpen: false, 
            text: '',
            blogs: [],
            selected: ''   
        }


    this.modalOpen = this.modalOpen.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateBody = this.updateBody.bind(this)
    this.editCloseModal = this.editCloseModal.bind(this)
    this.editPost = this.editPost.bind(this)

    }

    componentDidMount(){
        
        axios.get('/api/posts').then(response => {
            this.setState({
                blogs: response.data
            }) //Axios call for posts table
        })
    }


    postBlog(form){
        axios.post('/api/posts', {
            text: this.state.text
        }).then(response => {
            axios.get('/api/posts').then(response => {
                this.setState({
                    blogs: response.data
                }) //Axios call for posts table and loads it on the page.   
            })
        }) 
        // Create blog method
    }


    deleteBlogs(){
        axios.delete('/api/blogs/' + this.state.id)
    }
    
    updateBody(input){
        axios.put('/api/blogs', {
            body: this.state.text,
            id: this.state.id
         })
        // }) // Update body method
    }

    modalOpen() {
        this.setState({modalIsOpen: true})

        //Change modal open from false to true
    }

    editPost(blog) {
        console.log(blog)
        this.setState({editModalIsOpen: true,
            selected: blog.body,
            text: blog.body,
            id: blog.id
        })
        
        //Change modal open from false to true
    }

    closeModal() {
        this.setState({modalIsOpen: false});
      }

      editCloseModal() {
        this.setState({editModalIsOpen: false});
      }


      afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#5BC3EB';
      }

      handleChange(value) {
        this.setState({ text: value })
      }
    


    render() {

        var displayBlogs = this.state.blogs.map((blog) => {
            return (
                <div className="border" key={blog.id}>
                    <h1 className="text">{this.email}</h1>
                    <button className="edit" onClick={() => {this.editPost(blog)}} >Edit</button>
                    <div dangerouslySetInnerHTML={{__html: blog.body}}>
                    </div>
                </div>
            )
        })
        
        return (
            <div className="background">
             <div className="topnav">
                <a className="active" href="#Authpage">Home</a>
                <a href="#Profile">Profile</a>
                <a className='auth0' href={'http://localhost:3535/auth/logout' }>Logout</a>  
                <a className="post" onClick={this.modalOpen}>Post</a>
                </div>
                <div className="myposts"> 
                    <h1 className="posts">My Posts</h1>
                </div>
                <div className="display">
                {displayBlogs}
                </div>
                <Modal isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Modal">
                    <div>
                    </div>
                    {<div id="editor-container"> 
                    <ReactQuill className="editor" value={this.state.text}
                      onChange={this.handleChange}  />
                      <button className="submit" onClick={() => this.postBlog(alert("Blog Submitted"))}
                      >Submit</button>  
                      </div>}
                </Modal>
                <Modal isOpen={this.state.editModalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.editCloseModal}
                    style={customStyles}
                    contentLabel="Modal">
                    <div>
                    </div>
                    {<div id="editor-container"> 
                    <ReactQuill className="editor" value={this.state.text}
                      onChange={this.handleChange}  />
                      <button className="submit" onClick={() => this.updateBody()}  >Save</button>  
                      <button className="delete" onClick={() => this.deleteBlogs()}>Delete</button>
                      </div>}
                </Modal>
              
            </div>
        );
    }
}




export default Access;