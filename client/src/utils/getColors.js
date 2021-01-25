import { axiosWithAuth } from "./axiosWithAuth";

export const getColors = () => {
  return axiosWithAuth()
    .get("http://localhost:5000/api/colors")
    .then((res) => console.log(`Getting colors - ${res}`))
    .catch((err) => console.log(`Getting colors error - ${err}`));
};
