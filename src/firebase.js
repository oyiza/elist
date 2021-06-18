import firebase from 'firebase'

// TODO: should this be in git or hidden?
// youtube tutorial in case i want authentication enabled
// https://www.youtube.com/watch?v=O5QxNn6ET5c&ab_channel=TheNetNinja
// or the video here: https://firebase.google.com/docs/database/security
var firebaseApp = firebase.initializeApp({
    // Your web app's Firebase configuration
    apiKey: "AIzaSyBcErfAFrpORgul4Z3uVZi5Mp2-OGVgcBs",
    authDomain: "elist-e51fd.firebaseapp.com",
    projectId: "elist-e51fd",
    storageBucket: "elist-e51fd.appspot.com",
    messagingSenderId: "626657173070",
    appId: "1:626657173070:web:51fd7cd72285d812bfed1f",
});

var db = firebaseApp.firestore();

export { db };