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
                        <img src="" alt="pesado"></img>
                        <p>Insuficiencia respiratoria</p>
                        {filter.respiratory && <img src="/check-icon.svg" alt="check"></img>}
                    </div>
                    <div onClick={() => toogle("children")}>
                        {filter.children ? "Está activado": "Está desactivado"}
                    </div>
                        <div onClick={() => toogle("sport")}>
                        {filter.sport ? "Está activado": "Está desactivado"}
                    </div>
                <div>
                    <button onClick={applyFilters}>
                Aplicar filtro
                    </button>
                    </div>
                </div>
            </div>
        </>
        
    )
}