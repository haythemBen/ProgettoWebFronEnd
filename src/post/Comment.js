import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../authentication";
import { Link } from "react-router-dom";
import DefaultProfilePicture from "../images/User_Avatar.png";


class Comment extends Component {

    state = {
        text: "",
        error: ""
    };

    handleChange = event => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    };

    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({ error: "Il commento è troppo breve o troppo lungo !" });
            return false;
        }
        return true;
    };

    addComment = event => {
        event.preventDefault();
        if (!isAuthenticated()) {
            this.setState({ error: "Accedi per scrivere un commento !" });
            return false;
        }

        if (this.isValid()) {

            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;
            const newcomment = { text: this.state.text };

            //comment ha bisgno del userId per stampare il suo nome
            comment(userId, token, postId, newcomment)                       
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        this.setState({ text: "" });

                        // dispatch fresh list of comments to SinglePost
                        this.props.updateComments(data.comments);
                    }
                })
        }


    };


    deleteConfirmed = comment => {
        let answer = window.confirm("Vuoi eliminare questo commento?");
        if (answer) {
            this.deleteComment(comment);
        }
    };

    deleteComment = comment => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        uncomment(userId, token, postId, comment)              
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    this.props.updateComments(data.comments);
                }
            })
    };


//     render() {
//         const { comments } = this.props;
//         const { error } = this.state;
//         return (

//             <div className="container">

//                 <div className="alert bg-danger mb-sm-1" role="alert" style={{ display: error ? "" : "none" }}>
//                     {error}
//                 </div>


//                 <div className="col-md-8">
//                     <form onSubmit={this.addComment}>
//                         <div className="form-group form-row">
//                             <input onChange={this.handleChange} type="text" value={this.state.text} className="form-control text-center" placeholder="scrivere un commento" required />
//                         </div>
//                     </form>

//                     <hr />


//                     <div className="col-md-8">
//                         <h3 >
//                             ({comments.length}) Commenti
//                     </h3>
//                         <hr />
//                         {comments.map((comment, i) => (

//                             <div key={i}>
//                                 <div>
//                                     <Link to={`/user/${comment.postedBy._id}`}>
//                                         <img
//                                             style={{
//                                                 borderRadius: "50%",
//                                                 border: "1px solid black"
//                                             }}
//                                             className="float-left mr-2"
//                                             height="30px"
//                                             width="30px"
//                                             onError={i =>
//                                                 (i.target.src = `${DefaultProfilePicture}`)
//                                             }
//                                             src={`${process.env.REACT_APP_API_URL
//                                                 }/user/photo/${comment.postedBy._id}`}
//                                             alt={comment.postedBy.name}
//                                         />
//                                     </Link>
//                                     <div>
//                                         <div className="row">
//                                             <div className="col">
//                                                 <h3>{comment.postedBy.name}</h3>

//                                             </div>
//                                             <span>

//                                                 {
//                                                     isAuthenticated().user && comment.postedBy && isAuthenticated().user._id === comment.postedBy._id &&
//                                                     <>

//                                                         <Link
//                                                             onClick={() => this.deleteConfirmed(comment)}
//                                                             className="fas fa-trash-alt text-danger">
//                                                         </Link>
//                                                     </>
//                                                 }

//                                             </span>

//                                         </div>
//                                         <h5>
//                                             {comment.text}
//                                         </h5>
//                                         <div className="col">
//                                             <i className="fas fa-clock text-success bg-white"></i>{" "}
//                                             <small>{comment.created}</small>
//                                         </div>
//                                         <hr />

//                                     </div>

//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                 </div>
//             </div>
//         );

//     }
// }
render() {
    const { comments } = this.props;
    const { error } = this.state;

    return (
        <div>
            <h2 className="mt-5 mb-5">Lascia un commento..</h2>

            <form onSubmit={this.addComment}>
                <div className="form-group">
                    <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.text}
                        className="form-control"
                        placeholder="Lascia un commento..."
                    />
                    <button className="btn btn-raised btn-success mt-2">
                        Post
                    </button>
                </div>
            </form>

            <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
            >
                {error}
            </div>

            <div className="col-md-12">
                <h3 className="text-primary">({comments.length}) Commenti</h3>
                <hr />
                {comments.map((comment, i) => (
                    <div key={i}>
                        <div>
                            <Link to={`/user/${comment.postedBy._id}`}>
                                <img
                                    style={{
                                        borderRadius: "50%",
                                        border: "1px solid black"
                                    }}
                                    className="float-left mr-2"
                                    height="30px"
                                    width="30px"
                                    onError={i =>
                                        (i.target.src = `${DefaultProfilePicture}`)
                                    }
                                    src={`${
                                        process.env.REACT_APP_API_URL
                                    }/user/photo/${comment.postedBy._id}`}
                                    alt={comment.postedBy.name}
                                />
                            </Link>
                            <div>
                                <p className="lead">{comment.text}</p>
                                <p className="font-italic mark">
                                    
                                    Pubblicato da{" "}
                                    <Link
                                        to={`/user/${comment.postedBy._id}`}
                                    >
                                        {comment.postedBy.name}{" "}
                                    </Link>
                                    a{" "}
                                    {new Date(
                                        comment.created
                                    ).toDateString()+' alle '+ new Date(
                                        comment.created
                                    ).toLocaleTimeString()}
                                    <span>
                                        {isAuthenticated().user &&
                                            isAuthenticated().user._id ===
                                                comment.postedBy._id && (
                                                <>
                                                    <span
                                                        onClick={() =>
                                                            this.deleteConfirmed(
                                                                comment
                                                            )
                                                        }
                                                        className="text-danger float-right mr-1"
                                                    >
                                                        Elimina
                                                    </span>
                                                </>
                                            )}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
}


export default Comment;