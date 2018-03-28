import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    addChild,
    clearAll,
    createNewCanvas,
    deleteCanvas,
    deleteChild,
    updateChild,
} from "../actions/canvasActions"
// import {BASE_URL} from "../constants/index";
import {moveCursorToEnd} from "../core/util";


class Table extends Component{
    constructor() {
        super();
        this.state = ({

            isEdited: false,

            editNewText: '',

            isEditing: false,
            isEditingLi: false,

            isEditingOneTwo: false,
            isEditingLiOneTwo: false,

            isEditingTwo: false,
            isEditingLiTwo: false,

            isEditingTwoTwo: false,
            isEditingLiTwoTwo: false,

            isEditingFree: false,
            isEditingLiFree: false,

            isEditingFour: false,
            isEditingLiFour: false,

            isEditingFive: false,
            isEditingLiFive: false,

            isEditingFiveTwo: false,
            isEditingLiFiveTwo: false,

            isEditingSix: false,
            isEditingLiSix: false,

            isEditingSeven: false,
            isEditingLiSeven: false,

            isEditingEight: false,
            isEditingLiEight: false,

            isEditingNine: false,
            isEditingLiNine: false,

            isEditingTen: false,
            isEditingLiTen: false,
        });

        this.onChangeEdit = this.onChangeEdit.bind(this);
    }

    setCanEdit = () => {
        if (this.props.author === this.props.user.uid || this.props.canEdit) {
            return true;
        } else {
            return false;
        }
    };

    handleKeyPress = (e, cardNumber, isEditingVariable) => {
        if (e.key === 'Enter') {
            if (this.state.editNewText.length !== 0) {
                this.props.addChild(this.props.match.params.id, cardNumber, this.state.editNewText);
                this.setState({[isEditingVariable]: true, editNewText: '', isEdited: false});
            } else {
                this.setState({[isEditingVariable]: false, isEdited: false});
            }
        }
    };
    handleKeyDown = (e, isEditingVariable, cardNumber, listNumber, isEditingLiVariable) => {
        //console.log('[isEditingLiVariable]:true', isEditingLiVariable)
        if (e.key === 'ArrowUp') {
            if (listNumber.length!==0){
                if (this.state.editNewText.length !== 0) {
                    this.props.addChild(this.props.match.params.id, cardNumber, this.state.editNewText);
                    this.setState({[isEditingVariable]: false, editNewText: '', isEdited: false, editingElInd: listNumber.length-1, [isEditingLiVariable]:true});
                } else {
                    this.setState({[isEditingVariable]: false, isEdited: false, editingElInd: listNumber.length-1, [isEditingLiVariable]:true});
                }
            }else {
                if (this.state.editNewText.length !== 0) {
                    this.props.addChild(this.props.match.params.id, cardNumber, this.state.editNewText);
                    this.setState({[isEditingVariable]: true, editNewText: '', isEdited: false});
                } else {
                    this.setState({[isEditingVariable]: false, isEdited: false});
                }
            }
        }else  if (e.key === 'ArrowDown') {
            if (this.state.editNewText.length !== 0) {
                this.props.addChild(this.props.match.params.id, cardNumber, this.state.editNewText);
                this.setState({[isEditingVariable]: true, editNewText: '', isEdited: false});
            } else {
                this.setState({[isEditingVariable]: false, isEdited: false});
            }
        }
    };
    handleOnBlur = (isEditingVariable, cardNumber) => {
        if (this.state.editNewText.length !== 0) {
            this.props.addChild(this.props.match.params.id, cardNumber, this.state.editNewText);
        }
        this.setState({[isEditingVariable]: false, editNewText: '', isEdited: false});
    };

