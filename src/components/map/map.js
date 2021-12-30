import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./style.css";
import axios from "axios";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Map(props) {
  const [MapSort, setMapSort] = useState("map");
  const [MapResult, setMapResult] = useState([]);
  const [isSelectedRes, setIsSelectedRes] = useState(false);
  const [isSelectedSch, setIsSelectedResSch] = useState(false);
  const [isSelectedMap, setIsSelectedMap] = useState(true);
  const [isSelectedGym, setIsSelectedGym] = useState(false);

  // console.log(props.location);
  const newMap = props.location.slice(
    props.location.indexOf("@") + 1,
    props.location.indexOf(",")
  );
  console.log(newMap);

  const newMap2 = props.location.slice(
    props.location.indexOf(",") + 1,
    props.location.indexOf("data")
  );
  const newMap22 = newMap2.slice(0, newMap2.length - 5);
  console.log(newMap22);

  useEffect(() => {
    getdata();
  }, [MapSort]);

  const getdata = async () => {
    try {
      // lat, lng ,  sortBy
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/property/mapSort`,
        {
          lat: newMap,
          lng: newMap22,
          sortBy: MapSort, //////////////
        }
      );
      setMapResult(result.data.results);
      console.log("Map", result.data.results);
    } catch (error) {
      console.log("map error", error);
    }
  };

  // console.log(newMap22);
  const center = {
    lat: Number(newMap),
    lng: Number(newMap22),
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  const getdataa = () => {
    setMapSort("restaurant");
    setIsSelectedRes(true);
    setIsSelectedResSch(false);
    setIsSelectedMap(false);
    setIsSelectedGym(false);
  };
  const getdata2 = () => {
    setMapSort("school");
    setIsSelectedResSch(true);
    setIsSelectedRes(false);
    setIsSelectedMap(false);
    setIsSelectedGym(false);
  };
  const getdata3 = () => {
    setMapSort("map");
    setIsSelectedMap(true);
    setIsSelectedResSch(false);
    setIsSelectedRes(false);
    setIsSelectedGym(false);
  };
  const getdata4 = () => {
    setMapSort("gym");
    setIsSelectedMap(false);
    setIsSelectedResSch(false);
    setIsSelectedRes(false);
    setIsSelectedGym(true);
  };

  return (
    <div className="mapCom">
      <h3> Local information </h3>
      <button
        style={{
          backgroundColor: isSelectedMap
            ? "rgba(218, 199, 199, 0.424)"
            : "white",
          borderStyle: isSelectedSch ? "red" : "none",
        }}
        onClick={getdata3}
      >
        Map
      </button>
      <button
        style={{
          backgroundColor: isSelectedRes
            ? "rgba(218, 199, 199, 0.424)"
            : "white",
          borderStyle: isSelectedSch ? "red" : "none",
        }}
        onClick={getdataa}
      >
        Resturant
      </button>
      <button
        style={{
          backgroundColor: isSelectedSch
            ? "rgba(218, 199, 199, 0.424)"
            : "white",
          borderStyle: isSelectedSch ? "red" : "none",
        }}
        onClick={getdata2}
      >
        School
      </button>

      <button
        style={{
          backgroundColor: isSelectedGym
            ? "rgba(218, 199, 199, 0.424)"
            : "white",
          borderStyle: isSelectedSch ? "red" : "none",
        }}
        onClick={getdata4}
      >
        Gym
      </button>

      {MapSort === "map" && (
        <div className="mapContainer">
          <div
            className="mapContainer"
            style={{ height: "40vh", width: "94%" }}
          >
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
              defaultCenter={center}
              defaultZoom={11}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
              <AnyReactComponent
                lat={center.lat}
                lng={center.lng}
                text={<FaMapMarkerAlt className="mapIcon" />}
              />
            </GoogleMapReact>
          </div>
        </div>
      )}

      {MapResult.length && MapSort !== "map" && (
        <div className="mapContainer">
          <div style={{ height: "40vh", width: "94%", borderRadius: "50%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
              defaultCenter={center}
              defaultZoom={11}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
              {MapResult.map((ele) => {
                console.log(ele.geometry.location.lat);
                console.log(ele.geometry.location.lng);
                return (
                  <AnyReactComponent
                    lat={ele.geometry.location.lat}
                    lng={ele.geometry.location.lng}
                    text={
                      <>
                        <FaMapMarkerAlt className="mapIcon" />{" "}
                        <h3> {ele.name}</h3>{" "}
                      </>
                    }
                  />
                );
              })}
            </GoogleMapReact>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Map);
