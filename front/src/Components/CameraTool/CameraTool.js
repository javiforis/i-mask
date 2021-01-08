import React, { useState, useRef, useEffect } from 'react';
import Quagga from "quagga";
import Onboarding from '../Onboarding/Onboarding';

export const CameraTool = () => {
  const video = useRef();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [img, setImg] = useState(false);


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
    let img = video.current.children[1].toDataURL("img/png");
  	let fd = new FormData();
		fd.append("img", img);
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

  if (!data && !isLoading && !error)
  {
    return (
      <div>
        <div ref={video}></div>
        {renderButtons()}
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
    console.log(data);
    return (
      <Onboarding/>
    )
  }
      

}

export default CameraTool;
