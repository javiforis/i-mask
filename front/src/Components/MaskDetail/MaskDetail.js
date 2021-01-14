import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../Contexts/ProductContext';
import { Fetch } from '../../Hooks/useFetch';
import { useRedirect } from '../../Hooks/useRedirect';
import { Filter } from '../Filter/Filter';
import MaskDetailCss from './MaskDetail.module.css';

export const MaskDetail = (props) => {
    const [showCustom, setShowCustom] = useState(false)
    const [results, setResults] = useState(null)
    const Redirect = useRedirect();
    const {Products} = useContext(ProductContext);
    const {id} = useParams();
    console.log(results);
    useEffect(() => {
        if(id === "search" && Products) {
            setShowCustom(true)
        }
        else if(id !== undefined && Products) {
            setResults(Products.filter((product) => product.id == id))
            console.log(Products)
        }
        else if(id !== undefined){
            Fetch(`${process.env.REACT_APP_backUrl}/get-mask-detail`, {data: {idMask: id}})
            .then(data => {
            if(data.result)
            setResults(data.result)
        })}
        
    }, [Products, id])
    const goBack = (url) => {
        Redirect(url)
    }
    if(showCustom) 
        return (
        <>
        <div>
            <button onClick={() => {goBack("/camera")}}>
            Atrás
            </button>
            <div>
                <img alt="mask"></img>
            </div>
            <div>
            
                    <div>
                    <p>{Products.Clase}</p>
                    <p>{Products["Reut o no"]}</p>
                    <p>Certificado: {Products.Certificados}</p>
                    <p>Eficacia: {Products.Efecacia}</p>
                    <button onClick={() => Redirect("/info")}>Info</button>
                    </div>
                
            
            
            </div>

        </div>
        </>
    )
    return (
        <>
            <div className={MaskDetailCss.bigContainer}>
                <button className={MaskDetailCss.backBtn}onClick={() => {goBack("/mask-list")}}>
                    <img src="/goBack-logo.svg" className={MaskDetailCss.goBack} alt="back"></img>
                </button>
                <div>
                    <img className={MaskDetailCss.bigMask} src="/generic-mask.svg" alt="mask"></img>
                </div>
            <div>
            {
            results && results.map(data => {
                
                return (
                    <>
                    <div className={MaskDetailCss.Container} key={data.id}>
                    <p className={MaskDetailCss.Type}>{data.type}</p>
                    <p className={MaskDetailCss.Reut}>{data.reusable ? "Reutilizable" : "No reutilizable"}</p>
                    <p className={MaskDetailCss.Certif}>Certificado: </p>
                    <p className={MaskDetailCss.Certif2}>{data.certificate}</p>
                    <p className={MaskDetailCss.Effect}>Eficacia: </p>
                    <p className={MaskDetailCss.Effect2}>{data.effectiveness} %</p>
                    <button className={MaskDetailCss.infoBtn} onClick={() => Redirect("/info")}><img src="/infoBtn-logo.svg"alt="info"></img></button>
                    </div>
                    </>
                )
            })
            }
            </div>

        </div>
        </>
    )
}
