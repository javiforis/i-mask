import React, { Component } from 'react'

class ProgressBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
           <div>
               <div style={{backgroundColor: this.props.bgColor, width: this.props.width + "%", height: this.props.height + "px"}}></div>
           </div> 
        )
    }
}

export default ProgressBar