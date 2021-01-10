  
// import React, { useState } from 'react'
// import { Fetch } from '../../Hooks/useFetch'
// import { sha1 } from 'object-hash';
// import { useForm } from '../../Hooks/useForm';
// import { Login } from '../Login/Login';

// export const Error = ({res, msg}) => {

//     const [state, setstate] = useState("a")

//     const [formValues, handleInputChange] = useForm({
//         name : ""
//     })

//     const {name} = formValues;

//     const renderComponent = () => {
//         if(state === "a"){
//             return <p>Hola function</p>
//         } else if(state === "b"){
//             return <p>lo que te de la gana</p>
            
//         } else if(state.length && typeof state !== "string"){
//             console.log(state)
//             return state.map(({name}) => <p key={sha1(name)}>{name}</p>)

//         } else {
//             return <Login />
//         }
//     }

//     const handleClick = () => {
//         Fetch("https://pokeapi.co/api/v2/pokemon", {credentials : "omit"})
//         .then(({results}) => {
            
//             setstate(results)
//         })
//     }

//     return (
//         <>
//         <input
//             type="text"
//             name="name"
//             value={name}
//             onChange={handleInputChange}>

//         </input>

//         {state === "a" && <p>Hola</p>}
//         {state === "a" ? <p>Hola ternary</p> : <p>otra cosa</p>}
//         {renderComponent()}
//         <button onClick={handleClick}>Clicka</button>
        
//         </>
//     )
// }