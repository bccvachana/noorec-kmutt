import { firestore, db } from "./firebase";

export const addUserData = async (uid, data, profileImgUrl) => {
  const { firstName, lastName } = data;
  try {
    await db.collection("users").doc(uid).set({
      firstName: firstName,
      lastName: lastName,
      profileImgUrl: profileImgUrl,
      record: [],
      createdAt: firestore.Timestamp.now(),
      updatedAt: firestore.Timestamp.now(),
    });
    console.log("Add user successfully !!!");
  } catch (error) {
    throw error;
  }
};
