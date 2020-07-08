import React , {Component} from 'react' ;
import {list} from './apiUser';
import DefaultProfilePicture from "../images/User_Avatar.png" ;
import {Link} from "react-router-dom";

class Users extends Component{

     constructor(){
         super();
         this.state = {
             users : []
         }
     }


     componentDidMount() {
         // list is a funtion in (apiUser) that return list of users ,i handle it here by then
         list().then(data => {

             data.error ? console.log(data.error) : this.setState({users : data}) ;

             });
     }

     // return all users.  () = {return ..}
     renderUsers = (users) => (
         <div className="row" /*style={{margin: "35px", backgroundColor:'#ffffff'}}*/ >
             {users.map((user, index) => // use =>(..) or =>{return ..}
                 (


                  // react ask to have a unique key for rendered element
                 <div className="card col-md-3" style={{margin: "40px"}} key={index}>

                     <img
                         src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                         onError={img => (img.target.src = `${DefaultProfilePicture}`)}
                         alt={user.name}
                         style={{width:'100%', height:'20vw', objectFit:'cover'}} />

                     <div className="card-body">
                     <Link
                        to={`/user/${user._id}`}
                        //className="btn btn-raised btn-info">Profile
                        className="card-title" ><h3>{user.name}</h3>
                    </Link>
                 {/* <div className="card-title"><h2>{user.name}</h2></div> */}
                 <p className="card-text">{user.email}</p>
                
                 </div>
                 </div>




                 ))}
         </div>
 );


     render() {
         const {users} = this.state ;

        return (
            <div className="container"> {/*container to center elements into the page*/}
                <h2 className="mt-5 mb-5">Utenti</h2>
                <hr></hr>

                {this.renderUsers(users)}

            </div>
        );


    }

}

export default Users ;