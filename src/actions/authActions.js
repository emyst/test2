import {
    firebaseDb,
    firebaseAuth,
    fb
} from '../firebase';

/**
 * Return curent user or null
 * @returns {firebase.User | null}
 */
export const getFirebaseCurrentUser = () => firebaseAuth.currentUser;

export const SIGN_IN_EMAIL = 'SIGN_IN_EMAIL';

export const signupEmail = (email = 'dev.test@gmail.com', password = 'ret563748') => {
    return dispatch=> {

        // var credential = fb.auth.EmailAuthProvider.credential(email, password);
        //
        // firebaseAuth.currentUser.linkWithCredential(credential).then(function(user) {
        //     console.log("Account linking success", user);
        //     dispatch({type: SIGN_IN_EMAIL, payload: user});
        // }, function(error) {
        //     console.log("Account linking error", error);
        // });

        firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            firebaseDb.ref(`users/${response.uid}/uid`).set(response.uid);

            console.log(response);
            dispatch({type: SIGN_IN_EMAIL, payload: response});

        })
        .catch(function (error) {
            console.log('!!Error: ', error);
        });
}
};

export const SIGN_IN = 'SIGN_IN';
export const signIn = () => {
    return dispatch => {
        dispatch({type: SIGN_IN});
        firebaseAuth.signInAnonymously()
            .then(response => {
                firebaseDb.ref(`users/${response.uid}/uid`).set(response.uid);
                //console.log(response.uid, response.isAnonymous);
            })
            .catch(function (error) {
                // Handle Errors here.
                // let errorCode = error.code;
                // let errorMessage = error.message;
                // ...
            });
    }
};

export const CHECK_AUTH = 'CHECK_AUTH';

export const checkAuth = () => (dispatch, getState) => {
    firebaseAuth.onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // let users = getState().users;
            // let isAnonymous = user.isAnonymous;
            // let uid = user.uid;
            //console.log('isAnonymous', users, isAnonymous, uid)
            dispatch({type: CHECK_AUTH, payload: user});
        } else {
            // User is signed out.
            // ...
        }
        // ...
    });
};


export const USER_INVITED = 'USER_INVITED';
export const USER_NOT_INVITED = 'USER_NOT_INVITED';

export const inviteUser = (projectId, userEmail) => (dispatch, getState) =>{

   dispatch({type: USER_INVITED, payload:  true });
};

export const ON_SUBSCRIBE_CURRENT_USERS = 'ON_SUBSCRIBE_CURRENT_USERS';

export const onSubscribeUserData = () => (dispatch, getState) => {
    let uidUser = getState().auth.user.uid;
    //console.log('uidUser', uidUser)
    firebaseDb.ref(`/users/${uidUser}`).on('value', snap => {
        const currentUserData = snap.val();
        // console.group('onSubscribeUserData', currentUserData);
        //console.log('currentUserData', currentUserData);
        if (currentUserData !== null) {
            dispatch({type: ON_SUBSCRIBE_CURRENT_USERS, payload: currentUserData});
            if (!currentUserData.currentCanvas) {
                let canvasData = {
                    author: uidUser,
                    isShared: false,
                    canEdit: false
                };
                // Get a key for a new Canvas.
                let currentCanvasKey = firebaseDb.ref().child('canvases').push().key;
                //console.log('currentCanvasKey', currentCanvasKey);

                // Write the new canvas's data simultaneously in the canvases list.
                let updates = {};
                updates[`/canvases/${currentCanvasKey}`] = canvasData;
                updates[`/users/${uidUser}/currentCanvas`] = {currentCanvasKey};

                return firebaseDb.ref().update(updates);
            }
        } else {
        }

    });
};

export const ON_SUBSCRIBE_USERS = 'ON_SUBSCRIBE_USERS';

export const onSubscribeUsers = () => (dispatch, getState) => {
    firebaseDb.ref(`/users`).on('value', snap => {
        const usersData = snap.val();
        //console.log('value', usersData);
        dispatch({type: ON_SUBSCRIBE_USERS, payload: usersData});
    });
};
