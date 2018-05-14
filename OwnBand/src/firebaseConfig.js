
import Firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDJkGBa8mZ8HvsV9qdQPRzHwpGPH6a4fiI",
    authDomain: "vuefirebasee.firebaseapp.com",
    databaseURL: "https://vuefirebasee.firebaseio.com",
    projectId: "vuefirebasee",
    storageBucket: "vuefirebasee.appspot.com",
    messagingSenderId: "51641180208"
};

const firebaseApp = Firebase.initializeApp(config)
const db = firebaseApp.database()


export const storage = firebaseApp.storage();
export const mydb = firebaseApp.database()
export const userRef = db.ref('users')
export const bandRef = db.ref('bands')
export const dbAuth = firebaseApp.auth()
