import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

export const uploadProfileImg = async (imgUrl) => {
  try {
    const profileImgName = uuidv4();
    const profileImgRef = storage.ref().child(`profileImg/${profileImgName}`);
    await profileImgRef.putString(imgUrl, "data_url");
    const profileImgUrl = await profileImgRef.getDownloadURL();
    return { profileImgName: profileImgName, profileImgUrl: profileImgUrl };
  } catch (error) {
    throw error;
  }
};

export const deleteProfileImg = async (fileName) => {
  const profileImgRef = storage.ref().child(`profileImg/${fileName}`);
  await profileImgRef.delete();
};
