import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAtS7SqthQa2YbMHYkXPNbqpffp_8US9Vk",
    authDomain: "elysm-db.firebaseapp.com",
    databaseURL: "https://elysm-db.firebaseio.com",
    projectId: "elysm-db",
    storageBucket: "elysm-db.appspot.com",
    messagingSenderId: "618543999051",
    appId: "1:618543999051:web:d9bfa7ae190e2df03345ce",
    measurementId: "G-JN58T3WDSE"
  };

  export const createUserProfileDocument = async (userAuth, addiitonalData ) => {
  	if (!userAuth) return;

  	const userRef = firestore.doc(`users/${userAuth.uid}`);

  	const snapShot= await userRef.get();

  	if(!snapShot.exists) {
  		const { displayName, email} = userAuth;
  		const createdAt = new Date();

  		try {
  			await userRef.set({
  				displayName,
  				email,
  				createdAt,
  			})	
  		} catch (error) {
  			console.log('Error', error.message);
  		}
  	}

  	return userRef; 
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;