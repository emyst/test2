import {
    firebaseDb
} from '../firebase';

export const createNewCanvas = (uidUser) => (dispatch) => {
    let canvasData = {
        author: uidUser,
        isShared: false,
        canEdit: false,
    };
    // Get a key for a new Canvas.
    let currentCanvasKey = firebaseDb.ref().child('canvases').push().key;

    // Write the new canvas's data simultaneously in the canvases list.
    let updates = {};
    updates[`/canvases/${currentCanvasKey}`] = canvasData;
    updates[`/users/${uidUser}/currentCanvas`] = {currentCanvasKey};

    return firebaseDb.ref().update(updates);

};

export const deleteCanvas = (uidCanvas) => (dispatch, getState) => {
    let uidCanvas = getState().auth.currentCanvasKey;
    let author = getState().canvas.author;
    let canvasData = {
        author: author,
        isShared: false,
        canEdit: false,
    };
    let update = {};
    update[`/canvases/${uidCanvas}`] = canvasData;
    return firebaseDb.ref().update(update);
};

export const SET_ON_SUBSCRIBE_CANVAS = 'SET_ON_SUBSCRIBE_CANVAS';
export const SET_IS_NOT_SHARED_CANVAS = 'SET_IS_NOT_SHARED_CANVAS';
export const SET_IS_NOT_VALID_CANVAS = 'SET_IS_NOT_VALID_CANVAS';

export const onSubscribeCanvas = (uidCanvas) => (dispatch, getState) => {
    let uidUser = getState().auth.user.uid;
    firebaseDb.ref(`/canvases/${uidCanvas}`).on('value', snap => {
        const canvas = snap.val();
        // console.log('action onSubscribe', canvas)
        if(canvas!==null&&(uidUser===canvas.author||uidUser!==canvas.author&&canvas.isShared)){
            dispatch({type: SET_ON_SUBSCRIBE_CANVAS, payload: canvas});
        }else if (canvas!==null&&uidUser!==canvas.author&&!canvas.isShared) {
            dispatch({type: SET_IS_NOT_SHARED_CANVAS, payload: true});
        }else {
            dispatch({type: SET_IS_NOT_VALID_CANVAS, payload: true});
        }
    });
};

export const setIsNotSharedCanvas=(isNotShared)=>(dispatch, getState)=>{
    dispatch({type: SET_IS_NOT_SHARED_CANVAS, payload: isNotShared});
};

export const setIsNotValidCanvas=(isNotValidCanvas)=>(dispatch, getState)=>{
    dispatch({type: SET_IS_NOT_VALID_CANVAS, payload: isNotValidCanvas});
};

export const offSubscribeCanvas = (uidCanvas) => (dispatch, getState) => {
    firebaseDb.ref(`/canvases/${uidCanvas}`).off()
};

export const CLEAR_ALL = 'CLEAR_ALL';
export const clearAll = () => ({type: CLEAR_ALL});

export const UPDATE_NAME = 'UPDATE_NAME';
export const updateName = (uidCanvas, name) => {
    return dispatch => {
        dispatch({type: UPDATE_NAME});
        let update = {};
        update[`/canvases/${uidCanvas}/name`] = name;
        // //console.log('update', update)
        return firebaseDb.ref().update(update);
    }
};

export const updateEmail = (uidCanvas, email) => dispatch => {
    let update = {};
    update[`/canvases/${uidCanvas}/email`] = email;
    //console.log('update', update)
    return firebaseDb.ref().update(update);
};

export const UPDATE_IS_SHARED = 'UPDATE_IS_SHARED';
export const updateIsShared = (uidCanvas, isShared) => {
    return dispatch => {
        dispatch({type: UPDATE_IS_SHARED});
        let update = {};
        update[`/canvases/${uidCanvas}/isShared`] = isShared;
        // //console.log('update', update)
        return firebaseDb.ref().update(update);
    }
};
export const UPDATE_CANEDIT = 'UPDATE_CANEDIT';
export const updateCanEdit = (uidCanvas, canEdit) => {
    return dispatch => {
        dispatch({type: UPDATE_CANEDIT});
        let update = {};
        update[`/canvases/${uidCanvas}/canEdit`] = canEdit;
        // //console.log('update', update)
        return firebaseDb.ref().update(update);
    }
};
export const UPDATE_LINK = 'UPDATE_LINK';
export const updateCanvasLink = (uidCanvas, canvasLink) => {
    return dispatch => {
        dispatch({type: UPDATE_LINK});
        let update = {};
        //console.log('link redux', uidCanvas, canvasLink)
        update[`/canvases/${uidCanvas}/canvasLink`] = canvasLink;
        //console.log('update', update)
        return firebaseDb.ref().update(update);
    }
};

export const ADD_CHILD = 'ADD_CHILD';
export const addChild = (uidCanvas, childNumber, value) => (dispatch, getState) => {
    dispatch({type: ADD_CHILD});
    let childData = getState().canvas[childNumber];
    // //console.log('one', childData)
    let newChildData = [...childData, value];
    let add = {};
    add[`/canvases/${uidCanvas}/${childNumber}`] = newChildData;
    return firebaseDb.ref().update(add);
};

export const DELETE_CHILD = 'DELETE_CHILD';
export const deleteChild = (uidCanvas, childNumber, index) => (dispatch, getState) => {
    dispatch({type: DELETE_CHILD});
    let childData = getState().canvas[childNumber];
    //console.log('one', childData)
    childData.splice(index, 1);
    let update = {};
    update[`/canvases/${uidCanvas}/${childNumber}`] = childData;
    return firebaseDb.ref().update(update);
};

export const UPDATE_CHILD = 'UPDATE_CHILD';
export const updateChild = (uidCanvas, childNumber, index, value) => (dispatch, getState) => {
    dispatch({type: UPDATE_CHILD});
    let childData = getState().canvas[childNumber];
    //console.log('one', childData)
    childData.splice(index, 1, value);
    let update = {};
    update[`/canvases/${uidCanvas}/${childNumber}`] = childData;
    return firebaseDb.ref().update(update);
};