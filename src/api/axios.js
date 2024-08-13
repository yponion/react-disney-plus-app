import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "ddb089a1b23f1dcf5a9a72b4cca93c26",
    language: "ko-KR",
  },
});

export default instance;
