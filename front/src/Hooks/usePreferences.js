import React, { useEffect, useState } from 'react'
import { Fetch } from './useFetch';


export const usePreferences = () => {

    const [preferences, setPreferences] = useState({})

    useEffect(() => {

        const tempPreferences = {};
        
        const preferencesList = ["allergens","intolerances", "supermarkets","foodpreferences"];

        
        Promise.allSettled( preferencesList.map(async pref =>{
            
            const{result} = await Fetch(`${process.env.REACT_APP_backUrl}/get-preferences-list/${pref}`)
            
            tempPreferences[pref] = result
            
        }))
        .then(() => setPreferences({...tempPreferences}))
        

    }, [])

    return preferences
}