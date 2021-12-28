import React from "react";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./style.css";
import axios from "axios";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Map(props) {
  console.log(props.location);
  const getdata = async () => {
    const result = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyC4JqBOR-km_LYFHF1rW7fWG-vrholjOZQ`
    );
    console.log(result);
  };
  getdata();

  const newMap = props.location.slice(
    props.location.indexOf("@") + 1,
    props.location.indexOf(",")
  );
  const newMap2 = props.location.slice(
    props.location.indexOf(",") + 1,
    props.location.indexOf("data")
  );
  const newMap22 = newMap2.slice(0, newMap2.length - 5);
  console.log(newMap22);
  const center = {
    lat: Number(newMap),
    lng: Number(newMap22),
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };
  return (
    <div className="mapContainer">
     <h3> local information </h3>
    <div   style={{ height: "40vh", width: "94%"  , borderRadius:"50%"}}>
  
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
  );
}

export default React.memo(Map);
