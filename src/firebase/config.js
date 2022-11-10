import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCpNWMccXekVuvCvf8tYg2ySIYVipIiNlg",
    authDomain: "proyfinal-p3.firebaseapp.com",
    projectId: "proyfinal-p3",
    storageBucket: "proyfinal-p3.appspot.com",
    messagingSenderId: "438680228019",
    appId: "1:438680228019:web:928eff45fc05758518e0c6"
};

app. initializeApp(firebaseConfig) ;

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
