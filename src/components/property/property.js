import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { FaBath, FaRulerCombined } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { BsWhatsapp } from "react-icons/bs";
import Scheduled from "./../scheduled/scheduled";
import Map from "../map/map";
import { MdEmail } from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Property = () => {
  let navigate = useNavigate();
  const id = useParams().id;
  const [property, setProperty] = useState([]);
  const [isLiked, setIsLiked] = useState(`${(<IoHeartSharp />)}`);
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getProperty();
    // eslint-disable-next-line
  }, []);

  const getProperty = async () => {
    setMessage(
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    );
    const property = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/property/oneProperty/${id}`
    );
    setProperty(property.data);
    setMessage("");
    console.log(property.data[0].postedBy.Availability);

    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/interestList/check/${id}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    if (result.status === 201) setIsLiked(<IoHeartSharp />);
    else {
      setIsLiked(<IoHeartOutline />);
    }
  };

  const person = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const like = async () => {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/interestList/likeToggle`,
      { by: state.signIn.userID, onProperty: id },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    if (result.status === 201) setIsLiked(<IoHeartSharp />);
    else {
      setIsLiked(<IoHeartOutline />);
    }
    // getProperty();
  };

  const deleteProperty = async (propertyId) => {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/property/delete`,
      { _id: propertyId },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    if (result) {
      navigate(-1);
    }
  };
  // اذا كان السيلرر هو صاحب البروبرتي مايطلع له حجز موعد
  //
  return (
    <div className="contener">
      {property && property.length ? (
        <>
          <div className="propertyContener">
            <div className="anim">
              <Carousel
                className="carousel"
                autoPlay={true}
                infiniteLoop={true}
                interval={2000}
                // showStatus={false}
                thumbWidth={100}
                showIndicators={false}
                showThumbs={false}
                dynamicHeight={false}
                labels={true}
              >
                {property[0].imgArr &&
                  property[0].imgArr.map((ele, i) => {
                    return (
                      <div className="imgContener" key={i}>
                        <img alt="img" className="propertyImges" src={ele} />
                      </div>
                    );
                  })}
              </Carousel>

              <span className="price">{property[0].price}$</span>
              {state.signIn.token.length ? (
                <span className="likes" onClick={like}>
                  {isLiked}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* // img arr */}
          {/* <span className="price">{property[0].price}$</span> */}

          <div className="post2">
            <h1> {property[0].name} </h1>
            <h4>
              <div className="describe">
                <h6> {property[0].describe} </h6>
              </div>
              <br />
              Home Highlights:
              <div className="homeHighlights">
                <div className="highlight">
                  <span>
                    <IoIosBed />
                  </span>
                  <p> {property[0].propertyHighlights.room} Rooms </p>
                  <span className="secondChild">
                    <FaBath />
                  </span>
                  <p> {property[0].propertyHighlights.bathroom} Bathrooms </p>
                  <span className="thirdChild">
                    <FaRulerCombined />
                  </span>
                  <p> {property[0].propertyHighlights.space}sqft </p>
                </div>
              </div>
              {state.signIn.userID !== property[0].postedBy._id && (
                <div className="sellerInfoDiv">
                  seller info
                  <div className="imgContener">
                    <img
                      className="imgg"
                      src={property[0].postedBy.img}
                      alt="img"
                    />
                  </div>
                  <p
                    className="SellerName"
                    onClick={() => person(property[0].postedBy._id)}
                  >
                    {property[0].postedBy.username}
                  </p>
                  <span className="contact"> Contact seller : </span>
                  {/* WhatsApp icon */}
                  <a
                    className="WhatsApp"
                    href={`https://wa.me/${property[0].postedBy.phonNumber}`}
                    // class="whatsapp_float"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsWhatsapp />
                  </a>
                  <a
                    className="email"
                    href={`mailto:${property[0].postedBy.email}`}
                  >
                    <MdEmail />
                  </a>
                </div>
              )}
              <Map location={property[0].location} />
              {/* the seller cant take an appointment if its the owner  */}
              {state.signIn.userID !== property[0].postedBy._id &&
                property[0].postedBy.Availability && (
                  <>
                    {state.signIn.token.length !== 0 ? (
                      <Scheduled
                        city={property[0].city}
                        sellerId={property[0].postedBy._id}
                        location={property[0].location}
                      />
                    ) : (
                      <>
                        <br />
                      </>
                    )}
                  </>
                )}
            </h4>
          </div>

          {property.length ? (
            (state.signIn.userID === property[0].postedBy._id ||
              state.signIn.role === "61c05b910cca090670f00827") && ( // admin or  property owner
              <div className="deleteBtnContener">
                <button
                  onClick={() => {
                    deleteProperty(property[0]._id);
                  }}
                  className="deleteBtn"
                >
                  Delete proprty
                </button>
              </div>
            )
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}

      <div className="messageee"> {message} </div>
    </div>
  );
};

export default Property;
