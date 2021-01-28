import firebase from 'firebase/app'
import "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();

export const signInWithGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider()

    return new Promise((resolve, reject) => {
        auth.signInWithPopup(provider).then((res) => {
            // console.log(res.user.displayName)
            // console.log(res.user.email)
            // console.log(res.user.phoneNumber)
            // console.log(res.user.photoURL)

            resolve(res);
        }).catch((err) => {
            reject(err)
        })
    })
}

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    return new Promise((resolve, reject) => {
        auth.signInWithPopup(provider).then((res) => {
            // console.log(res.user.displayName)
            // console.log(res.user.email)
            // console.log(res.user.phoneNumber)
            // console.log(res.user.photoURL)

            resolve(res);
        }).catch((err) => {
            reject(err)
        })
    })
}

export const signInWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider()

    return new Promise((resolve, reject) => {
        auth.signInWithPopup(provider).then((res) => {
            // console.log(res.user.displayName)
            // console.log(res.user.email)
            // console.log(res.user.phoneNumber)
            // console.log(res.user.photoURL)

            resolve(res);
        }).catch((err) => {
            reject(err)
        })
    })
}

export const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider()

    return new Promise((resolve, reject) => {
        auth.signInWithPopup(provider).then((res) => {
            // console.log(res.user.displayName)
            // console.log(res.user.email)
            // console.log(res.user.phoneNumber)
            // console.log(res.user.photoURL)

            resolve(res.user);
        }).catch((err) => {
            reject(err)
        })
    })
}
