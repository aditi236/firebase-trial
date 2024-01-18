import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/firestore'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';




const app = firebase.initializeApp({
    apiKey: "AIzaSyA80ArSEJe7L_w_ntcgmNSIvtTYuWIagHw",
    authDomain: "auth-development-85126.firebaseapp.com",
    projectId: "auth-development-85126",
    storageBucket: "auth-development-85126.appspot.com",
    messagingSenderId: "981071185817",
    appId: "1:981071185817:web:aa986fb73261c1931db508"
})
const auth = app.auth()
const db = getFirestore()
export { auth, db, collection, doc, setDoc };
export default app