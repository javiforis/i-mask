import React  from 'react';
import NavBarCss from './NavBar.module.css';



import {useRedirect} from '../../Hooks/useRedirect';

export const NavBar = () => {
  
  const redirect = useRedirect();
    return(
      
      <div className={NavBarCss.Bottom}>
          <div onClick={()=>redirect("/Mask-list")}>
            <img className={NavBarCss.HomeLogo} src="/home-logo.svg" alt="home"></img>
          </div>

          <div onClick={()=>redirect("/Advices")}>
            <img className={NavBarCss.AdvicesLogo} src="/advices-logo.svg" alt="adv"></img>
          </div> 

          <div onClick={()=>redirect("/profile")}>
            <img className={NavBarCss.ProfileLogo} src="/profile-logo.svg" alt="prof"></img>
          </div>

          <div onClick={()=>redirect( "/Camera")}>
            <img className={NavBarCss.CameraLogo} src="/camera-logo.svg" alt="cam"></img>
          </div>
      </div>
    )
      
}

