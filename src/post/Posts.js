import React, { Component } from 'react';
import { list } from './apiPost';
//import noImageAvailable from "../images/No-Image-Available.jpg"
import noImageAvailable from "../images/no-image-available.png"
import { Link } from "react-router-dom";

class Posts extends Component {

    constructor() {
        super();
        this.state = {
            posts: [],
        }
    }


    componentDidMount() {
        this.loadPosts(this.state.posts);
    }


    loadPosts = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
        
    };


    renderPosts = (posts) => {
        return (
            <div className="row">

                {posts.map((post, index) => {
                    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
                    const posterName = post.postedBy ? post.postedBy.name : "Anonymous poster";


                    return (

                        // react chiede un unico key per ogni elemento rendred
                        <div className="col-sm-6">
                            <div className="card text-white mb-4 p-0" style={{ backgroundColor: ' #3aafa9' }} key={index}>
                                <div className="card-header">
                                    <h2>
                                        <Link
                                            to={`${posterId}`}
                                            className="text-dark">
                                            {posterName}
                                        </Link>
                                    </h2>
                                    <h5>
                                        <p className="text-dark">{new Date(post.created).toDateString() + " at: " + new Date(post.created).toLocaleTimeString()}</p>
                                    </h5>
                                </div>

                                <div className="card-body">
                                    <p className="card-title">{"- " + post.title}</p>
                                    <h4 className="text-capitalize">{post.body.substring(0, 250)}...</h4>

                                    <img className="rounded mx-auto d-block"
                                        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                        onError={img => (img.target.src = `${noImageAvailable}`)}
                                        //onError={img => (img.target.style.display = 'none')}

                                        style={{ width: '80%', height: '12vw', objectFit: 'cover' }}>
                                    </img>
                                    <div><hr></hr></div>
                                    <Link
                                        to={`/post/${post._id}`}
                                        className="btn btn-light">Leggi di più
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );




                })}
                {JSON.stringify(posts)}
            </div>
            
        )

    };


    render() {
        const { posts } = this.state;

        return (
            <div className="container">

                <div className="p-3 mb-2 bg-info text-white" role="alert" style={{ display: !posts.length ? "" : "none" }}>
                    Caricamento ...
                </div>

                {this.renderPosts(posts)}

            </div>
        );


    }

}

export default Posts;