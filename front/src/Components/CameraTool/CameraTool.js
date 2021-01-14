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
          <button onClick={retry}>Volver a capturar foto</button>
          <button onClick={sendImg}>Enviar foto</button>
        </>
      )
    else 
        return (
          <button onClick={captureImg}>Capturar foto</button>
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
      <div>
        <div ref={video}className={CameraToolCss.Camera}></div>
        <canvas className={CameraToolCss.canvasFile} ref={canvasFile}></canvas>
        <input type="file" accept="image/*" onChange={getImgFromPc}></input>
        {renderButtons()}
        <img src="/base-camera.svg" alt="queoesao"></img>
        <img src="/base-camera2.svg" alt="queoesao"></img>
      </div>

    );
  }
  else if (isLoading) {
    return (
      <p>Is loading</p>
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
