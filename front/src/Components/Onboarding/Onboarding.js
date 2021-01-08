import React, { Component } from 'react'
import ProgressBar from '../ProgressBar/ProgressBar';
import OnboardingCss from './Onboarding.module.css';

class Onboarding extends Component {
    constructor() {
        super();

        this.state = {
            step: 0,
            content: [
                {
                    first: <p className={OnboardingCss.text}>Conoce cuál es la mascarilla del mercado que mejor se adapte a tus necesidades</p>,
                    second: <img className={OnboardingCss.masklogo} src="../../../mask-logo.svg" alt="mask-logo"/>
                },
                {
                    first: <img className={OnboardingCss.infologo} src="../../../info-logo.svg" alt="info-logo"/>,
                    second: <p className={OnboardingCss.text}>Los consejos de la OMS sobre mascarillas, COVID, cuidados...</p>
                },
                {
                    first: <p className={OnboardingCss.text}>Te avisamos del tiempo máximo que puedes llevar cada mascarilla para que corras el menor riesgo posible</p>,
                    second: <img className={OnboardingCss.clocklogo} src="../../../clock-logo.svg" alt="clock-logo"/>
                }
            ]
        }
    }

    changeStep = () => {
        // TODO: Last step ??? 
        this.setState({ step: this.state.step+1 })
    }

    render() {
        return (
            <>
           <div className={OnboardingCss.Background}>
                <img/>
                
                {this.state.content[this.state.step].first}
                {this.state.content[this.state.step].second}
                
                <button className={OnboardingCss.Button} onClick={this.changeStep}>{ this.state.step < 2 ? "Siguiente" : "Empezar" }</button>
                <ProgressBar bgColor="#132968" width={Math.ceil((this.state.step+1)*33.33)} height="24" />
           </div>
           </>
        )
    }
}

export default Onboarding