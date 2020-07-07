import React , {Component} from "react";
import {Redirect} from "react-router-dom";
import {isAuthenticated} from "../authentication";
import {remove} from "./apiUser";
import {signout} from "../authentication";



class DeleteUser extends Component{

    //we dont need super , just the state to temporarly handle the "redirect"
    state ={
        redirect : false
    };

    deleteConfirmed =()=>{
        let answer = window.confirm("il tuo account verrà eliminato definitivamente!, vuoi continuare ?") ;
        answer? this.deleteAccount() : console.log("elimina account non confermat") ;

    };

    deleteAccount=()=>{
        console.log("elimina account confermato");
        const token = isAuthenticated().token ;
        const userId = this.props.userId ;      // this come from : <DeleteUser userId={user._id}/> in Profile.js
        remove(userId, token)
            .then(data => {
                if(data.error){
                    console.log(data.error);
                }
                else {
                    // signout
                    signout(()=> console.log("utente eliminato")); // take a function as an argoment

                    //redirect
                    this.setState({redirect : true});

                }
            })

    };



    render() {

        if(this.state.redirect)  {return (<Redirect to="/signin" />);}

        return(
            <button onClick={this.deleteConfirmed} className="btn btn-outline-warning">Elimina profilo</button>

        );
    }
}

export default DeleteUser ;







/*
import React , {Component} from "react";
import {Link} from "react-router-dom";

export class DeleteUser extends Component{
    render() {
        return(
            <button className="btn btn-outline-danger">Delete profile</button>

        );
    }
}

export default DeleteUser ;
*/