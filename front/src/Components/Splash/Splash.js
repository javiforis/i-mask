import React, { Component } from 'react'
import { useRedirect } from '../../Hooks/useRedirect';
import SplashCss from './Splash.module.css';

export const Splash = () => {
    const Redirect = useRedirect();
    setTimeout(() => {
        Redirect("/onboard")
    }, 5000)
    return (
        <>
            <div className={SplashCss.Background}>
                <img src="../../../i-maskBG.svg" alt="Background"/>
                  
            </div>
        </>
    )
    
}

