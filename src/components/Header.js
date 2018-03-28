import React, {Component} from 'react';
import {connect} from "react-redux";
import TextField from "material-ui/TextField";
import validator from "validator";
import Typed from 'typed.js';
import {
    createNewCanvas,
    deleteCanvas,
    updateName,
    updateEmail,
    updateCanvasLink,
    updateIsShared,
    updateCanEdit
} from '../actions/canvasActions';

// import {
//     createNewTeam,
//     fetchTeams,
//     addTeamMember
// } from "../actions/teams"

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Clear from "material-ui/svg-icons/content/clear";
import Toggle from 'material-ui/Toggle';
import {FacebookShareButton,
        GooglePlusShareButton,
        LinkedinShareButton,
        TwitterShareButton
       } from 'react-share';
import {BASE_URL} from "../constants/index";
import {moveCursorToEnd} from "../core/util";

class Header extends Component {

    constructor() {
        super();

        this.state = ({
            name: '',
            nameValid: false,
            nameErr: '',

            email: '',
            emailValid: true,
            emailErr: '',

            open: false,
            openShareOthers: false,
            canShare: false,
        });

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);

    }

    componentDidMount() {
        const stringAnimationOptions = {
            strings: ["This is your future Business Model Canvas", "\"Help\" if you don't know how to make it", "Write me if you'll find some mistake", "And don't forget to name your Canvas here", "Canvas Name"],
            typeSpeed: 30,
            backSpeed: 30,
            fadeOut: true,
            bindInputFocusEvents: true,
            attr: 'placeholder'
        };

        if(this.props.name.length === 0 || this.props.isLoadedCanvas){
            this.typed = new Typed('.head-table__title', stringAnimationOptions);
        }
    }

    setCanEdit = () => {
        if (this.props.author === this.props.user.uid || this.props.canEdit) {
            return true;
        } else {
            return false;
        }
    };

    onChangeName = (name) => {
        if (name.target.value.length === 0) {
            this.setState({
                name: name.target.value,
                nameValid: false,
                nameErr: `Name can't be empty`
            })
        } else {
            this.setState({
                name: name.target.value,
                nameValid: true,
                nameErr: ''
            })
        }
    };

    handleOpenDialog = () => {
        if (this.props.isShared) {
            this.setState({
                openShareOthers: true,
            });
        } else {
            this.setState({
                open: true,
            });
            if (this.props.name.length !== 0) {
                this.setState({
                    name: this.props.name,
                })
            }
            if (this.props.email.length !== 0) {
                this.setState({
                    email: this.props.email,
                })
            }
        }
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
        this.setState({name: '', email: '', nameErr: '', emailErr: ''})
    };

    handleCloseShareOthers = () => {
        this.setState({
            openShareOthers: false,
        });
    };

    onClickSaveButton = () => {
        if (this.state.name.length !== 0 && this.state.email.length !== 0 && this.state.emailErr.length === 0) {
            this.props.updateName(this.props.match.params.id, this.state.name);
            this.props.updateEmail(this.props.match.params.id, this.state.email);
            this.props.updateIsShared(this.props.match.params.id, true);
            this.props.updateCanvasLink(this.props.match.params.id, this.props.match.params.id);
            this.setState({
                open: false,
                openShareOthers: true,
                name: '',
                email: ''
            });
        } else if (this.state.name.length === 0 && this.state.email.length === 0) {
            this.setState({
                nameErr: `Name can't be empty`,
                emailErr: `Email can't be empty`
            })
        } else if (this.state.email.length === 0) {
            this.setState({
                emailErr: `Email can't be empty`
            })
        } else if (this.state.name.length === 0) {
            this.setState({
                nameErr: `Name can't be empty`
            })
        }
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
        this.props.updateCanEdit(this.props.match.params.id, toggled);
    };

    onChangeEmail = (email) => {
        if (email.target.value.length === 0) {
            this.setState({
                email: email.target.value,
                emailErr: `Email can't be empty`
            })
        } else if (!validator.isEmail(email.target.value)) {
            this.setState({
                email: email.target.value,
                emailErr: 'Enter a valid email'
            })
        } else {
            this.setState({
                email: email.target.value,
                emailErr: ''
            })
        }
    };

    selectionText = (id) => {
        if (this.props.name.length === 0) {
            let value = document.getElementById(id).value;
            document.getElementById(id).setSelectionRange(0, value.length);
        }
    };
    selectionTextLink = (id) => {
        let value = document.getElementById(id).value;
        document.getElementById(id).setSelectionRange(0, value.length);
    };
    createNewCanvas = () => {
        this.props.createNewCanvas(this.props.user.uid);
        window.open(`${BASE_URL}/`, '_blank')
    };

    // createNewTeam = () =>{
    //     this.props.createNewTeam(this.props.user.uid, 'Team #2', this.props.canvasLink, this.props.email);
    // }
    //
    // fetchTeams = () =>{
    //     this.props.fetchTeams(this.props.user.uid);
    // }
    //
    // addTeamMember = () =>{
    //     this.props.addTeamMember('-L8XgvMk8gxdpmcxbZwj', 'vasya@gmail.com', false);
    // }

    renderSaveDialog() {
        const actions = [
            <FlatButton
                label="SAVE"
                primary={true}
                className="save-but"
                backgroundColor='#7C4DFF'
                onClick={this.onClickSaveButton}
                style={styles.saveButton}
                labelStyle={styles.saveButtonLableStyle}
            />,
        ];
        return (
            <Dialog
                id="1"
                className="write-info"
                contentStyle={styles.saveAndShareDialog}
                titleStyle={styles.titleStyle}
                title={"SAVE & SHARE YOUR BUSINESS CANVAS"}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <Clear className="close-dialog" onClick={this.handleClose}
                       thumbSwitchedStyle={styles.thumbSwitched}/>
                <div className="body-dialog">
                    <label className="dialog-desc">
                        If you want, you can give edit access. Note that all who has a link can change share
                        settings.
                    </label>
                    <TextField
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Canvas Name"
                        defaultValue={this.props.name}
                        autoFocus="true"
                        maxLength={160}
                        onFocus={() => moveCursorToEnd(`name`)}
                        onChange={this.onChangeName}
                        errorText={this.state.nameErr}
                    />
                    <TextField
                        type="text"
                        id="email"
                        placeholder="Your email address"
                        defaultValue={this.props.email}
                        onFocus={() => moveCursorToEnd(`email`)}
                        onChange={this.onChangeEmail}
                        errorText={this.state.emailErr}
                    />
                </div>
            </Dialog>

        )
    }

    renderShareDialog() {
        return (   <Dialog
            id="2"
            contentStyle={styles.saveAndShareDialog}
            titleStyle={styles.titleStyle}
            title={"SAVE & SHARE YOUR BUSINESS CANVAS"}
            modal={false}
            open={this.state.openShareOthers}
            onRequestClose={this.handleCloseShareOthers}
        >
            <Clear className="close-dialog"
                   onClick={this.handleCloseShareOthers}/>
            <div className="body-dialog">
                <label className="dialog-desc">
                    If you want, you can give edit access. Note that all who has a link can change share
                    settings.
                </label>
                <input className="link-copy-share"
                       id='linkCopyShare'
                       value={window.location.href}
                       onFocus={() => this.selectionTextLink('linkCopyShare')}
                />
                <Toggle
                    className="toggle-input"
                    name="canShare"
                    label="Can edit and share others"
                    toggled={this.state.canShare}
                    style={styles.toggle}
                    labelPosition="right"
                    onToggle={this.handleToggle}
                    trackSwitchedStyle={styles.trackSwitched}
                    thumbSwitchedStyle={styles.thumbSwitched}
                />
                <label className="or">
                    OR
                </label>
                <div className="soc-link clearfix">
                    <TwitterShareButton
                        url={window.location.href}
                        className="tw">
                        <a href="#" className="tw">&nbsp;</a>
                    </TwitterShareButton>
                    <FacebookShareButton
                        url={window.location.href}
                        className="fb">
                        <a href="#" className="fb">&nbsp;</a>
                    </FacebookShareButton>
                    <LinkedinShareButton
                        url={window.location.href}
                        className="lin">
                        <a href="#" className="lin">&nbsp;</a>
                    </LinkedinShareButton>
                    <GooglePlusShareButton
                        url={window.location.href}
                        className="lin">
                        <a href="#" className="google">&nbsp;</a>
                    </GooglePlusShareButton>
                </div>
            </div>
        </Dialog>)
    }

    printElement(elem, append, delimiter) {
        let domClone = elem.cloneNode(true);

        let printSection = document.getElementById("printSection");

        if (!printSection) {
            printSection = document.createElement("div");
            printSection.id = "printSection";
            document.body.appendChild(printSection);
        }

        if (append !== true) {
            printSection.innerHTML = "";
        }

        else if (append === true) {
            if (typeof(delimiter) === "string") {
                printSection.innerHTML += delimiter;
            }
            else if (typeof(delimiter) === "object") {
                printSection.appendChlid(delimiter);
            }
        }

        printSection.appendChild(domClone);
    }
    render() {

        return (
            <div>
                <div className="cnvs">
                    cnvs
                </div>
                <div className="head-table">
                    <div className={this.props.isShared ?
                        "head-table__name" :
                        "head-table__name big-name"}>
                        <input
                            className={this.props.name.length === 0 ? "head-table__title" : "head-table__title name_hame"}
                            id='inputName'
                            placeholder={this.props.isLoadedCanvas?'New Business Canvas':''}
                            value={this.props.name.length === 0 ? '' : this.props.name}
                            onFocus={() => this.selectionText('inputName')}
                            onChange={(name) => this.props.updateName(this.props.match.params.id, name.target.value)}
                            maxLength={160}
                            disabled={!this.setCanEdit()}
                        />
                        {this.props.canvasLink.length !== 0 &&
                        <a href={`${BASE_URL}/` + this.props.canvasLink} className="link_after_name">
                            {`${BASE_URL}/` + this.props.canvasLink}
                        </a>}
                    </div>
                    <div className="head-table__buttons">
                        {this.props.isLoadedCanvas&&<a href="#" className="help-link" target="__blank">
                            HELP
                        </a>}
                        {this.props.isLoadedCanvas&&<a href="#" onClick={()=>{
                            this.printElement(document.getElementById("table_area"))
                            window.print();
                        }}
                                                       size='landscape' className="help-print">PRINT</a>}

                        {this.props.author === this.props.user.uid &&
                        <a href="#" className="help-share" onClick={this.handleOpenDialog}>
                            SAVE&SHARE
                        </a>}

                        {/*{this.props.isShared && <a href="#"*/}
                                                   {/*className={this.props.author === this.props.user.uid ? "help-new" : "help-new clear_mar"}*/}
                                                   {/*onClick={this.createNewCanvas}>*/}
                            {/*CREATE NEW*/}
                        {/*</a>}*/}
                        {/*{this.props.author === this.props.user.uid && <a href="#" className="teams-link"*/}
                                                                         {/*onClick={this.createNewTeam}>ADD TEAM </a>}*/}
                        {/*{this.props.author === this.props.user.uid && <a href="#" className="teams-link"*/}
                                                                         {/*onClick={this.fetchTeams}>*/}
                            {/*SHOW MY TEAMS*/}
                        {/*</a>}*/}
                        {/*{this.props.author === this.props.user.uid && <a href="#" className="teams-link"*/}
                                                                         {/*onClick={this.addTeamMember}>*/}
                            {/*ADD MEMBER*/}
                        {/*</a>}*/}
                    </div>
                </div>

                {this.renderSaveDialog()}
                {this.renderShareDialog()}


            </div>
        )
    }
}

