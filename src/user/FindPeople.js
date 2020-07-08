import React , {Component} from 'react' ;
import {findPeople} from './apiUser';
import DefaultProfilePicture from "../images/User_Avatar.png" ;
import {Link} from "react-router-dom";
import {isAuthenticated} from "../authentication";
import {follow} from './apiUser';

class FindPeople extends Component{

    constructor(){
        super();
        this.state = {
            users : [],
            error : "",
            alert : false,
            followMessage : ""
        }
    }


    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token ;
        findPeople(userId, token).then(data => {

            data.error ? console.log(data.error) : this.setState({users : data}) ;

        });
    }

    clickFollow =(user, index) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token ;
        follow(userId,token,user._id)
            .then(data => {
                if (data.error) {
                        this.setState({error : data.error})
                    }
                else {
                       let toFollow = this.state.users;
                       toFollow.splice(index, 1);
                       this.setState({users : toFollow, alert : true,followMessage : `ora stai seguendo ${user.name}`});
                    setTimeout(() => {
                        this.setState({ alert: false });
                    }, 2000);
                    }

            });
    };

    // return all users.  () = {return ..}
    renderUsers = (users) => (
        <div className="row">
            {users.map((user, index) => // use =>(..) or =>{return ..}
                (


                    // react ask to have a unique key for rendered element
                    <div className="card col-md-3" style={{margin: "40px"}} key={index}>


                        {/*
                     <img
                     className="card-img-top"
                     src={DefaultProfilePicture}
                     alt={user.name}
                     style={{width:'100%', height:'15vw', objectFit:'cover'}}/>
                     */}


                        <img
                            src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                            onError={img => (img.target.src = `${DefaultProfilePicture}`)}
                            alt={user.name}
                            style={{width:'100%', height:'20vw', objectFit:'cover'}} />




                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.email}</p>
                            <Link
                                to={`/user/${user._id}`}
                                className="btn btn-raised btn-primary mr-2">Profilo
                            </Link>
                            <button type="button" onClick={() => this.clickFollow(user, index)} className="btn btn-outline-success">Segui</button>
                        </div>
                    </div>




                ))}

        </div>
    );


    render() {
        const {users, alert, followMessage} = this.state ;

        return (
            <div className="container">

                <div
                    className="p-3 mb-2 bg-success text-white"
                    role="alert"
                    style = {{display  : alert ? "":"none"}}

                >
                         {followMessage}
                </div>


                <h2 className="mt-5 mb-5">Trovare persone</h2>
                <hr></hr>


                {this.renderUsers(users)}

            </div>
        );


    }

}

export default FindPeople ;