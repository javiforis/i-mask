import React ,{ useContext, useState } from 'react';
import HoverImage from "react-hover-image";
import Homelogo from '../../public/Home.png';
import HomelogoG from '../../public/HomeG.png';
import Favlogo from '../../public/Fav.png';
import FavlogoG from '../../public/FavG.png';
import Proflogo from '../../public/Prof.png';
import ProflogoG from '../../public/ProfG.png';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
import { Advices } from '../Advices/Advices';
import { Profile } from '../Profile/Profile';
import UserContext from '../../Contexts/userContext';
import { Filter } from '../Filter/Filter';
import NavBarCss from './NavBar.module.css'



export const NavBar = () => {
  const { userInfo } = useContext(UserContext);
 
    return(
      <Router>
      <div className="Bottom">
          <div className= "Filter">
            <Link to="/Filter" >
            <HoverImage className="HomeLogo" src={Homelogo} hoverSrc={HomelogoG}  alt={"logoG"} />
            </Link > 
          </div>
          <div className ="Advices">
            <Link to="/Advices">
            <HoverImage className="FavLogo" src={Favlogo} hoverSrc={FavlogoG}  alt={"logofavG"} />
            </Link >
          </div>    
          <div className ="Profile">
            
            <Link  to={userInfo ? "/profile" : "/signup"}>
            <HoverImage className="ProfLogo" src={Proflogo} hoverSrc={ProflogoG}  alt={"ProfG"} />
            </Link >
          </div>
            
            
        <Switch>

          <Route exact path="/">
          </Route>
          <Route path="/favs" >
            {/* <About /> */}
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path ="/profile">
            <Profile />
          </Route>

        </Switch>
      </div>
    </Router>
    )
      
}