const styles = {
    saveAndShareDialog: {
        height: '324px',
        width: '518px',
    },
    toggle: {
        width: 'auto',
        display: 'table',
        margin: '8px auto 16px',
        color: 'rgba(16,16,16,0.8)',
        fontFamily: "Lato",
        fontSize: '14px',
        lineHeight: '18px'
    },
    saveButton: {
        height: '40px',
        width: '160px',
        backgroundColor: '#1A5AFF'
    },
    titleStyle: {
        padding: '16px 0 0',
        display: 'table',
        margin: '0px auto',
        height: '24px',
        width: 'auto',
        color: '#212121',
        fontFamily: "Lato-Bold",
        fontSize: '20px',
        lineHeight: '24px',
        textAlign: 'center'
    },
    saveButtonLableStyle: {
        color: '#fff',
    },
    trackSwitched: {
        background: 'rgba(21, 57, 150,.5)',
    },
    thumbSwitched: {
        background: '#153996',
    }
}

//
// const mapStateToProps = (state, ownProps) => ({
//     track: state.tracks.find(track => track.id === Number(ownProps.params.id))
// })
//
// export default connect(mapStateToProps)(Track);


export default connect(
    (state) => {
        {
            const {auth, canvas} = state
            return {
                user: auth.user,
                canEdit: canvas.canEdit,
                name: canvas.name,
                email: canvas.email,
                author: canvas.author,
                canvasLink: canvas.canvasLink,
                isShared: canvas.isShared,
                isLoadedCanvas: canvas.isLoadedCanvas

            }
        }
    },
    {
        createNewCanvas,
        deleteCanvas,
        updateName,
        updateEmail,
        updateCanvasLink,
        updateIsShared,
        updateCanEdit
        // createNewTeam,
        // fetchTeams,
        // addTeamMember
    }
)(Header)
