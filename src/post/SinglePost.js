import React , {Component} from 'react' ;
import {singlePost, remove , like, unlike, comment, uncomment} from "./apiPost";
import {Link, Redirect} from "react-router-dom";
import noImageAvailable from "../images/no-image-available.png"
import {isAuthenticated} from "../authentication";
import Comment from "./Comment";

class SinglePost extends Component {

    state = {
        post : "",
        deleted : false,
        redirected : false, // redirect to home
        like : false, // check if the user liked the post or not (false is not)
        likes : 0,  // number of likes of a given post
        redirectToSignin : false,
        comments : []

    };


    componentDidMount = () => {
        singlePost(this.props.match.params.postId).then(data => {
            if (data.error){
                console.log(data.error) ;
            }
            else{
                this.setState({
                    post : data,
                    likes : data.likes.length,
                    like : this.checkLike(data.likes),
                    comments: data.comments
                });

                console.log("from single post -> component did mount", data);
            }
        })
    };


    deleteConfirmed =()=>{
        let answer = window.confirm("your post will be deleted definitely, you want to ontinue ?") ;
        if (answer){
            this.deletePost();
        }


    };

    deletePost = () => {
        const token = isAuthenticated().token ;
        const postId = this.props.match.params.postId ;
        remove(postId, token).then(result => {
            if(result.error){
                console.log(result.error);
                return false;
            }
            else {
                this.setState({deleted : true});
                this.setState({redirected : true});
                console.log('post deleted successfully');
                return true;
            }
        })
    };

    updateComments = comments => {
        this.setState({ comments });
        console.log('updateComments', comments);
    };

    likeToggle = () => {

        if (!isAuthenticated()) {
            this.setState({ redirectToSignin: true });
            return false; // the rest of the code will not be executed
        }
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;

        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
            }
        });
    };


    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id ; // check isisAuthenticated before take the id :
        // because if the user isnot authenticated , it handle an error

        let match = likes.indexOf(userId) !== -1 ; // === -1 -> the userId is not in the array.
        return match ;
    };


    renderPost = post => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : "Anonymous poster";

        //grab likes numeber
        const {like, likes} = this.state ;

        return (

            // react ask to have a unique key for rendered element
            <div className="card text-white bg-dark mb-3" style={{margin: "10px"}}>


                <div className="card-header">
                    <h3 className="text-white">
                        <Link
                            to={`${posterId}`}
                            className = "text-white">
                            {posterName}
                        </Link>
                    </h3>
                    <p className="bg-primary">{new Date(post.created).toDateString()+ " at " +new Date(post.created).toLocaleTimeString()}</p>
                </div>

                <div className="card-body">
                    <p className="card-title">{post.title}</p>
                    <p className="card-text">{post.body}</p>

                    <img className="rounded mx-auto d-block"
                        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                        onError={img => (img.target.src = `${noImageAvailable}`)}
                        alt={post.title}
    
                        style={{width:'70%', height:'50%', objectFit:'cover'}}
                    />
                    <br/>

                    <small id="likesNumber" className="text-muted">{likes} Mi piace</small>

                    <div className="row">
                        {like ? (
                            <h3 onClick={this.likeToggle}>
                                <i className="fa fa-thumbs-down"  style={{padding : '10px' ,borderRadius : '50%'}}
                                ></i>
                                unlike
                            </h3>
                        ):(
                            <h3 onClick={this.likeToggle}>
                                <i className="fa fa-thumbs-up" style={{padding : '10px' ,borderRadius : '50%'}}
                                ></i>
                                Mi piace
                            </h3>
                        )
                        }

                    </div>





                    <div className="d-inline-block center-block ">
                        {/* <Link
                            to={`/`}
                            className="btn btn-outline-success  mr-2 "> Home
                        </Link> */}


                        {/*
                        The problem is that post.postedBy._id gets called two times:

                        1. When the page first loads, before you have a chance to load data from the API.
                        2. After the API request finishes and you call this.setState

                        so i coorected the error ('postedBy._id ' is undefined , by verifying if post.postedBy already
                        exist or not .
                        link : https://www.freecodecamp.org/forum/t/react-cant-access-a-property-of-an-object-stored-in-state/138169

                        */}

                        {
                            isAuthenticated().user && post.postedBy && isAuthenticated().user._id === post.postedBy._id &&
                            <>
                                <Link
                                    to={`/post/edit/${post._id}`}
                                    className="btn btn-outline-primary  mr-2"> Aggiorna
                                </Link>
                                <Link
                                    onClick={this.deleteConfirmed}
                                    className="btn btn-outline-danger center-block  mr-2 "> Elimina
                                </Link>
                            </>
                        }

                    </div>
                </div>


            </div>

        );

    };

    render() {
        const {post, deleted, redirected, redirectToSignin, comments} = this.state ;


        if (redirected) {

           return <Redirect to="/" />
        }

        if (redirectToSignin) {

            return <Redirect to="/signin" />
        }


        return (
            <div className="container">



                <div className="alert alert-success mb-sm-1" role="alert" style = {{display : deleted ? "":"none"}}>
                    Post eliminato con successo
                </div>

                <div className="p-3 mb-2 bg-info text-white" role="alert" style = {{display  : !post ? "":"none"}}>
                    Caricamento ...
                </div>



                {this.renderPost(post)}
                {/* reverse to see the last comment as the first in the page*/}

                <Comment
                    postId={post._id}
                    comments={comments.reverse()}
                    updateComments = {this.updateComments} />

            </div>
        );
    }


}

export default SinglePost ;