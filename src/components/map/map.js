import React from "react";

function Map(props) {
  return (
    <div>
      Local Information
      {console.log(props.location)}

{/* 
      <div className="map">
    <h2 className="map-h2">Come Visit Us At Our Campus</h2>

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  </div> */}

      {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24217.25918344841!2d-73.94789798229141!3d40.64846067767145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25ca1feb79989%3A0xf6d6b27d558e2dea!2sEast%20Flatbush%2C%20Brooklyn%2C%20NY%2C%20USA!5e0!3m2!1sen!2ssa!4v1634288442980!5m2!1sen!2ssa"
        width="330"
        height="200"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
      ></iframe> */}
    </div>
  );
}

export default Map;
