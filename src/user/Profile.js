import React , {Component} from "react";
import {isAuthenticated} from "../authentication";
import {Redirect, Link} from "react-router-dom" ;
import {read} from "./apiUser";
import DefaultProfilePicture from "../images/User_Avatar.png" ;
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import {postsByUser} from '../post/apiPost'


class Profile extends Component{

    constructor(){
        super();
        this.state ={
            // initialize followers and following tab to user data
            user : {followers : [], following: []}, //{followers : [], following: []}
            redirectToSignin : false,
            following : false,
            error : "",
            posts : []
        }
    }



    // the logic of componentDidMount
    init =  userId => {
        const token = isAuthenticated().token ;
        read(userId, token).then(data => {
                if(data.error)  {
                    this.setState({redirectToSignin: true}) ;}
                else
                {   //check if i already followed this user or not
                    let following = this.checkFollow(data);

                    this.setState({user:data, following});}

                    //load user posts
            this.loadPosts(data._id, token);
            });

    };


  //  when the component mount get the userId ('userId' should be similar to 'userId' in MainRouter)
    componentDidMount() {
        // use the userId in route to make request to backend to make more infs about the user
        // i have certains infs(name, email) in the local storage.
        //console.log("user id from route" , this.props.match.params.userId);

        const userId = this.props.match.params.userId ;
        this.init(userId);


    }

    loadPosts = (userId, token) => {
        postsByUser(userId, token).then(data =>{
            if (data.error){
                console.log(data.error);
            }
            else{
                this.setState({posts : data});
            }

        } )
    }

    // i add it because when the user login , enter to user list , choose any user then when he try to enter to his profile ,
    // the profile info dont change ,only the user id in the browser changes
    componentWillReceiveProps(props) {

        // in this case init will be re-executed with the new id which had changed in the browser
        const userId = props.match.params.userId ;
        this.init(userId);
    }


    // check follow : check if the  authenticated user in the list of followers of the user(in parameter), and return true or false
    checkFollow  = user => {
        const jwt = isAuthenticated()
        const match = user.followers.find(follower => {

            return follower._id === jwt.user._id ;
        });
        return match ;
    };


    //handled when click follow ,pass a function as a parmaeter,i make it here to update the state
    // its used in FollowProfileButton .
    //callApi that means i will called by follow or unfollow : see FollowProfileButton
    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id ;
        const token = isAuthenticated().token ;
        callApi(userId, token, this.state.user._id).
        then(data => {
            if(data.error)  {
                this.setState({error: data.error}) ;
            }
            else
            {
                this.setState({user:data, following:!this.state.following});}
        });
    };


    render() {

        // redirect the user to the login page if he isn't logged in
        const {redirectToSignIn , user , posts} = this.state ;
        //console.log(" Redirect boolean", redirectToSignIn);
        if(redirectToSignIn) return (<Redirect to="/signin" />) ;

        const photoURL = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`: DefaultProfilePicture ;
        


        return (
            <div>
                

                <div className="container">
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h1 className="display-4">Benvenuto(a) {isAuthenticated().user.name}</h1>
                            <p className="lead">Visualizza il tuo profilo </p>
                        </div>
                    </div>
                    
                    <h2 className="mt-5">Profilo</h2>
                    <hr/>
                    <div className="row" >
                        <div className="col-md-4">
                                <img 
                                    src={photoURL}
                                    alt={user.name}
                                    onError={img => (img.target.src = `${DefaultProfilePicture}`)}
                                    style={{width:'100%', height:'20vw', objectFit:'cover' ,borderRadius: "100%",
                                    border: "border border-light"}}>

                                </img>
                         </div>

                         <div className="col-md-8">
                             <div className="card" style={{margin : "0px"}}>
                                 
                                <div className="card-body">
                                     <h1 className="title">{user.name} </h1>
                                     <h6><a href="mailto:{user.email}"className="card-text"> E-mail : {user.email} </a></h6>
                                     <h6 className="card-text"> About : {user.about} </h6>
                                     <h6 className="card-text">{`Membro da : ${(new Date(user.created)).getUTCFullYear()}`}</h6>
                                </div>
                                {/* Button per seguir e non seguire + create poste  + update profile */}
                                {isAuthenticated().user && isAuthenticated().user._id === user._id ? (

                                    <div className="d-inline-block " style={{margin : "22px"}}> 
                                        <Link
                                            className="btn btn-outline-success mr-2"
                                            to={'/post/create/'}
                                        >
                                            Nuovo posto
                                        </Link>
                                        <Link
                                            className="btn btn-raised btn-outline-info mr-2"
                                            to = {`/edit/${user._id}`}
                                        >
                                            Modifica profilo
                                        </Link>

                                    <DeleteUser userId={user._id}/>
                                    </div>

                                    ): (

                                    <FollowProfileButton 
                                        following = {this.state.following}
                                        onButtonClick = {this.clickFollowButton}
                                    />


                                )} 


                                
                                <h4>
                                    <ul className="list-group flex-md-row" style={{margin : "10px"}}>
                                        <li className="list-group-item">{this.state.posts.length} posti</li>
                                        <li className="list-group-item">{user.followers.length} followers</li>
                                        <li className="list-group-item">{user.following.length} profili seguiti</li>
                                    </ul>
                                </h4>
                                
                             </div>

                                 
                     </div>


                    </div>

                    <hr/>
                    <div className="row">
                            <ProfileTabs
                                followers ={user.followers}
                                following ={user.following}
                                posts = {posts}
                            />

                    </div>




                </div>
            </div>
        );

    }

}

export default Profile ;
