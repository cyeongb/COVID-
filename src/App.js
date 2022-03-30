import { FormControl, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  return (
    <div className="app">
      <div className="app__header">
        <h1>covid19 tracker!!</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="options">
            <MenuItem>option1</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + select input dropdown */}
      {/* Info Box 1 */}
      {/* Info Box 2 */}
      {/* Info Box 3 */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
