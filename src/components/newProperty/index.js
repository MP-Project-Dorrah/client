import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import axios from "axios";
import { Button, Modal, Box, Typography } from "@mui/material";
import { storage } from "../../firebase";
import { IoIosArrowRoundForward } from "react-icons/io";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function NewProperty(props) {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  // eslint-disable-next-line
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [city, setCity] = useState("");
  const [bathrooms, setBathrooms] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [describe, setDescribe] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const state = useSelector((state) => {
    return state;
  });

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    setMessage("Loading...");
    const promises = [];
    // eslint-disable-next-line
    images.map((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        setMessage("");
      })
      .catch((err) => console.log(err));
  };

  console.log("images: ", images);
  console.log("urls", urls);

  const postIt = async () => {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/property/create`,
      {
        imgArr: urls,
        describe,
        postedBy: state.signIn.userID,
        name,
        price,
        city,
        location,
        propertyHighlights: { room: rooms, bathroom: bathrooms },
      },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    if (result.status === 200) {
      console.log("done");
      props.rerender();
      handleClose();
    } else {
      console.log("error");
    }
  };
  return (
    <div id="newPropertyC">
      <div className="newPostBtn">
        <Button
          onClick={() => {
            handleOpen();
          }}
        >
          <span> + Add a new property </span>
        </Button>
      </div>
      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="NewPostModel">
          <Box sx={style} className="box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <span className="newPostText"> Add a new property </span>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <label htmlFor="filePicker" className="UploadImgesLable">
                Choose images
              </label>

              <input
                id="filePicker"
                style={{ visibility: "hidden", width: "0px", height: "0px" }}
                multiple
                type={"file"}
                onChange={handleChange}
              />
              <span className="arrowContainer">
                <IoIosArrowRoundForward className="arrow" />{" "}
              </span>
              <button className="uploadBtn" onClick={handleUpload}>
                Upload
              </button>
              <div className="spaceBetween"></div>

              {urls.length === images.length ? (
                <>
                  {urls.map((url, i) => (
                    <img className="newPostImg" key={i} src={url} alt="" />
                  ))}
                </>
              ) : (
                message
              )}
              <br />

              <input
                className="newPostInput"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="name"
              />
              <br />
              <input
                className="newPostInput"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                type="number"
                placeholder="price"
              />
              <br />
              <input
                className="newPostInput"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                type="text"
                placeholder="city"
              />
              <br />
              <input
                className="newPostInput"
                onChange={(e) => {
                  setDescribe(e.target.value);
                }}
                type="text"
                placeholder="description"
              />
              <br />
              <input
                className="newPostInput"
                onChange={(e) => {
                  setRooms(e.target.value);
                }}
                type="number"
                required="required"
                placeholder="how many room"
              />
              <br />
              <input
                className="newPostInput"
                onChange={(e) => {
                  setBathrooms(e.target.value);
                }}
                type="number"
                placeholder="how many bathroom"
              />
              <br />
              <input
                className="newPostInput"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                type="text"
                placeholder="copy google map link here"
              />
              <br />
              <span>
                {name &&
                  price &&
                  city &&
                  bathrooms &&
                  rooms &&
                  location &&
                  describe &&
                  urls.length &&
                  urls.length === images.length && (
                    <button className="postBtn" onClick={postIt}>
                      {" "}
                      Publish{" "}
                    </button>
                  )}
              </span>
            </Typography>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default NewProperty;
