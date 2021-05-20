import firebase from 'firebase'

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