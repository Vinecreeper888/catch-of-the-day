import Rebase from 're-base'; //react- firebase to mirror states
import firebase from 'firebase';

//configure
const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyCyHAWsPRAVAl08_c4yRdyj6sMC3BP5Wfc",
        authDomain: "catch-of-the-day-sid-7717a.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-sid-7717a-default-rtdb.firebaseio.com",
    }
);

//create rebase
const base = Rebase.createClass(firebaseApp.database());

//named export
export {firebaseApp}

//default export
export default base;