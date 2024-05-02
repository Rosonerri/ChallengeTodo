import { connect } from "mongoose";

const URL: string = "mongodb://localhost:27017/simpleTodoDB";
export const dbConfig = async () => {
  try {
    return await connect(URL)
      .then(() => {
        console.log("DataBase Connected Successfully🌚🌚🌚");
      })
      .catch(() => {
        console.error();
      });
  } catch (error) {
    return error;
  }
};
