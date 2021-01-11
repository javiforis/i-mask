import React, { useEffect, useState } from 'react'
import { Fetch } from '../../Hooks/useFetch';
import { Filter } from '../Filter/Filter';
import MaskListCss from './MaskList.module.css';


export const MaskList = () => {
    const [showBack, setShowBack] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [Filters, setFilters] = useState({respiratory: false, children: false, sport: false})
    const [results, setResults] = useState(null)

    useEffect(() => {
        Fetch(`${process.env.REACT_APP_backUrl}/get-mask-by-filters`, {data: Object.entries(Filters).reduce((result, [k, v]) => ({...result, [k]: +v}), {})})
        .then(data => {
            if(data.result)
            console.log(data)
            setResults(data.result)
        })
        ;
    }, [Filters])
    const toogleFilters = () => {
        setShowFilter((value) => !value)
    }
    const applyFilters = (Filters) => {
        setFilters(Filters)
        setShowFilter(false)
        setShowBack(true)
    }
    const goBack = () => {
        setShowBack(false)
        setFilters({respiratory: false, children: false, sport: false})
    }
    return (
        <div>
            <button onClick={toogleFilters}>
                Filtro
            </button>
            { showBack && !showFilter && <button onClick={goBack}>
                Atrás
            </button>}
            {
                showFilter && <Filter Filters={Filters} setFilters={applyFilters}/> 
            }
            {
                results && results.map(data => {
                    // console.log(data)
                    return (
                        <div key={data.id}>
                        <p>{data.name}</p>
                        <p>{data.shop}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
