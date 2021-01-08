import React, { Component } from 'react'
import ProgressBarCss from './ProgressBar.module.css';

class ProgressBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
           <div>
               <div className={ProgressBarCss.bar} style={{backgroundColor: this.props.bgColor, width: this.props.width + "%", height: this.props.height + "px"}}></div>
           </div> 
        )
    }
}

export default ProgressBar