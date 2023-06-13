import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const AuthContext = React.createContext({
  user: {},
  loginWithGoogle: () => {},
  signup: () => {},
  login: () => {},
  logout: () => {},
  resetPassword: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    console.log(user);
    return unsubscribe;
  }, []);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user.displayName);
        const data = {
          email: user.email,
          display: user.displayName,
        };
        setDoc(doc(db, "users", auth.currentUser.uid), data);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const signup = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log("Account created!");
      })
      .catch((e) => {
        console.log(e.message);
        return;
      });

    const updatedData = { display: data.display, email: data.email };

    await setDoc(doc(db, "users", auth.currentUser.uid), updatedData);
  };

  const login = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log("Successfully login", auth.currentUser.uid);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const logout = async () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out!");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Email sent!");
      })
      .catch((e) => {
        console.log(e.message);
        // ..
      });
  };

  return (
    <AuthContext.Provider
      value={{
        loginWithGoogle: loginWithGoogle,
        user: user,
        signup: signup,
        login: login,
        logout: logout,
        resetPassword: resetPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
