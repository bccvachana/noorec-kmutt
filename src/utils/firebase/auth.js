import { auth } from "./firebase";
import { uploadProfileImg, deleteProfileImg } from "./storage";
import { addUserData, updateUserData } from "./firestore";

export const signUp = async (data, profileImg) => {
  const { email, password, firstName } = data;
  await auth.createUserWithEmailAndPassword(email, password);
  const user = auth.currentUser;
  await user.updateProfile({
    displayName: firstName,
  });
  let profileImgObject = null;
  if (profileImg) {
    profileImgObject = await uploadProfileImg(profileImg);
  }
  await addUserData(user.uid, data, profileImgObject);
  await user.sendEmailVerification();
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

export const checkUser = (setUser, setUserState) => {
  auth.onAuthStateChanged((user) => {
    let userState;
    if (user) {
      setUser(user);
      if (user.uid === "nFe6SOGeOGXPWJKS2YPjVO7DApi1") {
        userState = "admin";
      } else userState = user.emailVerified ? "verified" : "notVerified";
    } else {
      setUser(null);
      userState = "notSignIn";
    }
    setUserState(userState);
    window.sessionStorage.setItem("norecUserState", userState);
  });
};

export const resendVerifyEmail = async () => {
  const user = auth.currentUser;
  await user.sendEmailVerification();
  auth.signOut();
};

export const sendPasswordResetEmail = async (email) => {
  await auth.sendPasswordResetEmail(email);
};

export const confirmResetPassword = async (code, password) => {
  await auth.confirmPasswordReset(code, password);
};

export const editProfile = async (data, profileImg, profileImgName) => {
  const { firstName } = data;
  const user = auth.currentUser;
  await user.updateProfile({
    displayName: firstName,
  });
  let profileImgObject = null;
  if (profileImg) {
    if (profileImg) {
      profileImgObject = await uploadProfileImg(profileImg);
      if (profileImgName) await deleteProfileImg(profileImgName);
    }
  }
  await updateUserData(user.uid, data, profileImgObject);
};
