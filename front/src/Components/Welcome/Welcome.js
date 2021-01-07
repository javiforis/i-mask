import React from 'react'
import WelcomeCss from './Welcome.module.css'
import { useRedirect } from '../../Hooks/useRedirect'


export const Welcome = () => {

    const Redirect = useRedirect();
    

    return (
        <>
            {/* <button className={WelcomeCss.backBtn} onClick={() => {history.go(-1)}}>Atras</button> */}
            <div className={WelcomeCss.mainContainer}>
                <img src="../../background.jpg" alt="Background" className={WelcomeCss.BG} />
                <div className={WelcomeCss.gradientBG}></div>
            </div>

            <div className={WelcomeCss.btnRegisterContainer}><button type="button" className={WelcomeCss.registerBtn} onClick={(e) => Redirect("/Register", e)} >Registrarme</button></div>

            <div className={WelcomeCss.comingInSeparator}>
                <hr className={WelcomeCss.Separator} />
                <p className={WelcomeCss.comingIn}>Entrar con</p>
                <hr className={WelcomeCss.Separator} />
            </div>

            <div className={WelcomeCss.loginSocialBtnContainer}>
                <button type="button" className={`${WelcomeCss.loginSocialBtn} ${WelcomeCss.google}`} onClick={(e) => Redirect(`${process.env.REACT_APP_backUrl}/google-redirect`, e, true)}><img src="../../login-google.png" alt="login google button" className={WelcomeCss.loginSocialGImg} /></button>

                <button type="button" className={`${WelcomeCss.loginSocialBtn} ${WelcomeCss.facebook}`} onClick={(e) => Redirect(`${process.env.REACT_APP_backUrl}/facebook-redirect`, e, true)}><img src="../../login-facebook.png" alt="login facebook button" className={WelcomeCss.loginSocialFImg} /></button>
            </div>

            <hr className={WelcomeCss.downSeparator} />
            
            <div className={WelcomeCss.loginContainer}>
                <button type="button" id="login" className={WelcomeCss.loginBtn} onClick={(e) => Redirect("/login", e)}>Iniciar sesion con email</button>
                <button className={WelcomeCss.comeInAsGuest} onClick={(e) => Redirect("/guest", e)}>Entrar sin iniciar sesión</button>
            </div>
        </>
    )
}