    onChangeEdit = (text) => {
        this.setState({
            editNewText: text.target.value,
            isEdited: true,
        })
    };
    handleDoubleClickLi = (el, ind, isEditingLiVariable) => {
        this.setState({
            [isEditingLiVariable]: true,
            editingElInd: ind,
            editNewText: el,
        });
    };
    handleKeyPressLi = (e, ind, isEditingLiVariable, cardNumber) => {
        if (e.key === 'Enter') {
            if (this.state.isEdited&&this.state.editNewText.length !== 0) {
                this.props.updateChild(this.props.match.params.id, cardNumber, ind, this.state.editNewText);
                this.setState({[isEditingLiVariable]: false, editNewText: '', isEdited:false});
            } else if (this.state.isEdited&&this.state.editNewText.length === 0) {
                this.props.deleteChild(this.props.match.params.id, cardNumber, ind);
                this.setState({[isEditingLiVariable]: false, editNewText: '', isEdited:false});
            }else if (!this.state.isEdited){
                this.setState({[isEditingLiVariable]: false, editNewText: ''});
            }
        }
    };
    handleKeyDownLi = (e, ind, isEditingLiVariable, cardNumber, listNumber, isEditingVariable) => {
        //console.log('[isEditingVariable]: true', e, ind, isEditingLiVariable, cardNumber, listNumber, isEditingVariable)
        if (e.key === 'ArrowUp') {
            if (ind===0){
                if (this.state.isEdited&&this.state.editNewText.length !== 0) {
                    this.props.updateChild(this.props.match.params.id, cardNumber, ind, this.state.editNewText);
                    this.setState({[isEditingLiVariable]: false, editNewText: '', isEdited: false});
                } else if (this.state.isEdited&&this.state.editNewText.length === 0){
                    this.setState({[isEditingLiVariable]: false, editNewText: '', isEdited: false});
                    this.props.deleteChild(this.props.match.params.id, cardNumber, ind);
                } else if (!this.state.isEdited){
                    this.setState({[isEditingLiVariable]: false, editNewText: '',});
                }
            }else{
                if (this.state.isEdited&&this.state.editNewText.length !== 0) {
                    this.props.updateChild(this.props.match.params.id, cardNumber, ind, this.state.editNewText);
                    this.setState({editingElInd: ind-1, editNewText: '', isEdited: false});
                } else if (this.state.isEdited&&this.state.editNewText.length === 0){
                    this.setState({editingElInd: ind-1, isEdited: false});
                    this.props.deleteChild(this.props.match.params.id, cardNumber, ind);
                } else if (!this.state.isEdited){
                    this.setState({editingElInd: ind-1});
                }
            }

        }else if (e.key === 'ArrowDown'){
            if (listNumber.length===ind+1){
                if (this.state.isEdited&&this.state.editNewText.length !== 0) {
                    this.props.updateChild(this.props.match.params.id, cardNumber, ind, this.state.editNewText);
                    this.setState({[isEditingLiVariable]: false, editNewText: '', isEdited: false, [isEditingVariable]: true});
                } else if (this.state.isEdited&&this.state.editNewText.length === 0){
                    this.setState({[isEditingLiVariable]: false, editNewText: '', isEdited: false, [isEditingVariable]: true});
                    this.props.deleteChild(this.props.match.params.id, cardNumber, ind);
                } else if (!this.state.isEdited){
                    this.setState({[isEditingLiVariable]: false, editNewText: '', [isEditingVariable]: true});
                }
            }else{
                if (this.state.isEdited&&this.state.editNewText.length !== 0) {
                    this.props.updateChild(this.props.match.params.id, cardNumber, ind, this.state.editNewText);
                    this.setState({editingElInd: ind+1, editNewText: '', isEdited: false, [isEditingVariable]: true});
                } else if (this.state.isEdited&&this.state.editNewText.length === 0){
                    this.setState({editingElInd: ind+1, editNewText: '', isEdited: false, [isEditingVariable]: true});
                    this.props.deleteChild(this.props.match.params.id, cardNumber, ind);
                } else if (!this.state.isEdited){
                    this.setState({editingElInd: ind+1, editNewText: '', [isEditingVariable]: true});
                }
            }
        }
    };
    handleOnBlurLi = (ind, isEditingLiVariable, cardNumber) => {
        if (this.state.isEdited&&this.state.editNewText.length !== 0) {
            this.props.updateChild(this.props.match.params.id, cardNumber, ind, this.state.editNewText);
            this.setState({[isEditingLiVariable]: false, editNewText: '', isEdited:false});
        } else if (this.state.isEdited&&this.state.editNewText.length === 0) {
            this.props.deleteChild(this.props.match.params.id, cardNumber, ind);
            this.setState({[isEditingLiVariable]: false, editNewText: '', isEdited:false});
        }else if (!this.state.isEdited){
            this.setState({[isEditingLiVariable]: false, editNewText: ''});
        }
    };


