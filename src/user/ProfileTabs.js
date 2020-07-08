import React , {Component} from 'react' ;
import {Link} from "react-router-dom";
import DefaultProfilePicture from "../images/User_Avatar.png";
import noImageAvailable from "../images/no-image-available.png"

class ProfileTabs extends Component {


    render() {
        const {following , followers, posts} = this.props ;
        return (
            <div className="container">
 
                    <div className="col">


                            <h3>Posti</h3>
                        <hr />
                        {posts.map((post, index) =>
                        {
                            const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
                            const posterName = post.postedBy ? post.postedBy.name : "Anonymous poster";


                            return (

                                // react ask to have a unique key for rendered element
                                <div className="card text-white  mb-3" style={{margin: "0px" ,backgroundColor:' #3aafa9'}} key={index}>


                                    <div className="card-header">
                                        <h3 className="text-dark">
                                            <Link
                                                to={`${posterId}`}
                                                className = "text-dark">
                                                {posterName}
                                            </Link>
                                        </h3>
                                        <p className = "text-dark">{new Date(post.created).toDateString()+" at "+new Date(post.created).toLocaleTimeString() }</p>
                                    </div>

                                    <div className="card-body" >
                                        <p className="card-title">{post.title}</p>
                                        <h4><p className="text-capitalize">{post.body.substring(0,250)}...</p></h4>

                                        <img className="rounded mx-auto d-block"
                                            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                            onError={img => (img.target.src = `${noImageAvailable}`)}
                                            /*onError={img => (img.target.style.display = 'none')}*/

                                            style={{width:'70%', height:'50%', objectFit:'cover'}}
                                        />
                                        <div><hr></hr></div>
                                        <Link
                                            to={`/post/${post._id}`}
                                            className="btn btn-light">Leggi di più
                                        </Link>
                                    </div>
                                </div>

                            );




                        })}
                    </div>
                    <div className="col">
                        <h3>
                        {followers.length} Followers
                        </h3>
                        <hr />
                        {followers.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            style={{
                                                /*borderRadius: "50%",*/
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="40px"
                                            width="40px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfilePicture}`)
                                            }
                                            src={`${process.env.REACT_APP_API_URL
                                            }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p className="lead">
                                                {person.name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col">
                        <h3 >
                        {following.length} Profili seguiti 
                        </h3>
                        <hr />
                        {following.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            style={{
                                                /*borderRadius: "50%",*/
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="40px"
                                            width="40px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfilePicture}`)
                                            }
                                            src={`${process.env.REACT_APP_API_URL
                                            }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p className="lead">
                                                {person.name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

 



                    



                </div>

        );

    }
}

export default ProfileTabs ;