import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Map from "../map/map";
import Scheduled from "./../scheduled/scheduled";
import { useSelector } from "react-redux";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { FaBath, FaRulerCombined } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import {
  BsWhatsapp,
  BsArrowRightCircleFill,
  BsArrowLeftCircleFill,
} from "react-icons/bs";
import { Stack, CircularProgress } from "@mui/material";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const Property = () => {
  let navigate = useNavigate();
  const id = useParams().id;
  const [property, setProperty] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
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

    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/interestList/check/${id}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    if (result.status === 201) setIsLiked(true);
    else {
      setIsLiked(false);
    }
  };

  // const person = (userId) => {
  //   navigate(`/profile/${userId}`);
  // };

  const like = async () => {
    if (state.signIn.token) {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/interestList/likeToggle`,
        { by: state.signIn.userID, onProperty: id },
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      if (result.status === 201) setIsLiked(true);
      else {
        setIsLiked(false);
      }
    } else {
      navigate("/logIn");
    }
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
  return (
    <>
      {property.length ? (
        <div className="contener">
          {/* images slideShow */}
          <div>
            <CarouselProvider
              className="CarouselProvider"
              naturalSlideWidth={50}
              naturalSlideHeight={50}
              interval={3000}
              isPlaying={true}
              totalSlides={property[0].imgArr.length}
            >
              <Slider>
                {property[0].imgArr &&
                  property[0].imgArr.map((ele, i) => {
                    return (
                      <Slide index={i} key={i}>
                        <img className="slideImg" alt="img" src={ele} />
                      </Slide>
                    );
                  })}
              </Slider>
              <ButtonBack className="moveBtn">
                <BsArrowLeftCircleFill />
              </ButtonBack>
              <ButtonNext className="moveBtn">
                <BsArrowRightCircleFill />
              </ButtonNext>
            </CarouselProvider>
          </div>

          {/* property details */}
          <div className="secondChild">
            <h1> {property[0].name} </h1>
            <h6> {property[0].describe} </h6>
            <h3 id="price">${property[0].price}</h3>
            <div className="relaDiv">
              <span className="icon1">
                <IoIosBed />
              </span>
              <p className="roomP">
                {property[0].propertyHighlights.room} Rooms{" "}
              </p>
            </div>
            <div className="relaDiv">
              <span className="icon2">
                <FaBath />
              </span>
              <p className="roomP">
                {property[0].propertyHighlights.bathroom} Bathrooms{" "}
              </p>
            </div>
            <div className="relaDiv">
              <span className="icon3">
                <FaRulerCombined />
              </span>
              <p className="roomP">
                {property[0].propertyHighlights.space} sqft{" "}
              </p>
            </div>

            {/* seller info */}
            {state.signIn.userID !== property[0].postedBy._id && (
              <>
                <h3> Seller info </h3>
                <div className="sellerInfo">
                  <div>
                    <img
                      className="sellerImg"
                      src={property[0].postedBy.img}
                      alt="img"
                    />
                  </div>
                  <div className="sellerData">
                    <p
                      className="SellerName"
                      // onClick={() => person(property[0].postedBy._id)}
                    >
                      {property[0].postedBy.username}
                    </p>
                    <span className="contact"> Contact seller : </span>
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
                </div>

                <div className="likesDiv">
                  <>
                    Saved it for later?
                    <span className="likes" onClick={like}>
                      {state.signIn.token ? (
                        <>{isLiked ? <IoHeartSharp /> : <IoHeartOutline />} </>
                      ) : (
                        <IoHeartOutline />
                      )}
                    </span>
                  </>
                </div>
              </>
            )}

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
          </div>
          <div>
            <Map location={property[0].location} />
          </div>
          <div>
            {/* the seller cant take an appointment if its the owner  */}
            {state.signIn.userID !== property[0].postedBy._id &&
              property[0].postedBy.Availability && (
                <>
                  <Scheduled
                    city={property[0].city}
                    sellerId={property[0].postedBy._id}
                    location={property[0].location}
                  />
                </>
              )}
          </div>
        </div>
      ) : (
        <div className="message">{message}</div>
      )}
    </>
  );
};

export default Property;