    cleareCanvas = () => {
        this.props.deleteCanvas();
    };

    renderInputLi = (isEditingLiVariable, cardNumber, id, ind, el, listNumber, editLiId, isEditingVariable) => {

        return (
            <input
                type="text"
                onKeyPress={(e) => this.handleKeyPressLi(e, ind, isEditingLiVariable, cardNumber)}
                onKeyDown={(e)=>this.handleKeyDownLi(e, ind, isEditingLiVariable, cardNumber, listNumber, isEditingVariable)}
                id={id}
                className="text-edit"
                key={id}
                name={id}
                placeholder="Type in something ..."
                defaultValue={el}
                autoFocus="true"
                onFocus={() => moveCursorToEnd(id)}
                onBlur={() => this.handleOnBlurLi(ind, isEditingLiVariable, cardNumber)}
                onChange={this.onChangeEdit}
            />
        )
    };

    renderInput = (isEditingVariable, cardNumber, id, listNumber, isEditingLiVariable) => {
        return (
            <div className="text-add-block">
                <input
                    type="text"
                    onKeyPress={(e) => this.handleKeyPress(e, cardNumber, isEditingVariable)}
                    id={id}
                    className="text-add"
                    name={id}
                    value={this.state.editNewText}
                    placeholder="Type in something"
                    autoFocus="true"
                    onKeyDown={(e)=>this.handleKeyDown(e, isEditingVariable, cardNumber, listNumber, isEditingLiVariable)}
                    onBlur={() => this.handleOnBlur(isEditingVariable, cardNumber)}
                    onFocus={() => moveCursorToEnd(id)}
                    onChange={this.onChangeEdit}/><br/>
                <span className="desc-in-td">
                    Enter to save and add new elements
                </span>
            </div>
        )
    };
    renderDivInTd = (descText, number, numberClass, listNumber, isEditingLi, isEditingLiVariable, cardNumber, editLiId, isEditing, isEditingVariable, editId) => {
        return (
            <div>
                    <span className="desc-in-td" onClick={() => this.setState({[isEditingVariable]: true})}>
                        {descText}
                    </span>
                {listNumber.length !== 0
                    ?
                    <div>
                        <ul type="none">
                            {listNumber.map((el, ind) => {
                                return (
                                    this.setCanEdit() && isEditingLi && this.state.editingElInd === ind
                                        ?
                                        this.renderInputLi(isEditingLiVariable, cardNumber, `${editLiId}${ind}`, ind, el, listNumber, editLiId, isEditingVariable)
                                        :
                                        <div key={`div_${ind}`}
                                             onClick={(event) => this.childCallback(event, el, ind, isEditingLiVariable)}>
                                            <li key={ind}>{el}</li>
                                        </div>
                                )
                            })}
                        </ul>
                        {this.setCanEdit() && isEditing
                            ?
                            this.renderInput(isEditingVariable, cardNumber, editId, listNumber, isEditingLiVariable)
                            :
                            <div className="square-click" onClick={() => this.setState({[isEditingVariable]: true})}>
                                &nbsp;
                            </div>
                        }
                    </div>
                    :
                    this.setCanEdit() && isEditing
                        ?
                        this.renderInput(isEditingVariable, cardNumber, editId, listNumber, isEditingLiVariable)
                        :
                        <div onClick={() => this.setState({[isEditingVariable]: true})}>
                            <p className={numberClass}>
                                {number}
                            </p>
                        </div>}
            </div>
        )
    };
    childCallback = (event, el, ind, isEditingLiVariable) => {
        event.stopPropagation();
        this.handleDoubleClickLi(el, ind, isEditingLiVariable);
        return false;
    };

