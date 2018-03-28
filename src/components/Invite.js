import React, {Component} from "react";
import {connect} from "react-redux";
import {inviteUser, checkAuth} from '../actions/authActions';


class Invite extends Component {

    componentDidMount() {
        this.props.checkAuth();
    }

    render() {
        if (!this.props.user.isAnonymous) {
            let inviteUserResult = this.props.inviteUser(this.props.match.params.projectId, this.props.user.email);

            console.log('invite=', this.props.user);
            console.log('project=', this.props.match.params.projectId);

            if (this.props.userIsInvited)
            { return(<div><p>Invited</p></div>);

            }
            else
            {return(<div><p>Not invited</p></div>); }
        }



        // if (!this.props.user.isAnonymous && this.props.userIsInvited(this.props.params.projectId, this.props.user.email)){
        //     let userAdded = this.props.addInvitedUserToProject((this.props.params.projectId, this.props.user.email));
        //
        //     if (userAdded){
        //
        //     }

        return (

            <div>

            </div>
        );
    }

}

export default connect(
    (state) => {
        {

            return {
                user: state.auth.user,
                userIsInvited: state.auth.userIsInvited
            }
        }
    },
    {
        inviteUser,
        checkAuth
    }
)(Invite)



