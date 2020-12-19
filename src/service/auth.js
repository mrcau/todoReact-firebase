//파이어베이스 임포트 설정
import firebase from 'firebase';
const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:process.env.REACT_APP_FIREBASE_DB_URL,
  projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
const firebaseApp= firebase.initializeApp(firebaseConfig);

class AuthService {
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebaseApp.auth().signInWithPopup(provider);
  }
  logout() {
    firebase.auth().signOut();
  }
  onAuth(cf) {
    firebase.auth().onAuthStateChanged(e=> { cf(e); }) 
  }

  saveCard(userId,Datas){
    firebaseApp.database().ref(`${userId}/cards`).set(Datas);
  }
  removeCard(userId,card){
    firebaseApp.database().ref(`${userId}/cards/${card.id}`).remove();
  }
  sync(userId,onUpdate){
    const ref = firebaseApp.database().ref(`${userId}/cards`);
    ref.on('value',snapshot=>{
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }

  }

export default AuthService;  