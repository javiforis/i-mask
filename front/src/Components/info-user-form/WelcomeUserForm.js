import React, { useContext } from 'react'
// import { Fetch } from '../../Hooks/useFetch'
// import { useRedirect } from '../../Hooks/useRedirect';
import { RegisterContext } from '../../Contexts/RegisterContext';
import { useRedirect } from '../../Hooks/useRedirect';
import WelcomeUserFormCss from './WelcomeUserForm.module.css';

export const WelcomeUserForm = () => {

    const Register = useContext(RegisterContext);
    const Redirect = useRedirect();
    
    return (
        <>
            <div className={WelcomeUserFormCss.archContainer}></div>

            <div className={WelcomeUserFormCss.mainContainer}>

                <h1 className={WelcomeUserFormCss.WelcomeTitle}>¡BIENVENIDO A QUÉCOMO!</h1>
                <p className={WelcomeUserFormCss.userName}>{ Register.name }</p>

                <p className ={WelcomeUserFormCss.mainText}>Queremos ofrecerte una <b>experiencia personalizada</b>. Si nos cuentas tus preferencias y necesidades alimentarias en unos sencillos pasos</p>

                <h2 className={WelcomeUserFormCss.subtitle}>¡Podrás disfrutar de todas las funcionalidades!</h2>

                <button className={WelcomeUserFormCss.nextBtn} onClick={(e) => Redirect("/user-form-allergens", e)}>¡Entendido!</button>
                <button className={WelcomeUserFormCss.laterBtn} onClick={(e) => Redirect("/dashboard", e)}>Quizás en otro momento</button>

                <img src="../../../userFormImage.jpg" className={WelcomeUserFormCss.bottomImage} alt="Down" />

            </div>
        </>
    )
}