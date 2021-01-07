import React from 'react';
import { useForm } from '../../Hooks/useForm';
import Carousel from 'react-swiping-carousel';
import DashboardCss from './Dashboard.module.css';
import { usePreferences } from '../../Hooks/usePreferences';

export const Dashboard = () => {

    const [formValues, handleInputChange] = useForm({
        search : "",
    });

    const {search} = formValues

    const preferences = usePreferences();

    return (
        <>
            <img src="../../../arco.svg" className={DashboardCss.arch} alt="arco superior" />
            <div className={DashboardCss.userContainer}>
                <h1 className={DashboardCss.queComoTitle}>QuéComo</h1>
                <button className={DashboardCss.notificationsBtn}>
                    <i id={DashboardCss.bellIcon} className="far fa-bell"></i>
                </button>
            </div>
            <div className={DashboardCss.searchbarContainer}>
                <input 
                    id={DashboardCss.searchBar}
                    type="text"
                    name="search"
                    placeholder="Buscar"
                    autoComplete="off"
                    value={search}
                    onChange={handleInputChange}/>
                <button className={DashboardCss.searchBtn}>
                    <i id={DashboardCss.searchIcon} className="fas fa-search"></i>
                </button>
                <button className={DashboardCss.filterBtn}>
                    <i id={DashboardCss.filterIcon} className="fas fa-sliders-h"></i>
                    Filters
                </button>
            </div>
            
            {Object.keys(preferences).map(prefColl => {
                if(preferences[prefColl].length){
                    return <Carousel align={{first : "left", nth : "center", last : "right"}} margin={20} scrollDistance={20}>
                        { 
                            preferences[prefColl].map((pref) => 
                                <p>{pref.name}</p>)
                        }
                            </Carousel>
                }
                
            })}
        </>
    )
}