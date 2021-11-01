import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBa7XzPjXXtgntOgPY8rNEX_JAh5AeoZYo",
    authDomain: "proyectofinalprog3grupo8.firebaseapp.com",
    projectId: "proyectofinalprog3grupo8",
    storageBucket: "proyectofinalprog3grupo8.appspot.com",
    messagingSenderId: "347914840595",
    appId: "1:347914840595:web:f4b05d6c997132781b2de6"
};

app.initializeApp(firebaseConfig);

export const auth= firebase.auth()
export const storage= app.storage()
export const db= app.firestore()