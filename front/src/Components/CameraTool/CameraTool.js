import {useRef} from "react";
import Quagga from "quagga";
const CameraTool = () => {
  const video = useRef();
  console.log(Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: video.current
    }
  }))
  return (
    <div ref={video}></div>
  )
}

export default CameraTool;