import React from 'react';
import { useRedirect } from '../../Hooks/useRedirect';
import AdvicesCss from './Advices.module.css';

export const Advices = () => {
    const Redirect = useRedirect();
    return (
        <>
            <h4 className={AdvicesCss.Title}>Consejos</h4>

            <div className={AdvicesCss.Container}>

                <div className={AdvicesCss.FirstAdvice} onClick={() => Redirect("/First-advice-detail")}>
                    <img className={AdvicesCss.FirstIcon}src="/advice-icon.svg"alt=""></img>
                    <p className={AdvicesCss.FirstAdviceText}>¿Qué hacer si te sientes mal?</p>
                </div>

                <div className={AdvicesCss.SecondAdvice} onClick={() => Redirect("/Second-advice-detail")}>
                    <img className={AdvicesCss.SecondIcon} src="/advice-icon.svg"alt=""></img>
                    <p className={AdvicesCss.SecondAdviceText}>Normas básicas de higiene</p> 
                </div>

                <div className={AdvicesCss.ThirdAdvice}>
                    <img className={AdvicesCss.ThirdIcon}src="/advice-icon.svg"alt=""></img>
                    <p className={AdvicesCss.ThirdAdviceText}>¿Cómo reforzar la seguridad de tu entorno?</p>  
                </div>

                <div className={AdvicesCss.FourthAdvice}>
                    <img className={AdvicesCss.FourthIcon}src="/advice-icon.svg"alt=""></img>
                    <p className={AdvicesCss.FourthAdviceText}>¿Cómo lidiar con el estrés?</p>
                </div>
            </div>
        </>
    )
}