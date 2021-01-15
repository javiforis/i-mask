import React, { Component } from 'react'
import ProgressBar from '../ProgressBar/ProgressBar';
import OnboardingCss from './Onboarding.module.css';
import { withRouter } from 'react-router-dom';

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
                    second: <p className={OnboardingCss.text2}>Los consejos de la OMS sobre mascarillas, COVID, cuidados...</p>
                },
                {
                    first: <p className={OnboardingCss.text3}>Te avisamos del tiempo máximo que puedes llevar cada mascarilla para que corras el menor riesgo posible</p>,
                    second: <img className={OnboardingCss.clocklogo} src="../../../clock-logo.svg" alt="clock-logo"/>
                }
            ]
        }
    }

    changeStep = () => {
        // TODO: Last step ???
        if(this.state.step <2)
        this.setState({ step: this.state.step+1 })
        else {
            this.props.history.push("/login")
        }
    }

    render() {
        return (
            <>
           <div className={OnboardingCss.Background}>
                <div className={OnboardingCss.header}>

                    <img className={OnboardingCss.TopLogo} src="/onboard-top-logo.svg"alt="logo"/>

                </div>
                {this.state.content[this.state.step].first}
                {this.state.content[this.state.step].second}
                <button className={OnboardingCss.Button} onClick={this.changeStep}>{ this.state.step < 2 ? "Siguiente" : "Empezar" }</button>
                <div className={OnboardingCss.ProgressBarBackground}>
                    <ProgressBar bgColor="#132968" width={Math.ceil((this.state.step+1)*33.33)} height={10} />
                </div>
           </div>
           </>
        )
    }
}

export default withRouter(Onboarding);