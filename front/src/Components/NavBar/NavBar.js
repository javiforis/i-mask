import React  from 'react';
import NavBarCss from './NavBar.module.css';
import {useLocation} from "react-router-dom";
import {useRedirect} from '../../Hooks/useRedirect';

export const NavBar = () => {
  const redirect = useRedirect();
  const location = useLocation();
    return(
      <div className={NavBarCss.Bottom}>
          <div onClick={()=>redirect("/Mask-list")}>
            <img className={`${NavBarCss.HomeLogo} ${location.pathname.toLowerCase().includes("/mask") ? NavBarCss.Active : ""}`} src="/home-logo.svg" alt="home"></img>
          </div>

          <div onClick={()=>redirect("/Advices")}>
            <img className={`${NavBarCss.AdvicesLogo} ${location.pathname.toLowerCase().includes("/advices") ? NavBarCss.Active : ""}`} src="/advices-logo.svg" alt="adv"></img>
          </div>

          <div onClick={()=>redirect("/timer")}>
            <img className={`${NavBarCss.ProfileLogo} ${location.pathname.toLowerCase().includes("/timer") ? NavBarCss.Active : ""}`} src="/profile-logo.svg" alt="prof"></img>
          </div>

          <div onClick={()=>redirect( "/previous-camera")}>
            <img className={`${NavBarCss.CameraLogo} ${location.pathname.toLowerCase().includes("/camera") ? NavBarCss.Active : ""}`} src="/camera-logo.svg" alt="cam"></img>
          </div>
      </div>
    )
}

