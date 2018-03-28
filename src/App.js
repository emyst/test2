import React, {Component} from 'react';
import {connect} from "react-redux";
import {checkAuth, signIn, onSubscribeUserData,signupEmail } from './actions/authActions';
import { onSubscribeCanvas, setIsNotSharedCanvas, setIsNotValidCanvas} from './actions/canvasActions';
import LinearProgress from 'material-ui/LinearProgress';
import './App.css';

import Header from './components/Header'
import Table from './components/Table'

class App extends Component {

    componentDidMount() {

        //this.props.signIn();
        this.props.signupEmail();
        this.props.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== undefined && Object.keys(nextProps.user).length !== 0 && nextProps.user.uid !== null) {
            this.props.onSubscribeUserData();
        }

        if (!nextProps.match.params.id && this.props.currentCanvasKey !== nextProps.currentCanvasKey) {
            this.props.history.push(`/${nextProps.currentCanvasKey}`);
            this.props.onSubscribeCanvas(nextProps.currentCanvasKey);
        }
        if (nextProps.isNotShared && nextProps.currentCanvasKey !== null) {
            this.props.history.push(`/${nextProps.currentCanvasKey}`);
            this.props.onSubscribeCanvas(nextProps.currentCanvasKey);
            this.props.setIsNotSharedCanvas(false);
        }
        if (nextProps.isNotValidCanvas && nextProps.currentCanvasKey !== null) {
            this.props.history.push(`/${nextProps.currentCanvasKey}`);
            this.props.onSubscribeCanvas(nextProps.currentCanvasKey);
            this.props.setIsNotValidCanvas(false);
        }
        if (this.props.currentCanvasKey === null && nextProps.currentCanvasKey !== null) {
            if (this.props.match.params.id) {
                this.props.onSubscribeCanvas(this.props.match.params.id);
            } else {
                this.props.history.push(`/${nextProps.currentCanvasKey}`);
                this.props.onSubscribeCanvas(nextProps.currentCanvasKey);
            }
        }
    }

    linearProgressBefoLoad(){
        if (!this.props.isLoadedCanvas){
            return(
                <LinearProgress max={40} color='#1A5AFF' mode="indeterminate" />
            )
        }
    }

    render() {
        return (
            <div className="App">
                {this.linearProgressBefoLoad()}
                <div id='content' className="content">
                    <Header match={this.props.match}/>
                    <Table match={this.props.match}/>
                </div>

            </div>
        );
    }
}

export default connect(
    (state) => {
        {
            const {auth, canvas} = state
            return {
                user: auth.user,
                users: auth.users,
                isLoadedCanvas: canvas.isLoadedCanvas,
                currentCanvasKey: auth.currentCanvasKey,
                isNotShared: canvas.isNotShared,
                isNotValidCanvas: canvas.isNotValidCanvas
            }
        }
    },
    {
        signIn,
        signupEmail,
        checkAuth,
        onSubscribeUserData,
        onSubscribeCanvas,
        setIsNotSharedCanvas,
        setIsNotValidCanvas,
    }
)(App)
