import react from 'react'
import { useRedirect } from '../../Hooks/useRedirect';
import InfoCss from './Info.module.css';

export const Info = () => {
    const Redirect = useRedirect();
    const goBack = (url) => {
        Redirect(url)
    }
    return (
        <>
            <div className={InfoCss.container}>
                <button className={InfoCss.backBtn} onClick={() => { goBack("/mask-list") }}>
                    <img src="/goBack-logo.svg" className={InfoCss.goBack} alt="back"></img>
                </button>
                <img className={InfoCss.background}src="/info-background.svg" alt="background"></img>
                <img className={InfoCss.info}src="/info-info.svg" alt="info"></img>
                <img className={InfoCss.certificate}src="/info-certificate.svg" alt="certificate"></img>
                <img className={InfoCss.efic}src="/info-efic.svg" alt="efic"></img>
            </div>
        </>
    )
}