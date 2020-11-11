import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


let firebaseConfig = {
    apiKey: "AIzaSyBPH5ujHYBmp-dFivX-22WXC2u1h1AUP8c",
    authDomain: "testando-141fa.firebaseapp.com",
    databaseURL: "https://testando-141fa.firebaseio.com",
    projectId: "testando-141fa",
    storageBucket: "testando-141fa.appspot.com",
    messagingSenderId: "418298370112",
    appId: "1:418298370112:web:5f73eabb9d8f2ed3a727a5",
    measurementId: "G-V0S05QF7W8"
  };
  // Initialize Firebase



class Firebase {
    constructor(){
        app.initializeApp(firebaseConfig);

        this.app = app.database();
        this.storage = app.storage();
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    async register(nome,email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }
    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }
    
    async getUserName(callback){
      if(!app.auth().currentUser){
        return null;
      }
      const uid = app.auth().currentUser.uid
      await app.database().ref('usuarios').child(uid)
      .once('value').then(callback);
    }

    logout(){
        return app.auth().signOut();
    }
}

export default new Firebase();
