import React  from 'react';
import HeaderCss from './Header.module.css';

export const Header = () => {
      return(
        
        <div className={HeaderCss.Header}>
            <img className={HeaderCss.Logo} src="/imask-header.svg" alt="header"></img>
        </div>
      )
        
  }
  
  