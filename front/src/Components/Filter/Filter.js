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
        <div onClick={() => toogle("respiratory")}>
            1
            {filter.respiratory ? "Está activado": "Está desactivado"}
        </div>
        <div onClick={() => toogle("children")}>
            2
            {filter.children ? "Está activado": "Está desactivado"}
        </div>
        <div onClick={() => toogle("sport")}>
            3
            {filter.sport ? "Está activado": "Está desactivado"}
        </div>
        <div>
            <button onClick={applyFilters}>
                Aplicar filtro
            </button>
        </div>
        </>
        
    )
}