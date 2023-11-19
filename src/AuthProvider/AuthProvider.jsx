import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
export const AuthContext = createContext(null);
import {
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import axios from "axios";
import { app } from "../firebase/firebase.config";
import { baseURL } from "../hooks/useAxiosSecure";
export const cookies = new Cookies();
export const cookiesOptions = {
  secure: true,
};
// TODO make it true

const githubProvider = new GithubAuthProvider();
export const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nevActive, setNevActive] = useState("home");
  const [controlCart, setControlCart] = useState(false);
  const [updateProfileControl, setUpdateProfileControl] = useState(true);
  const [NavIsOpen, setNavIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const NavToggleDrawer = () => {
    setNavIsOpen((prevState) => !prevState);
  };
  const [Favorite, setFavorite] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInGoogle = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const signInGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const handleTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        axios
          .post(baseURL + "/login-user", {
            email: currentUser.email,
          })
          .then((res) => {
            if (res?.data?.accessToken) {
              setLoading(false);
              setReload(false);
              cookies.set("accessToken", res.data.accessToken, cookiesOptions);
            }
          });
      }

      setLoading(false);
      setReload(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const ProfileUpdate = (name, PhotoUrl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: PhotoUrl,
    });
  };

  const authInfo = {
    user,
    signUp,
    signInGoogle,
    signInGithub,
    login,
    logout,
    loading,
    ProfileUpdate,
    auth,
    setFavorite,
    Favorite,
    setReload,
    isOpen,
    setIsOpen,
    toggleDrawer,
    NavToggleDrawer,
    NavIsOpen,
    setNavIsOpen,
    nevActive,
    setNevActive,
    handleTop,
    controlCart,
    setControlCart,
    updateProfileControl,
    setUpdateProfileControl,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
