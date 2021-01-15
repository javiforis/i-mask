import React from 'react'
import PreviousCameraCss from './PreviousCamera.module.css';
import { useRedirect } from '../../Hooks/useRedirect';

export const PreviousCamera = () => {
    const Redirect = useRedirect();
    return (
        <>
            <div className={PreviousCameraCss.container}>
                <img src="/previousCamera.svg"className={PreviousCameraCss.onboardImg} alt="onboard"></img>
                <button className={PreviousCameraCss.goCamera} onClick={()=>Redirect("/camera")}>
                    Hacer foto
                </button>
            </div>
        </>
    )
}