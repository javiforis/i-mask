import React, { useContext, useEffect } from 'react'
import { Fetch } from '../../Hooks/useFetch'
import { useRedirect } from '../../Hooks/useRedirect';
import { RegisterContext } from '../../Contexts/RegisterContext';

export const ExternalRegisterSuccessful = () => {

    const Redirect = useRedirect();
    const Register = useContext(RegisterContext);

    useEffect(() => {

        Fetch(`${process.env.REACT_APP_backUrl}/get-oauth-user-data`)
        .then((userData) => {
            
            if(!userData.error){
                console.log(userData);
                Register.setRegisterUserInfo(userData)
                Redirect("/welcome-user-form")
                
            // } else {
            //     // Redirect("/");
            }
        })
        .catch(() => Redirect("/"));
    }, [Register, Redirect])

    return (
        <>
        </>
    )
}