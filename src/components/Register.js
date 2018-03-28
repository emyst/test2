import React, {Component} from "react";
import {TextField, RaisedButton} from 'material-ui';
import {connect} from "react-redux";
import {signupEmail} from '../actions/authActions';

class Register extends Component {
    constructor() {
        super();

        this.state = ({
            name: '',
            // nameValid: false,
            // nameErr: '',

            email: '',
            // emailValid: true,
            // emailErr: '',

            password: '',
            re_password: '',
            passwordValid: ''

        });


         this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }
    // handleChange(event) {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    // };

    handleSubmit(event) {
       this.props.signupEmail();

    }

    render() {
        return (
            <div className="SignupForm" align="center" color="white">
                <h1>Register form</h1>
                <TextField  type="text"
                            hintText="User Name"
                            floatingLabelText="User Name"
                            name="username"
                            value={this.state.username}
                            />
                <br/>

                <TextField  type="text"
                            hintText="Email"
                            floatingLabelText="Email"
                            name="email"
                            value={this.state.email}
                            />
                <br/>

                <TextField
                    name="password"
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
                    value={this.state.password}
                    />

                <br/>

                <TextField
                    name="confirmPassword"
                    hintText="Confirm Password"
                    floatingLabelText="Confirm Password"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}/>
                <br/>
                <br/>

                <RaisedButton label="Register" primary={true} onClick={this.handleSubmit} />

            </div>


        );
    }

}

export default connect(
    (state) => {
        {
            const {auth} = state;
            return {
                user: auth.user,
                users: auth.users,

            }
        }
    },
    {
        signupEmail
    }
)(Register)





