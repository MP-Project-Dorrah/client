import React, { useState, useEffect } from "react";
import { porjectSto } from "../components/firebase/config";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";

const UseStorage = (props) => {
  const [url, setUrl] = useState("");
  const [flag, setFlag] = useState(false)
console.log(url,"here <=====");
  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    const result = []
    props.imgP.map((ele) => {
      console.log(ele,"ele");
      const storageRef = porjectSto.ref(ele.name);
       storageRef.put(ele).on("state_changed", async () => {
        const URL = await storageRef.getDownloadURL();
        result.push(URL)
      });
    });
    console.log(result);
    setUrl([...result]);
    setFlag(true)
    // eslint-disable-next-line
  }, []);
  const postIt = async () => {
    console.log(url);
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/property/create`,
      {
        imgArr: url,
        describe: props.describe,
        postedBy: props.postedBy,
        name: props.name,
        price: props.price,
        city: props.city,
        location : props.location,
        propertyHighlights: { room: props.rooms, bathroom: props.bathrooms },
      },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    // props.rerender();
    // props.handleC();
  };

  return (
    <>
      {url && url.length === props.imgP.length && (
        <>
          {/* {url.map((ele) => {
            // console.log(ele, "url ele");
            return <img className="downloadedImg" src={ele} alt="img" />;
          })} */}
        </>
      )}
      {console.log(url.length,props.imgP.length)}
      {flag && flag? (
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
