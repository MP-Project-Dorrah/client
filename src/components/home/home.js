import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

function valuetext(value) {
  return `${value}°C`;
}

function Home() {
  const [search, setSearch] = useState("");
  const [value, setValue] = React.useState([0, 500000]);
  const [max, setMax] = useState(500000);
  const [min, setMin] = useState(0);

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllProperties();
    // eslint-disable-next-line
  }, [search]);

  const getAllProperties = async () => {
    const Propertie = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/property/searchProperty`,
      { name: search, maxPrice: max, minPrice: min }
    );
    setProperties(Propertie.data);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMax(newValue[1]);
    setMin(newValue[0]);
    // getAllProperties();
  };

  const setSearchFun = (value) => {
    console.log(value);
    if (value.length === 0) {
      setSearch("");
    } else {
      setSearch(value);
    }
    getAllProperties();
  };

  return (
    <div>
      <input
        placeholder="searh"
        onChange={(e) => setSearchFun(e.target.value)}
      />
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={100} /////
          max={500000} ///////
        />
      </Box>

      {properties.length && (
        <>
          {properties.map((ele) => {
            return (
              <>
                <div className="property">
                  <h3>{ele.name}</h3>
                  <h6>{ele.city}</h6>
                </div>
              </>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Home;
