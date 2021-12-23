import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";

function InterestList() {
  const state = useSelector((state) => {
    return state;
  });
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllLikedProperties();
    // eslint-disable-next-line
  }, []);

  const getAllLikedProperties = async () => {
    const Properties = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/interestList/userLikes/${state.signIn.userID}`
    );
    setProperties(Properties.data);
    console.log(Properties);
  };

  const goInside = (id) => {
    console.log(id);
    // navigate(`/profile/${id}`);
  };

  return (
    <div>
      {properties.length && (
        <>
          {properties.map((ele) => {
            return (
              <>
                <div className="property">
                  <h3
                    onClick={() => {
                      goInside(ele._id);
                    }}
                  >
                    {ele.onProperty.name}
                  </h3>
                </div>
              </>
            );
          })}
        </>
      )}
    </div>
  );
}

export default InterestList;
