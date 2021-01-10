import React, { useState, useRef, useEffect } from 'react';
import { Fetch } from '../../Hooks/useFetch';
import { useRedirect } from '../../Hooks/useRedirect';
import NavBarCss from './NavBar.module.css';


export const NavBar = () => {

    const redirect = useRedirect();

    return (
        <>  
            <footer>
                <NavBar>
                    <NavBar.Home href=""></NavBar.Home>
                </NavBar>
            </footer>
        </>
    )
}