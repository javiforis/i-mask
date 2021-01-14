import React, { Component } from 'react'
import { useRedirect } from '../../Hooks/useRedirect';
import SecondAdviceDetailCss from './SecondAdviceDetail.module.css';

export const SecondAdviceDetail = () => {
    const Redirect = useRedirect();
    return (
        <div onClick={() => Redirect("/caca")}>something</div>
    )
}