    hideDelete = () => {
        if (this.props.one.length === 0 && this.props.one_two.length === 0 && this.props.two.length === 0 &&
            this.props.free.length === 0 && this.props.four.length === 0 && this.props.two_two.length === 0 &&
            this.props.five.length === 0 && this.props.six.length === 0 && this.props.five.length === 0 &&
            this.props.seven.length === 0 && this.props.eight.length === 0 && this.props.nine.length === 0) {
            return true
        } else {
            return false
        }

    };

    render(){
        return(
            <div>
                <div id="table_area">
                    <table className="table">
                        <tbody>
                        <tr>
                            <td
                                className={this.setCanEdit()&&(this.state.isEditingTwo||this.state.isEditingLiTwo||this.state.isEditingTwoTwo||this.state.isEditingLiTwoTwo) ?
                                    "active-block rectangle big-rectangle" :
                                    "rectangle big-rectangle hover-block"}>
                                <h3 className="head-in-td">
                                    PROBLEMS
                                </h3>
                                <div className="flex-box ">
                                    <div className="block-in-td" onClick={() =>this.setState({isEditingTwo: true})}>
                                        {this.renderDivInTd('List your customer`s top 3 problems', 2, "big-number",
                                            this.props.two, this.state.isEditingLiTwo, 'isEditingLiTwo', 'two', `editTwo`,
                                            this.state.isEditingTwo, 'isEditingTwo', "editTwo")}
                                    </div>
                                    <h3 className="head-in-td">
                                        Existing alternatives
                                    </h3>
                                    <div className={this.setCanEdit()&&(this.state.isEditingTwoTwo||this.state.isEditingLiTwoTwo)||this.props.two_two.length > 0 ? "bottom-td block-bot" : "bottom-td"}>
                                        {this.renderDivInTd('List how these problems are solved today', null, "none-number",
                                            this.props.two_two, this.state.isEditingLiTwoTwo, 'isEditingLiTwoTwo', 'two_two', `editTwoTwo`,
                                            this.state.isEditingTwoTwo, 'isEditingTwoTwo', "editTwoTwo")}
                                    </div>
                                </div>
                            </td>
                            <td className="rectangle small-rectangle">
                                <div id={(this.props.free.length > 7)||(this.props.seven.length > 7) ? "autoH" : ""}
                                     className={this.setCanEdit()&&(this.state.isEditingFree||this.state.isEditingLiFree) ?
                                         "active-block big-half" :
                                         "big-half hover-block"}>
                                    <h3 className="head-in-td">
                                        SOLUTIONS
                                    </h3>
                                    <div onClick={() => this.setState({isEditingFree: true})}
                                         className="block-in-td half-td"
                                    >
                                        {this.renderDivInTd('Outline a possible solution for each problem', 3, "small-number",
                                            this.props.free, this.state.isEditingLiFree, 'isEditingLiFree', 'free', `editFree`,
                                            this.state.isEditingFree, 'isEditingFree', "editFree")}
                                    </div>
                                </div>
                                <div id={(this.props.free.length > 7)||(this.props.seven.length > 7) ? "autoH" : ""}
                                     className={this.setCanEdit()&&(this.state.isEditingSeven||this.state.isEditingLiSeven) ?
                                         "active-block big-half" :
                                         "big-half hover-block"}>
                                    <h3 className="head-in-td">
                                        KEY METRICS
                                    </h3>
                                    <div onClick={() => this.setState({isEditingSeven: true})}
                                         className="block-in-td half-td"
                                    >
                                        {this.renderDivInTd('List the key numbers that tell you how your business is doing', 7, "small-number",
                                            this.props.seven, this.state.isEditingLiSeven, 'isEditingLiSeven', 'seven', `editSeven`,
                                            this.state.isEditingSeven, 'isEditingSeven', "editSeven")}

                                    </div>
                                </div>
                            </td>
                            <td
                                className={this.setCanEdit() && (this.state.isEditingFive || this.state.isEditingLiFive || this.state.isEditingFiveTwo || this.state.isEditingLiFiveTwo) ?
                                    "active-block rectangle big-rectangle" :
                                    "rectangle big-rectangle hover-block"}>
                                <h3 className="head-in-td">
                                    UNIQUE VALUE PROPOSITION
                                </h3>
                                <div className="flex-box">
                                    <div className="block-in-td"
                                         onClick={() => this.setState({isEditingFive: true})}>
                                        {this.renderDivInTd('Single, clear, compelling message that turns an unaware visitor into an interested prospect', 5, "big-number",
                                            this.props.five, this.state.isEditingLiFive, 'isEditingLiFive', 'five', `editFive`,
                                            this.state.isEditingFive, 'isEditingFive', "editFive")}
                                    </div>
                                    <h3 className="head-in-td">
                                        High-Level concept
                                    </h3>
                                    <div className={this.setCanEdit()&&(this.state.isEditingFiveTwo||this.state.isEditingLiFiveTwo)||this.props.five_two.length > 0 ? "bottom-td block-bot" : "bottom-td"}>
                                        {this.renderDivInTd('List your X for Y analogy (e.g. YouTube = Flickr for videos)', null, "none-number",
                                            this.props.five_two, this.state.isEditingLiFiveTwo, 'isEditingLiFiveTwo', 'five_two', `editFiveTwo`,
                                            this.state.isEditingFiveTwo, 'isEditingFiveTwo', "editFiveTwo")}
                                    </div>
                                </div>
                            </td>
                            <td className="rectangle small-rectangle">
                                <div id={(this.props.eight.length > 7)||(this.props.six.length > 7) ? "autoH" : ""}
                                     className={this.setCanEdit() && (this.state.isEditingEight || this.state.isEditingLiEight) ?
                                         "active-block big-half" :
                                         "big-half hover-block"}>
                                    <h3 className="head-in-td">
                                        UNFAIR ADVANTAGE
                                    </h3>
                                    <div onClick={() => this.setState({isEditingEight: true})}
                                         className="block-in-td half-td"
                                    >
                                        {this.renderDivInTd('Something that can not be easily copied or bought', 8, "small-number",
                                            this.props.eight, this.state.isEditingLiEight, 'isEditingLiEight', 'eight', `editEight`,
                                            this.state.isEditingEight, 'isEditingEight', "editEight")}
                                    </div>
                                </div>
                                <div id={(this.props.eight.length > 7)||(this.props.six.length > 7) ? "autoH" : ""}
                                     className={this.setCanEdit() && (this.state.isEditingSix || this.state.isEditingLiSix) ?
                                         "active-block big-half" :
                                         "big-half hover-block"}>
                                    <h3 className="head-in-td">
                                        CHANNELS
                                    </h3>
                                    <div onClick={() => this.setState({isEditingSix: true})}
                                         className="block-in-td half-td"
                                    >
                                        {this.renderDivInTd('List your path to customers', 6, "small-number",
                                            this.props.six, this.state.isEditingLiSix, 'isEditingLiSix', 'six', `editSix`,
                                            this.state.isEditingSix, 'isEditingSix', "editSix")}
                                    </div>
                                </div>
                            </td>
                            <td
                                className={this.setCanEdit() && (this.state.isEditing || this.state.isEditingLi || this.state.isEditingOneTwo || this.state.isEditingLiOneTwo) ?
                                    "active-block rectangle big-rectangle" :
                                    "rectangle big-rectangle hover-block"}>
                                <h3 className="head-in-td">
                                    CUSTOMER SEGMENTS
                                </h3>
                                <div className="flex-box">
                                    <div className="block-in-td"
                                         onClick={() => this.setState({isEditing: true})}>
                                        {this.renderDivInTd('List your customer`s top 3 problems', 1, "big-number",
                                            this.props.one, this.state.isEditingLi, 'isEditingLi', 'one', `editOne`,
                                            this.state.isEditing, 'isEditing', "editOne")}
                                    </div>
                                    <h3 className="head-in-td">
                                        EARLY ADOPTERS
                                    </h3>
                                    <div className={this.setCanEdit()&&(this.state.isEditingOneTwo||this.state.isEditingLiOneTwo)||this.props.one_two.length > 0 ? "bottom-td block-bot" : "bottom-td"}>
                                        {this.renderDivInTd('List the characteristics of your ideal customers', null, "none-number",
                                            this.props.one_two, this.state.isEditingLiOneTwo, 'isEditingLiOneTwo', 'one_two', `editOneTwo`,
                                            this.state.isEditingOneTwo, 'isEditingOneTwo', "editOneTwo")}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td onClick={() => this.setState({isEditingNine: true})}
                                className={this.setCanEdit() && (this.state.isEditingNine || this.state.isEditingLiNine) ?
                                    "active-block rectangle_bot" :
                                    "rectangle_bot hover-block"}>
                                <div className="block-in-td">
                                    <h3 className="head-in-td">
                                        COST STRUCTURE
                                    </h3>
                                    {this.renderDivInTd('List your fixed variable costs', 9, "center-number",
                                        this.props.nine, this.state.isEditingLiNine, 'isEditingLiNine', 'nine', `editNine`,
                                        this.state.isEditingNine, 'isEditingNine', "editNine")}
                                </div>
                            </td>
                            <td onClick={() => this.setState({isEditingFour: true})}
                                className={this.setCanEdit() && (this.state.isEditingFour || this.state.isEditingLiFour) ?
                                    "active-block rectangle_bot" :
                                    "rectangle_bot hover-block"}>
                                <div className="block-in-td">
                                    <h3 className="head-in-td">
                                        REVENUE
                                    </h3>
                                    {this.renderDivInTd('List your sources of revenue', 4, "center-number",
                                        this.props.four, this.state.isEditingLiFour, 'isEditingLiFour', 'four', `editFour`,
                                        this.state.isEditingFour, 'isEditingFour', "editFour")}
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-after-table">
                    <div className="left-side">
                        <span>If you have ideas for share:</span>
                        <span>&nbsp;</span>
                        <span className="bold">hello@cnvs.online</span>
                    </div>
                    {!this.props.isShared && !this.hideDelete() && <div className="right-side">
                        <button onClick={this.cleareCanvas} className="delete">delete</button>
                    </div>}
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => {
        {
            const {auth, canvas} = state
            return {
                user: auth.user,
                author: canvas.author,
                isShared: canvas.isShared,
                canEdit: canvas.canEdit,
                one: canvas.one,
                one_two: canvas.one_two,
                two: canvas.two,
                two_two: canvas.two_two,
                free: canvas.free,
                four: canvas.four,
                five: canvas.five,
                five_two: canvas.five_two,
                six: canvas.six,
                seven: canvas.seven,
                eight: canvas.eight,
                nine: canvas.nine,
            }
        }
    },
    {
        createNewCanvas,
        deleteCanvas,
        updateChild,
        addChild,
        deleteChild,
        clearAll,
    }
)(Table)
