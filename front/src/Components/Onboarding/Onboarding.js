import React, { Component } from 'react'
import ProgressBar from '../ProgressBar/ProgressBar';

class Onboarding extends Component {
    constructor() {
        super();

        this.state = {
            step: 0,
            content: [
                {
                    first: '<p>Conoce cuál</p>',
                    second: '<img ...>'
                },
                {
                    first: '<img ...>',
                    second: '<p>Conoce cuál</p>'
                },
                {
                    first: '...',
                    second: '...'
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
           <div>
                [IMG_LOGO]
                <div>
                    {this.state.content[this.state.step].first}
                    {this.state.content[this.state.step].second}
                </div>
                <button onClick={this.changeStep}>{ this.state.step < 2 ? "Siguiente" : "Empezar" }</button>
                <ProgressBar bgColor="#132968" width={Math.ceil((this.state.step+1)*33.33)} height="24" />
           </div> 
        )
    }
}

export default Onboarding