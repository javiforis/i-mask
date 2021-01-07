import { useRef, useState } from "react"


export const useForm = (initialState = {}, regex = {}, time = 500) => {

    const [values, setValues] = useState(initialState)

    const [isValid, setIsValid] = useState(
        // {
        //     a: 1,
        //     b: 2
        //   }
        //   Object.entries(obj) => [[a, 1], [b, 2]]
        //   arr.reduce => { a: true, b: true}

        Object.entries(regex).reduce((object, [key]) => {
            object[key] = true;
            return object
    
        }, {})
    );



    let timeOut = useRef()

    function handleInputChange({target}){

        if(regex[target.name]){
            if(timeOut.current){
                clearTimeout(timeOut.current);
            }

            timeOut.current = setTimeout(() => {
    
                let newValidation;
                if(target.value.length === 0){
                    newValidation = {
                        ...isValid,
                        [target.name] : true
                    }
                } else if(typeof regex[target.name] === "function"){
                    newValidation = {
                        ...isValid,
                        [target.name] : regex[target.name](target.value)
                    }
                    //en el caso de tener una funcion en mi regex voy a establecer un nuevo estado de validacion con todo lo que tenia antes y la ejecucion de la funcion regex sobre el value del input

                } else if(regex[target.name] instanceof RegExp){
                    newValidation = {
                        ...isValid,
                        [target.name] : regex[target.name].test(target.value)
                    }
                    //en el caso de tener una regex en mi regex voy a establecer un nuevo estado de validacion con todo lo que tenia antes y la ejecucion de la funcion regex sobre el value del input
                } 
                
                if(newValidation){
                    setIsValid(newValidation);
                    console.log("updated Validation", newValidation)
                }
    
            }, time);
        }

        setValues({
            ...values,
            [target.name] : target.value,

        })
    }

    return [ values, handleInputChange, isValid]
        
}