import React from 'react'
import { useState, useEffect } from 'react';
import TimerCss from './Timer.module.css';


export const Timer = (props) => {
    const {initialHour = 0, initialMinute = 0,initialSeconds = 0} = props;
    const [ hours, setHours] = useState(initialHour);
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [ running, setRunning ] = useState(false)
    const stopInterval = () => {
        setRunning(false)
    }
    const startInterval = () => {
        setRunning(true)
    }
    useEffect(()=>{
        if(running){
            let myInterval = setTimeout(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearTimeout(myInterval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
            }, 1000)
            return ()=> {
                clearTimeout(myInterval);
              };
        }
    }, [running, minutes, seconds]);

    return ( 
        <div>
            <img src="/timer-onboard.svg" alt="onboard" className={TimerCss.onBoard}></img>
            <img src="/timer-ring.svg" alt="onboard" className={TimerCss.ring}></img>
            {
                running ? <button className={TimerCss.Start} onClick={stopInterval}>Stop</button>: <button className={TimerCss.Start}onClick={startInterval}>Inicio</button>
            }
            
        { hours === 0 && minutes === 0 && seconds === 0
            ? <div>
                <img src="/timeout.svg" alt="onboard" className={TimerCss.timeout}></img>
            </div>
            : <h1 className={TimerCss.StopWatch}> {hours}:{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )}




// export const Timer = (props) => {
//     const {initialMinute = 0,initialSeconds = 0} = props;
//     const [ minutes, setMinutes ] = useState(initialMinute);
//     const [ seconds, setSeconds ] =  useState(initialSeconds);
//     const [ running, setRunning ] = useState(false)
//     const stopInterval = () => {
//         clearInterval(running);
//         setRunning(false)
//         console.log(running)
//     }
//     const startInterval = ()=> {
//     let myInterval = setInterval(() => {
//             if (seconds > 0) {
//                 setSeconds(seconds - 1);
//             }
//             if (seconds === 0) {
//                 if (minutes === 0) {
//                     clearInterval(myInterval)
//                 } else {
//                     setMinutes(minutes - 1);
//                     setSeconds(59);
//                 }
//             } 
//         }, 1000)
//         setRunning(myInterval)
//     };

//     return ( 
//         <div>
//             {
//                 running ? <button onClick={stopInterval}>Stop</button>: <button onClick={startInterval}>Start</button>
//             }
            
//         { minutes === 0 && seconds === 0
//             ? null
//             : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
//         }
//         </div>
//     )}