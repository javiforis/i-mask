import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Fetch } from '../../Hooks/useFetch';
import { Filter } from '../Filter/Filter';
import MaskListCss from './MaskList.module.css';
import {ProductContext} from '../../Contexts/ProductContext';
import { useRedirect } from '../../Hooks/useRedirect';



export const MaskList = () => {
    const [showBack, setShowBack] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const Redirect = useRedirect();
    const [Filters, setFilters] = useState({respiratory: false, children: false, sport: false})
    const {Products, setProducts} = useContext(ProductContext)
    let Count = useRef(0);

    useEffect(() => {
        Count.current++;
        if(!Products || Count.current > 1) {
        Fetch(`${process.env.REACT_APP_backUrl}/get-mask-by-filters`, {data: Object.entries(Filters).reduce((result, [k, v]) => ({...result, [k]: +v}), {})})
        .then(data => {
            if(data.result)
            setProducts(data.result)
        });
    }
    }, [Filters, setProducts])
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
            <button onClick={toogleFilters} className={MaskListCss.Filter}>
                <img src="/Filter-button.svg" alt="filter"></img>
            </button>
            <div className={MaskListCss.Title}>
            <h1>Mascarillas</h1>
            </div>
            { showBack && !showFilter && <button onClick={goBack}>
                Atrás
            </button>}
            {
                showFilter && <Filter Filters={Filters} setFilters={applyFilters}/> 
            }
            {
                Products && Products.map(data => {
                    // console.log(data)
                    return (
                        <>
                        <div className={MaskListCss.BigContainer}>
                            <div key={data.id} className={MaskListCss.Container} onClick={() => Redirect(`/Mask-detail/${data.id}`)}>
                                <img className={MaskListCss.GenericImage} src="/generic-mask.svg" alt="generic mask"></img>
                                <p className={MaskListCss.Name}>{data.name}</p>
                                <p className={MaskListCss.Type}>{data.type}</p>
                                <p className={MaskListCss.Certificate}>{data.certificate}</p>
                                <p className={MaskListCss.Reusable}>No reutilizable</p>
                            </div>
                        </div>
                        </>
                    )
                })
            }
        </div>
    )
}

