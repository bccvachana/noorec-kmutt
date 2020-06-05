import { firestore, db } from "./firebase";

export const addUserData = async (uid, data, profileImgUrl) => {
  const { firstName, lastName } = data;
  await db.collection("users").doc(uid).set({
    firstName: firstName,
    lastName: lastName,
    profileImgUrl: profileImgUrl,
    record: [],
    createdAt: firestore.Timestamp.now(),
    updatedAt: firestore.Timestamp.now(),
  });
  console.log("Add user successfully !!!");
};

export const readUserData = async (uid, setUserData) => {
  const docRef = db.collection("users").doc(uid);
  const doc = await docRef.get();
  setUserData(doc.exists ? doc.data() : null);
};
