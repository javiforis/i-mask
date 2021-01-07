import React, { useState, useContext } from 'react';
import { useForm } from '../../Hooks/useForm';
import { Fetch } from '../../Hooks/useFetch';
import { useRedirect } from '../../Hooks/useRedirect';
import { useValidator } from '../../Hooks/useValidator';
import { LoginContext } from '../../Contexts/LoginContext';
import LoginCss from './Login.module.css';

export const Login = () => {

    const Redirect = useRedirect();
    const Login = useContext(LoginContext);
    const {validateCredentials, validateEmail, validatePsw} = useValidator();

    const [formValues, handleInputChange, isValid] = useForm(
        {
            email : "",
            psw : "",
        },

        {
            email : validateEmail,
            psw : validatePsw
        
        }
    );
    
        
    const [statePsw, setStatePsw] = useState({
        type : "password",   
        placeholder : "**********"
    })


    const [Error, setError] = useState(null)

    let {email, psw} = formValues;
    const {type, placeholder} = statePsw;

    const HandlePswVisibility = (e) => {

        e.preventDefault();
        
        setStatePsw({
            ...statePsw,
            type : type === "password" ? "text" : "password",
            placeholder : placeholder === "**********" ? "123ytube" : "**********"
        });
    }

    const handleSubmit = (e) =>{

        e.preventDefault();

        if(!validateCredentials(email, psw)){

            Fetch(`${process.env.REACT_APP_backUrl}/login`, {method : "post", data : {...formValues}})
            .then(data => {
                // console.log(data);
                if(data){
                    const {res, msg, result} = data;
                    console.log(res);

                    switch(res){

                        case "1" :
                            Login.setLoginUserInfo(result);
                            Redirect("/login-successful");
                            break;
                        case "-1" :
                            
                            break;
                        case "-2" :
                            console.log(Error)
                            return <Error res={res} msg={msg} />;
                        case "-3" :
                            
                            break;
                        case "-4" :
                            setError("-4")
                            break;

                        default :
                            break;
                    
                    }
                }
            })

        } 
        
    }

    const showCredentialsError = () => {
        if(Error === "-4" || !isValid.email || !isValid.psw){
            return <div className={LoginCss.ErrorInCredentials}>
                        <p>El email o contraseña que has introducido no son correctas, recuerda que la contraseña debe ser:</p>
                        <ul>
                            <li>Al menos una letra y un número</li>
                            <li>No puede contener carácteres alfanuméricos</li>
                            <li>Contener al menos seis carácteres</li>
                        </ul>

                  </div>

        }
        
    }

    return (
        <>
            <div className={LoginCss.mainContainer}>
                <img src="../../background.jpg" alt="Background" className={LoginCss.BG} />
                <div className={LoginCss.gradientBG}></div>
            </div>
            <form onSubmit={handleSubmit} className={LoginCss.loginForm}>
                <h1 className={LoginCss.titleLogin}>Iniciar sesión</h1>

                <label>Tu email</label>
                <input 
                    id="email"
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                    className={!isValid.email ? LoginCss.ErrorInCredentials : ""}/>
                <i id={LoginCss.envelope} className="far fa-envelope"></i>   

                <label>Tu contraseña</label>
                <input 
                    id="psw"
                    type={type}
                    name="psw"
                    placeholder={placeholder}
                    autoComplete="off"
                    value={psw}
                    onChange={handleInputChange}
                    className={!isValid.psw ? LoginCss.ErrorInCredentials : ""} />
                <i id={LoginCss.key} className="fas fa-key"></i>
                <i id={LoginCss.eye} className={type === "password" ? "fas fa-eye" : "fas fa-eye-slash"} onClick={HandlePswVisibility}></i>
                {showCredentialsError()}

                <button type="submit" className={LoginCss.loginBtn}>Iniciar sesión</button>
                <button type="button" className={LoginCss.forgotPsw} onClick={(e) => Redirect("/change-password", e)}>¿Has olvidado tu contraseña?</button>
                {/* <button className={LoginCss.backBtn} onClick={() => {redirect("/")}}>&lt;</button> */}
            </form>
        </>
    )
}