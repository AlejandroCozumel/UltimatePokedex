import { React, useEffect, useRef, useState } from "react";

function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoInfo, setPhotoInfo] = useState("");

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 400, height: 400 },
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
    const width = 400;
    const height = 400;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

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
        <button className="button left" onClick={takePhoto}>SNAP!</button>
      </div>
      <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef}></canvas>
        <button className="button left" onClick={closePhoto}>CLOSE!</button>
        <button className="right button" onClick={closePhoto}>HOLII!</button>
      </div>

    </div>
  );
}

export default Camera;

{
  /* <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
<canvas ref={photoRef}></canvas>
<button onClick={closePhoto}>CLOSE!</button>
</div> */
}

{/* <div class="center-on-page">
<div class="pokeball">
  <button class="pokeball__button"></button>
</div>
</div> */}