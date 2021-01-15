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
        {email : "", password : ""},
        {email : validateEmail, password : validatePsw}
    );


    const [statePsw, setStatePsw] = useState({
        type : "password",
        placeholder : "**********",
    })


    const [Error, setError] = useState(null)

    let {email, password} = formValues;
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

        if(validateCredentials(email, password)){

            Fetch(`${process.env.REACT_APP_backUrl}/login`, {method : "post", data : {...formValues}})
            .then(data => {
                // console.log(data);
                if(data){
                    const {res, result} = data;

                    switch(res){
                        case "0" :
                            setError("0");
                            break;
                        case "1" :
                            Login.setLoginUserInfo(result);
                            Redirect("/Mask-list");
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
                        case "-5" :
                            setError("-5");
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
            return <div className={LoginCss.ErrorInCredentials}>
                        <p>La contraseña que has introducido no es correcta. Por favor introduce la contraseña correcta para poder entrar</p>
                  </div>
        }

        if(Error === "-2"){
            return (
                <>
                    <div className={LoginCss.WarningInCredentials}>
                        <p>No hemos encontrado ningun usuario con ese email en nuestra base de datos, porfavor regístrate primero en la aplicación para poder entrar.</p>
                        <button className={LoginCss.RegisterBtn} onClick={(e) => Redirect("/Register", e)}>Registrarme</button>
                    </div>
                    {/* <div> */}
                        {/* {setTimeout(() =>{ */}
                         {/* },1000) */}
                        {/* } */}

                    {/* </div> */}
                </>
            )
        }

        if(Error === "-3" || Error === "-1"){
            return <div className={LoginCss.ErrorInCredentials}>
                        <p>Lo sentimos, en estos momentos no podemos contactar con la base de datos, porfavor vuelva a intentarlo de nuevo mas tarde.</p>
                    </div>
        }

        if(Error === "-4" || !isValid.email || !isValid.password){
            return <div className={LoginCss.ErrorInCredentials}>
                        <p>El email o contraseña que has introducido no son correctos, recuerda que deben ser:</p>
                        <ul className={LoginCss.ErrorInCredentialsList}>
                            <li>Ej: example@gmail.com</li>
                            <li>Ej: 9t7kfCqQt </li>

                        </ul>

                  </div>

        }

        if(Error === "-5"){
            return <div className={LoginCss.ErrorInCredentials}>
                        <p>Los campos de email y contraseña no pueden estar vacíos.</p>
                  </div>
        }

    }

    return (
        <>
            <div className={LoginCss.mainContainer}>
                <img src="login-logo.svg" alt="Background" className={LoginCss.LoginLogo} />
            </div>
            <form onSubmit={handleSubmit} className={LoginCss.loginForm}>
                <h1 className={LoginCss.titleLogin}>¡Bienvenido <br></br>a iMask!</h1>
                <p className={LoginCss.titleEmail}>Email</p>

                <label></label>
                <input className={LoginCss.inputEmail}
                    id="email"
                    type="text"
                    name="email"
                    placeholder="youza@medix.com"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                    />
                <i id={LoginCss.envelope} className="far fa-envelope"></i>
                <img className={LoginCss.eyeIcon} src="eye-icon.svg" alt="eye-icon"></img>
                <p className={LoginCss.titlePassword}>Contraseña</p>
                <label></label>
                <input className={LoginCss.inputPsw}
                    id="password"
                    type={type}
                    name="password"
                    placeholder={placeholder}
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                    />

                <i id={LoginCss.key} className="fas fa-key"></i>
                <img className={LoginCss.checkIcon} src="check-icon.svg" alt="eye-icon"></img>
                <i id={LoginCss.eye} className={type === "password" ? "fas fa-eye-slash" : "fas fa-eye"} onClick={HandlePswVisibility}></i>
                {showCredentialsError()}

                <button type="submit" className={LoginCss.loginBtn}>Iniciar sesión</button>
                <button type="button" className={LoginCss.forgotPsw} onClick={(e) => Redirect("/change-password", e)}>¿Has olvidado tu contraseña?</button>
                {/* <button className={LoginCss.backBtn} onClick={() => {redirect("/")}}>&lt;</button> */}
            </form>
            <p className={LoginCss.ConnectSocial}>Connect with your social account</p>
            <button className={LoginCss.googlebtn}onClick={(e) => Redirect(`${process.env.REACT_APP_backUrl}/facebook-redirect`, e, true)}>
                <img className={LoginCss.facebook} src="facebook-icon.svg" alt="facebookicon"></img>
            </button>
            <button className={LoginCss.googlebtn} onClick={(e) => Redirect(`${process.env.REACT_APP_backUrl}/google-redirect`, e, true)}>
                <img className={LoginCss.google} src="google-icon.svg" alt="googleicon"></img>
            </button>
        </>
    )
}