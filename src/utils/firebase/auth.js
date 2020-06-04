import { auth } from "./firebase";
import { uploadProfileImg } from "./storage";
import { addUserData } from "./firestore";

export const signUp = async (data, profileImg) => {
  const { email, password, firstName } = data;
  await auth.createUserWithEmailAndPassword(email, password);
  const user = auth.currentUser;
  await user.updateProfile({
    displayName: firstName,
  });
  let profileImgUrl = "";
  if (profileImg) {
    profileImgUrl = await uploadProfileImg(profileImg);
  }
  await addUserData(user.uid, data, profileImgUrl);
  await user.sendEmailVerification();
  console.log("sent verification email");
  auth.signOut();
};

export const checkUserExist = (email) => {
  return auth.fetchSignInMethodsForEmail(email);
};

export const verifyEmail = async (code) => {
  await auth.applyActionCode(code);
};

export const signIn = async (email, password) => {
  await auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  auth.signOut();
};

export const checkUser = (setUser, setIsSignIn, setIsVerified) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      setIsSignIn(true);
      setIsVerified(user.emailVerified);
      window.sessionStorage.setItem("norecIsSignIn", true);
      window.sessionStorage.setItem("norecIsVerified", user.emailVerified);
    } else {
      setUser(null);
      setIsSignIn(null);
      setIsVerified(null);
      window.sessionStorage.removeItem("norecIsSignIn");
      window.sessionStorage.removeItem("norecIsVerified");
    }
  });
};

export const resendVerifyEmail = async () => {
  const user = auth.currentUser;
  await user.sendEmailVerification();
  console.log("sent verification email");
  auth.signOut();
};

export const sendPasswordResetEmail = async (email) => {
  await auth.sendPasswordResetEmail(email);
  console.log("sent reset password email");
};

export const confirmResetPassword = async (code, password) => {
  await auth.confirmPasswordReset(code, password);
  console.log("reset password");
};
