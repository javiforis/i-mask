import React, { Component } from 'react'
import { useRedirect } from '../../Hooks/useRedirect';
import FirstAdviceDetailCss from './FirstAdviceDetail.module.css';

export const FirstAdviceDetail = () => {
    const Redirect = useRedirect();
    return (
        <div onClick={() => Redirect("/caca")}>something</div>
    )
}