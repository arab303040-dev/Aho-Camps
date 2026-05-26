const firebaseConfig = {
  apiKey: "AIzaSyB5dt0U2OO_U6nHVcOhUZjD6NZzIS4K5Po",
  authDomain: "aho-camps.firebaseapp.com",
  projectId: "aho-camps",
  storageBucket: "aho-camps.firebasestorage.app",
  messagingSenderId: "166507036895",
  appId: "1:166507036895:web:9f6aff4b5f925d1c1a296a"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
