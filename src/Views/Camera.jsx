import { React, useEffect, useRef, useState } from "react";

function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoInfo, setPhotoInfo] = useState("");

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 960, height: 540 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const takePhoto = () => {
    const width = 960;
    const height = 540;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height / (16 / 9);

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
    setPhotoInfo(ctx);
  };

  console.log(photoInfo);
  
  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="cameraContainer">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>SNAP!</button>
      </div>
      <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>CLOSE!</button>
      </div>
    </div>
  );
}

export default Camera;