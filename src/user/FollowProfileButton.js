import React,{Component} from 'react';
import {follow, unFollow} from './apiUser';

class FollowProfileButton extends Component{

    followClick = () => {
        // will execute onButtonClick method which require another method (follow) in apiUser
        this.props.onButtonClick(follow);
    };

    unfollowClick = () => {
        // will execute onButtonClick method which require another method (follow) in apiUser
        this.props.onButtonClick(unFollow);
    };

    render() {

        return (
            <div className="d-inline-block mt-2" style={{margin : "22px"}}>

                {!this.props.following ?
                    (<button type="button" onClick={this.followClick} className="btn btn-raised btn-success">Segui</button>
                    ): (
                        <button type="button" onClick={this.unfollowClick} className="btn btn-raised btn-warning">Non-Seguire-più</button>)
                }




            </div>
        );
    }

}

export default FollowProfileButton ;