// import {useRef, useEffect} from "react";
// import Quagga from "quagga";
// const CameraTool = () => {
//   const video = useRef();
//   useEffect(() => {
// 	Quagga.init({
// 		inputStream: {
// 		  name: "Live",
// 		  type: "LiveStream",
// 		  target: video.current
// 		}
// 	  }, (error) => {
// 		  console.log(error)
// 	  })
//   }, [])
//   console.log()
//   return (
//     <div ref={video}></div>
//   )
// }

// export default CameraTool;


import React, { useState, useRef, useEffect, useContext } from 'react';
import Quagga from "quagga";
import { ProductContext } from '../../Contexts/ProductContext';
import { Redirect } from 'react-router-dom';
import CameraToolCss from './CameraTool.module.css'
import { useRedirect } from '../../Hooks/useRedirect';

export const CameraTool = () => {
  const video = useRef();
  const canvasFile = useRef();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [img, setImg] = useState(false);

  const { setProducts } = useContext(ProductContext)
  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: video.current
      }
    }, (error) => {
      if (error)
        throw error;
    })
  }, []);

  const captureImg = () => {
    console.log(video.current.children[1], "Supuesto canvas")
    let img = video.current.children[0];
      console.log(img);
    video.current.children[1].getContext("2d").drawImage(img, 0, 0);
    setImg(true);
  }

  const sendImg = () => {
    setIsLoading(true);
    let uploadImg;
    if(img == "imgFromPc") {
      uploadImg = canvasFile.current.toDataURL("img/png");
    }else {
      uploadImg = video.current.children[1].toDataURL("img/png");
    }
  	let fd = new FormData();
		fd.append("img", uploadImg);
		fetch("http://localhost:8080/save-photo", {
				method: "POST",
				body: fd
		}).then(r => r.json()).then(d => {
      if (d.data)
        setData(d);
      else
        setError("There is an error");
      setIsLoading(false);
    }).catch(e => {
      setError(e);
      setIsLoading(false);
    });
			console.log("Send");
  }

  const retry = () => {
    setImg(false);
    let canvas = video.current.children[1];
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }

  const renderButtons = () => {
    if (img)
      return (
        <>
          <button className={CameraToolCss.againPicBtn} onClick={retry}><img src="/camera-back-icon.svg" alt="back" /><br />Repetir foto</button>
          <button className={CameraToolCss.sendPicBtn} onClick={sendImg}><img src="/camera-save-icon.svg" alt="back" /><br />Enviar foto</button>
        </>
      )
    else
        return (
          <button className={CameraToolCss.captPicBtn} onClick={captureImg}><img src="/camera-btn.svg" alt="cambtn"></img></button>
        )
  }
  const setImgFromPc = (img) => {
    let canvas = canvasFile.current;
    let context = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;

    context.drawImage(img, 0, 0);
    setImg("imgFromPc")
  }

  const getImgFromPc = (event) => {
      let img = new Image();
      img.onload = () => setImgFromPc(img);
      img.src = URL.createObjectURL(event.target.files[0])
  }
  if (!data && !isLoading && !error)
  {
    return (
      <>
        <div ref={video}className={CameraToolCss.Camera}></div>
        <div className={img == "imgFromPc" ? CameraToolCss.CanvasWrapperOk : CameraToolCss.CanvasWrapper}>
          <canvas className={CameraToolCss.canvasFile} ref={canvasFile}></canvas>
        </div>
        <label htmlFor="uploadImage">
          <img src="/folder-icon.svg" alt="uploadimage" />
        </label>
        <input type="file" accept="image/*" id="uploadImage" onChange={getImgFromPc} className={CameraToolCss.uploadBtn}></input>
        {renderButtons()}
        <img className={CameraToolCss.baseCam1} src="/base-camera.svg" alt="queoesao"></img>
        <img className={CameraToolCss.basecam2} src="/base-camera2.svg" alt="queoesao"></img>
      </>
    );
  }
  else if (isLoading) {
    return (
      <img className={CameraToolCss.loading}src="/isLoading.svg" alt="loading"></img>
    )
  }
  else if (error) {
    return (
      <p>{error}</p>
    )
  }
  else {
    setProducts(data.data)
    console.log(data);
    return (
      <Redirect to="/Mask-detail/search"/>
    )
  }

}

export default CameraTool;
