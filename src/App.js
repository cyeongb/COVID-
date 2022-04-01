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
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countryData = data.map((country) => ({
            name: country.country, //나라 이름 풀네임
            value: country.countryInfo.iso3, //나라 이름 약자 (3글자)
          }));
          setCountries(countryData);
        });
    };
    getCountriesData();
  }, []);

  //function
  const onCountryChange = (e) => {
    const countryCode = e.target.value; // selected value

    setCountry(countryCode);
    console.log("countryCode>>", countryCode);
    console.log("country>>", country);
  };

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
          <InfoBox title="CotonaVirus cases" cases={142} total={2000} />
          <InfoBox title="Recovered" cases={142} total={2000} />
          <InfoBox title="Deaths" cases={142} total={2000} />
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}

          <h3>Worldwide new Cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
