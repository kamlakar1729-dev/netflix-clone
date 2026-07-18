
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { addDoc,collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBYtf7SfkstjpnTFeKaH54DvE4jeLnFAgg",
  authDomain: "netflix-clone-c8af1.firebaseapp.com",
  projectId: "netflix-clone-c8af1",
  storageBucket: "netflix-clone-c8af1.firebasestorage.app",
  messagingSenderId: "142836321379",
  appId: "1:142836321379:web:9b198b717a85d267aafc56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const singup = async (name, email, password) => {
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password)
       const user = res.user;
       await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        toast.error(error.code.split('/')[1].split('-').join(' '), {
          position: "top-right",
          autoClose: 5000,      
        });
    }
}

const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.code.split('/')[1].split('-').join(' '), {
        position: "top-right",
        autoClose: 5000,
      });
    }
}

const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(error.code.split('/')[1].split('-').join(' '), {
        position: "top-right",
        autoClose: 5000,
      });
    }
}

export { auth, db, singup, login, logout };
