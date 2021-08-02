import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "https://fierce-ravine-92328.herokuapp.com" : process.env.REACT_APP_BASE_URL,
  responseType: "json",
});

//This is for change folder names.
