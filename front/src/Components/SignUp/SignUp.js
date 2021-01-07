import React, { useState, useEffect, useContext } from 'react'
import { useForm } from '../../Hooks/useForm';
import { useValidator } from '../../Hooks/useValidator';
import { Fetch } from '../../Hooks/useFetch';
import { useRedirect } from '../../Hooks/useRedirect';
import { RegisterContext } from '../../Contexts/RegisterContext';
import SignUpCss from './SignUp.module.css';


export const SignUp = () => {

    const Redirect = useRedirect();
    const Register = useContext(RegisterContext);

    const [formValues, handleInputChange] = useForm({
        name : "",
        email : "",
        psw : "",
    });

    const [statePsw, setStatePsw] = useState({
        type : "password",   
        placeholder : "**********"
    });

    const {validateCredentials, validateEmail, validatePsw} = useValidator();

    let {name, email, psw} = formValues;
    const {type, placeholder} = statePsw;

    const HandlePswVisibility = (e) => {

        e.preventDefault();

        const psw = document.querySelector('#psw');
        
        setStatePsw({
            ...statePsw,
            type : "password" ? "text" : "password",
            placeholder : "**********" ? "123ytube" : "**********"
        });

        psw.type = statePsw.type
        psw.placeholder = statePsw.placeholder

        e.target.className = e.target.className === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
    }

    useEffect(() => {
        
    }, [statePsw])

    const handleSubmit = (e) =>{

        e.preventDefault();

        if(!validateEmail(email)){
            email = "";
            document.querySelector("#email").className = `${SignUpCss.ErrorInput}`;
            setTimeout(() => {
                document.querySelector("#email").className = ""
            },1500)

        }

        if(!validatePsw(psw)){
            psw = "";
            document.querySelector("#psw").className = `${SignUpCss.ErrorInput}`;
            setTimeout(() => {
                document.querySelector("#psw").className = "";
            },1500)
        }

        if(validateCredentials(email, psw)){

            Fetch(`${process.env.REACT_APP_backUrl}/signup`, {method : "post", data : {...formValues}})
            .then(data => {
                if(data){

                    const {res} = data;

                    if(res === "0"){
                        //Tendria que aparecer un mensaje de que ya esta registrado que se tiene que loggear
                        Redirect("/login")
                    }

                    if(res === "1"){
                        Register.setRegisterUserInfo(formValues)
                        Redirect("/welcome-user-form")
                    }
                }
            })
            .catch((err) => {
                throw err
            })
        }
    }

    return (
        <>
            <div className={SignUpCss.mainContainer}>
                <img src="../../background.jpg" alt="Background" className={SignUpCss.BG} />
                <div className={SignUpCss.gradientBG}></div>
            </div>
            <form onSubmit={handleSubmit} className={SignUpCss.SignUpForm}>
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
                    onChange={handleInputChange}/>
                <i id={SignUpCss.envelope} className="far fa-envelope"></i>   

                <label>Tu contraseña</label>
                <input 
                    id="psw"
                    type={type}
                    name="psw"
                    placeholder={placeholder}
                    autoComplete="off"
                    value={psw}
                    onChange={handleInputChange} />
                <i id={SignUpCss.key} className="fas fa-key"></i>
                <i id={SignUpCss.eye} className="fas fa-eye" onClick={HandlePswVisibility}></i>

                <button type="submit" className={SignUpCss.SignUpBtn}>Registrarme</button> 
                {/* <button className={SignUpCss.backBtn} onClick={() => {redirect("/")}}>&lt;</button> */}
            </form>
        </>
    )
}