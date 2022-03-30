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
    // 위 코드를 아래처럼 줄여서 표현할 수 있다.

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log("error : ", error);
  }
};
