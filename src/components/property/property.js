import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import Scheduled from "./../scheduled/scheduled";
import Map from "../map/map";

const Property = () => {
  let navigate = useNavigate();
  const id = useParams().id;
  const [property, setProperty] = useState([]);
  const [isLiked, setIsLiked] = useState(`${(<IoHeartSharp />)}`);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getProperty();
    // eslint-disable-next-line
  }, []);

  const getProperty = async () => {
    const property = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/property/oneProperty/${id}`
    );
    setProperty(property.data);
    console.log(property.data);

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
      {property && property.length && (
        <>
          {/* // img arr */}
          <img className="imggg" src={property[0].imgArr[0]} alt="img" />
          {property[0].name}
          <div className="post2">
            <h4>
              {state.signIn.token.length && (
                <span className="likes" onClick={like}>
                  {isLiked}
                </span>
              )}

              <span>{property[0].price}$</span>
              <div>
                Home Highlights
                {property[0].propertyHighlights.bathroom}
                <FaBath />
                {property[0].propertyHighlights.room}
                <IoIosBed />
              </div>
              <Map />
              <div>
                Description
                <h6> {property[0].describe} </h6>
              </div>
              {/* the seller cant take an appointment if its the owner  */}
              {state.signIn.userID !== property[0].postedBy._id && (
                <Scheduled city={property[0].city} />
              )}
            </h4>
            <div className="imgContener">
              <img className="imgg" src={property[0].postedBy.img} alt="img" />
            </div>
            <p onClick={() => person(property[0].postedBy._id)} className="by">
              {property[0].postedBy.username}
            </p>
          </div>

          {property.length &&
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
            )}
        </>
      )}
    </div>
  );
};

export default Property;
