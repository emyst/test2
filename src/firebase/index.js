import config from './config';
import * as firebase from 'firebase';

export const firebaseApp = firebase.initializeApp(config);
export const firebaseAuth = firebase.auth();
export const firebaseDb = firebase.database();
