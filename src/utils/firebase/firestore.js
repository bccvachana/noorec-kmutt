import { firestore, db } from "./firebase";
import { mockArticle } from "../../mockData";

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

export const addArticle = async (article) => {
  await db
    .collection("articles")
    .doc()
    .set({
      ...article,
      createdAt: firestore.Timestamp.now(),
      updatedAt: firestore.Timestamp.now(),
    });
};

export const updateArticle = async (articleId, article) => {
  await db
    .collection("articles")
    .doc(articleId)
    .update({
      ...article,
      updatedAt: firestore.Timestamp.now(),
    });
};

export const readArticle = async (setArticles) => {
  const doc = await db
    .collection("articles")
    .orderBy("createdAt", "desc")
    .get();
  const array = doc.docs.map((doc) => doc.data());
  console.log(array);
  setArticles(array);
};

export const snapshotArticle = async (setArticle) => {
  // let article;
  // db.collection("articles").onSnapshot((doc) => {
  //   doc.docs.map((doc) => {
  //     const data = doc.data();
  //     const { createdAt, updatedAt } = data;
  //     const articleId = doc.id;
  //     const content = JSON.parse(data.content);
  //     const checkImg = content.ops.find((element) => element.insert.image);
  //     const img = checkImg ? checkImg.insert.image : null;
  //     article = {
  //       ...article,
  //       [articleId]: {
  //         ...data,
  //         content: content,
  //         image: img,
  //         createdAt: createdAt.seconds,
  //         updatedAt: updatedAt.seconds,
  //       },
  //     };
  //     return null;
  //   });
  //   console.log(article);
  //   setArticle(article);
  // });
  setArticle(mockArticle);
};

export const deleteArticle = async (articleId) => {
  await db.collection("articles").doc(articleId).delete();
};
