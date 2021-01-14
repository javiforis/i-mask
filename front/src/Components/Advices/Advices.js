import React from 'react';
import { useRedirect } from '../../Hooks/useRedirect';
import AdvicesCss from './Advices.module.css';

export const Advices = () => {
    const Redirect = useRedirect();
    return (
        <>
            <div className={AdvicesCss.Container}>
                <h4 className={AdvicesCss.Title}>Consejos</h4>
                <div className={AdvicesCss.FirstAdvice}>
                    <button className={AdvicesCss.FirstButton} onClick={() => Redirect("/FirstAdviceDetail")}>
                        ¿Qué hacer si te sientes mal?
                    </button>
                </div>
                <div className={AdvicesCss.SecondAdvice}>
                    <button className={AdvicesCss.SecondButton} onClick={() => Redirect("/SecondAdviceDetail")}>
                        Normas básicas de higiene
                    </button>
                </div>
                <div className={AdvicesCss.ThirdAdvice}>
                    <button className={AdvicesCss.ThirdButton}>
                        ¿Cómo reforzar la seguridad de tu entorno?
                    </button>
                </div>
                <div className={AdvicesCss.FourthAdvice}>
                    <button className={AdvicesCss.FourthButton}>
                        ¿Cómo lidiar con el estrés?
                    </button>
                </div>
            </div>
        </>
    )
}