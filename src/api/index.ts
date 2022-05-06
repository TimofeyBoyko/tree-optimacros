import axios from "axios";

const getFiles = async () => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/gists/e1702c1ef26cddd006da989aa47d4f62`
    );

    const files = data.files;

    return files;
  } catch (e) {
    console.log(e);
  }
};

export { getFiles };
