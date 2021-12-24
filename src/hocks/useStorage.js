import React, { useState, useEffect } from "react";
import { porjectSto } from "../components/firebase/config";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";

const UseStorage = (props) => {
  const [url, setUrl] = useState([]);

  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    props.imgP.map((ele) => {
      const storageRef = porjectSto.ref(ele.name);
       storageRef.put(ele).on("state_changed", async () => {
        const URL = await storageRef.getDownloadURL();
        setUrl((prevSate) => [...prevSate, URL]);
      });
    });

    // eslint-disable-next-line
  }, []);
  const postIt = async () => {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/property/create`,
      {
        imgArr: url,
        describe: props.describe,
        postedBy: props.postedBy,
        name: props.name,
        price: props.price,
        city: props.city,
        propertyHighlights: { room: props.rooms, bathroom: props.bathrooms },
      },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    props.rerender();
    props.handleC();
  };

  return (
    <>
      {/* {url && url.length === props.imgP.length && (
        <>
          {url.map((ele) => {
            console.log(ele, "url ele");
            return <img className="downloadedImg" src={ele} />;
          })}
        </>
      )} */}
      {url.length === props.imgP.length ? (
        <h1>
          <button
            className="PostItt"
            onClick={() => {
              postIt();
            }}
          >
            post
          </button>
        </h1>
      ) : (
        <h4 className="loading">Loading ...</h4>
      )}
    </>
  );
};

export default UseStorage;
