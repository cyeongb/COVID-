import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({}); //json object
  const [tableData, setTableData] = useState([]);

  // useEffect
  //world wide all data 가져오기
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => setCountryInfo(data));
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countryData = data.map((country) => ({
            name: country.country, //나라 이름 풀네임
            value: country.countryInfo.iso3, //나라 이름 약자 (3글자)
          }));
          const sortedData = sortData(data);
          console.log("sortedData > ", sortedData);
          setTableData(sortedData);
          setCountries(countryData);
        });
    };
    getCountriesData();
  }, []);

  //function
  const onCountryChange = async (e) => {
    const countryCode = e.target.value; // selected value

    setCountry(countryCode);
    // console.log("countryCode>>", countryCode);
    // console.log("country>>", country);

    // all 일때 : 각각 일 때
    const url =
      countryCode.value === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };
  console.log("countryInfo >", countryInfo);
  console.log("tableData >", tableData);

  return (
    <div className="app">
      {/* Header */}
      <div className="app__left">
        <div className="app__header">
          <h1>COVID19 TRACKER APP</h1>
          {/* Title + select input dropdown */}

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((countrys) => (
                <MenuItem value={countrys.value}>{countrys.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Info Boxes */}
        <div className="app__stats">
          <InfoBox
            title="Covid19  cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />

          <h3>Worldwide new Cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
