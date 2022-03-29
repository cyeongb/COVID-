// fetch data
import axios from "axios";
const url = "https://covid19.mathdro.id/api";

export const fetchData = async () => {
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);

    // const modifiedData = {
    //   confirmed: confirmed,
    //   recovered: recovered,
    //   deaths: deaths,
    //   lastupdate: lastupdate,
    // };

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log("error : ", error);
  }
};
