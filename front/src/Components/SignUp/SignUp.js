import React, { useState, useContext } from 'react'
import { useForm } from '../../Hooks/useForm';
import { useValidator } from '../../Hooks/useValidator';
import { Fetch } from '../../Hooks/useFetch';
import { useRedirect } from '../../Hooks/useRedirect';
import { RegisterContext } from '../../Contexts/RegisterContext';
import SignUpCss from './SignUp.module.css';
import crypto from 'crypto';



export const SignUp = () => {

    const Redirect = useRedirect();
    const Register = useContext(RegisterContext);
    const {validateCredentials, validateEmail, validatePsw} = useValidator();

    const [formValues, handleInputChange, isValid, setValues] = useForm(
        {name : "", email : "", psw : "",},
        {email : validateEmail, psw : validatePsw}
    );

    const [statePsw, setStatePsw] = useState({
        type : "password",   
        placeholder : "**********"
    });

    const [Error, setError] = useState(null)

    let {name, email, psw} = formValues;
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

        if(!validateCredentials(email, psw) || (name && email && psw)){

            Fetch(`${process.env.REACT_APP_backUrl}/register`, {method : "post", data : {...formValues}})
            .then(data => {
                if(data){

                    const {res, result} = data;
                    console.log(res);

                    switch(res){
                        case "0" :
                            setError("0")
                            break;
                        case "1" :
                            Register.setRegisterUserInfo(result)
                            Redirect("/mask-list")
                            break;
                        case "-1" :
                            setError("-1")
                            break;
                        case "-2" :
                            setError("-2");
                            break;
                        case "-3" :
                            setError("-3");
                            break;
                        case "-4" :
                            setError("-4");
                            break;
                        default :
                            break;
                    
                    }
                }
            })
        }
    }

    const showCredentialsError = () => {

        if(Error === "0"){
            return (
                <>
                    <div className={SignUpCss.WarningInCredentials}>
                        <p>Hemos encontrado un usuario con ese email en nuestra base de datos, porfavor completa el formulario de login para poder entrar.</p>
                        <button className={SignUpCss.loginBtn} onClick={(e) => Redirect("/login", e)}>Login</button>
                    </div>
                    {/* <div> */}
                        {/* {setTimeout(() =>{ */}
                         {/* },1000) */}
                        {/* } */}

                    {/* </div> */}
                </>
            )
        }

        if(Error === "-1" || Error === "-2"){
            return <div className={SignUpCss.ErrorInCredentials}>
                        <p>Lo sentimos, en estos momentos no podemos contactar con la base de datos, porfavor vuelva a intentarlo de nuevo mas tarde.</p>
                    </div>
        } 
        if(Error === "-3" || !isValid.email || !isValid.psw){
            return <div className={SignUpCss.ErrorInCredentials}>
                        <p>El email o contraseña que has introducido no son correctos, recuerda que deben ser:</p>
                        <ul className={SignUpCss.ErrorInCredentialsList}>
                            <li>Ej: example@gmail.com</li>
                            <li>Ej: 9t7kfCqQt </li>   
                        </ul>

                  </div>
        } 
        
        if(Error === "-4"){
            return <div className={SignUpCss.ErrorInCredentials}>
                        <p>Los campos de email y contraseña no pueden estar vacíos.</p>
                  </div>
        }
        
    }

    const generatePsw = (e) => {
        let newPsw = crypto.randomBytes(5).toString("hex");
        e.preventDefault();

        if(validatePsw(newPsw)){

            setStatePsw({
                ...statePsw,
                type : type === "password" ? "text" : "text",
                placeholder : placeholder === "**********" ? "123ytube" : newPsw,
                // psw : psw === "" ? newPsw : newPsw
            });
    
            setValues({
                ...formValues,
                psw : psw === "" ?  newPsw : newPsw,
                
            })
            return true
        }
    }

    return (
        <>
            
            <div className={SignUpCss.mainContainer}>
                <img src="../../background.jpg" alt="Background" className={SignUpCss.BG} />
                <div className={SignUpCss.gradientBG}></div>
                <img src="/Logo.svg" alt="Logo de QuéComo" className={SignUpCss.LogoImg} />
            </div>
            
            
            <form onSubmit={handleSubmit} className={Error !== null ? `${SignUpCss.SignUpFormErrorActive}` : `${SignUpCss.SignUpForm}`}>
                <h1 className={SignUpCss.titleSignUp}>Registro</h1>
                <label>Tu Nombre</label>
                <input 
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Rafael"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}/>
                <i id={SignUpCss.userIcon} className="fas fa-user"></i>

                <label>Tu email</label>
                <input 
                    id="email"
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                    className={!isValid.email ? SignUpCss.ErrorInput : ""}/>

                <i id={SignUpCss.envelope} className="far fa-envelope"></i> 

                <div className={SignUpCss.generatePswContainer}>
                    <label className={SignUpCss.labelPsw}>Tu contraseña</label>
                    <button type="button" className={SignUpCss.generatePswBtn} onClick={!generatePsw ? generatePsw : generatePsw }>Generar Contraseña</button>
                </div>  
                <input 
                    id="psw"
                    type={type}
                    name="psw"
                    placeholder={placeholder}
                    autoComplete="off"
                    value={psw}
                    onChange={handleInputChange}
                    className={!isValid.psw ? SignUpCss.ErrorInput : ""} />
                <i id={SignUpCss.key} className="fas fa-key"></i>
                <i id={SignUpCss.eye}  className={type === "password" ? "fas fa-eye-slash" : "fas fa-eye"} onClick={HandlePswVisibility}></i>
                {showCredentialsError()}

                <button type="submit" className={SignUpCss.SignUpBtn}>Registrarme</button> 
                {/* <button className={SignUpCss.backBtn} onClick={() => {redirect("/")}}>&lt;</button> */}
            </form>
            
        </>
    )
}