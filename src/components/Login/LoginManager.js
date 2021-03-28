import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
}
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const handleGoogleSignIn = () => {
    return firebase.auth().signInWithPopup(googleProvider)
    .then((result) => {
      
      const{displayName, email, photoURL} = result.user;
      console.log(result);
      console.log(displayName, email, photoURL);
      const signedInUser = {
        isSIgned: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      }
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })

  }

export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then((result) => {
      const signedOutUser = {
        isSIgned: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false,
      }
      return signedOutUser;
      
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })

  }

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in 
      // var user = userCredential.user;
      // ...
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      upddateUserName(name);
      verifyEmail();
      console.log('email sent');
      return newUserInfo;

      
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      // var user = userCredential.user;
      // ...
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}



const upddateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function() {
      // Update successful.
      console.log('Updated')
      console.log(user.name)
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
  } 


const verifyEmail = () => {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
    }


export const resetPassword = (email) => {
  var auth = firebase.auth();
  auth.sendPasswordResetEmail(email).then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
}