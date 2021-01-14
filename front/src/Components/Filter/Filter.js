import React, { Component, useState } from 'react'
import FilterCss from './Filter.module.css';

export const Filter = (props) => {
    
    const [filter, setfilter] = useState(props.Filters)
    
    const toogle = (filter) => {
        setfilter((value) => ({...value, [filter]: !value[filter]}))
    }
    const applyFilters = () => {
        props.setFilters(filter)
    }
    return (
        <>
            <div className={FilterCss.container}>
                <div className={FilterCss.filters}>
                    <div className={filter.respiratory ? FilterCss.Activated: ""} onClick={() => toogle("respiratory")}>
                        <img className={FilterCss.respiratoryLogo} src="/respiratory-logo.svg" alt="respiratory"></img>
                        <p className={FilterCss.respiratoryText}>Insuficiencia respiratoria</p>
                        {filter.respiratory && <img className={FilterCss.checkIcon}src="/check-icon.svg" alt="check"></img>}
                    </div>
                    <div className={filter.children ? FilterCss.Activated: ""}onClick={() => toogle("children")}>
                    <img className={FilterCss.childrenLogo} src="/children-logo.svg" alt="children"></img>
                        <p className={FilterCss.childrenText}>Infantil</p>
                        {filter.children && <img className={FilterCss.checkIcon}src="/check-icon.svg" alt="check"></img>}
                    </div>
                        <div className={filter.sport ? FilterCss.Activated: ""}onClick={() => toogle("sport")}>
                        <img className={FilterCss.sportLogo} src="/sport-logo.svg" alt="sport"></img>
                        <p className={FilterCss.sportText}>Deportes</p>
                        {filter.sport && <img className={FilterCss.checkIcon} src="/check-icon.svg" alt="check"></img>}
                    </div>
                <div>
                    <button className={FilterCss.FilterBtn}onClick={applyFilters}>
                Aplicar filtros
                    </button>
                    </div>
                </div>
            </div>
        </>
        
    )
}