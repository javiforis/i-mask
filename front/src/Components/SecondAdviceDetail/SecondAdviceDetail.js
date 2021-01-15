import React, { Component } from 'react'
import { useRedirect } from '../../Hooks/useRedirect';
import SecondAdviceDetailCss from './SecondAdviceDetail.module.css';

export const SecondAdviceDetail = () => {
    const Redirect = useRedirect();
    return (
        <>
                <button className={SecondAdviceDetailCss.backBtn} onClick={() => {Redirect("/advices")}}>
                    <img src="/goBack-logo.svg" className={SecondAdviceDetailCss.goBack} alt="back"></img>
                </button>
                <div className={SecondAdviceDetailCss.bigContainer}>
                    <img className={SecondAdviceDetailCss.onboardText}src="/second-advice.svg" alt="onboard"></img>
                    {/* <div className={FirstAdviceDetailCss.container1}>
                        <p className={FirstAdviceDetailCss.text1}>Conocer todos los síntomas del COVID. Los principales son:</p>
                        <img className={FirstAdviceDetailCss.fiebreImg}src="/fiebre-icon.svg" alt="fiebre"></img>
                        <img className={FirstAdviceDetailCss.tosImg}src="/tos-icon.svg" alt="tos"></img>
                        <img className={FirstAdviceDetailCss.cansancioImg}src="/cansancio-icon.svg" alt="cansancio"></img>
                    </div>

                    <div className={FirstAdviceDetailCss.container2}>
                        <p className={FirstAdviceDetailCss.text2}>Permanecer en aislamiento cuando tengas alguno de los síntomas anteriores.</p>
                        <img className={FirstAdviceDetailCss.aislamientoImg}src="/aislamiento-icon.svg" alt="aislamiento"></img>
                    </div>

                    <div className={FirstAdviceDetailCss.container3}>
                        <p className={FirstAdviceDetailCss.text3}>Si tiene fiebre, tos o dificultad para respirar busque atención médica de inmediato. Primero por teléfono, y...</p>
                    </div> */}
                </div>
        </>
    )
}
