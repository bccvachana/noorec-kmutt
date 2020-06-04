import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

export const uploadProfileImg = async (imgUrl) => {
  try {
    const profileImgRef = storage.ref().child(`profileImg/${uuidv4()}`);
    await profileImgRef.putString(imgUrl, "data_url");
    const url = await profileImgRef.getDownloadURL();
    return url;
  } catch (error) {
    throw error;
  }
};
