//파이어베이스 임포트 설정
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class AuthService {

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebaseApp.auth().signInWithPopup(provider);
  }

  logout() { firebase.auth().signOut(); }

  onAuth(cf) { firebase.auth().onAuthStateChanged(e => { cf(e); console.log(e)})  }

  removeCard(userId,idToday, card) {
    firebaseApp.database().ref(`${userId}/${idToday}/${card}`).remove();
  }

  saveCard(userId,idToday, Datas) {
    firebaseApp.database().ref(`${userId}/${idToday}`).set(Datas);
  }

  sync(userId,idToday, call) {
    const ref = firebaseApp.database().ref(`${userId}/${idToday}`)
    ref.on('value', (p) => {
      const data = p.val();
      data && call(data);
    });
    return () => ref.off();
  }

}
export default AuthService;  