import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Login} from './Components/Login/Login'
import { RegisterProvider } from './Contexts/RegisterContext'
import { LoginProvider } from './Contexts/LoginContext'
import { ExternalRegisterSuccessful } from './Components/external-register-successful/ExternalRegisterSuccessful'
import { SignUp } from './Components/SignUp/SignUp'
import { Dashboard } from './Components/Dashboard/Dashboard'
import {Splash} from './Components/Splash/Splash'
import Onboarding from './Components/Onboarding/Onboarding'
import CameraTool from './Components/CameraTool/CameraTool'
import { Filter } from './Components/Filter/Filter'
import { MaskList } from './Components/MaskList/MaskList'
// import { NavBar } from './Components/NavBar/NavBar'
import { MaskDetail } from './Components/MaskDetail/MaskDetail'
import { Advices } from './Components/Advices/Advices'
import { ProdutProvider } from './Contexts/ProductContext'
import {Timer} from './Components/Timer/Timer'
import { NavBar } from './Components/NavBar/NavBar'
import { FirstAdviceDetail } from './Components/FirstAdviceDetail/FirstAdviceDetail'
import { SecondAdviceDetail } from './Components/SecondAdviceDetail/SecondAdviceDetail'
import { Header} from './Components/Header/Header'

export const App = () => {

    const [registerUserInfo, setRegisterUserInfo] = useState({});
    const [loginUserInfo, setLoginUserInfo] = useState({});
    const [Products, setProducts] = useState(null);

    return (
        <>
            <Router>
                <Switch>
                    
                    <Route exact path="/">
                        <Splash />
                    </Route>

                    <Route path="/onboard">
                        <Onboarding />
                    </Route>

                    <Route path="/login">
                        <LoginProvider value={{...loginUserInfo, setLoginUserInfo}}>
                        <Login />
                        </LoginProvider>
                        
                    </Route>

                    <Route path="/Register">
                        <RegisterProvider value={{...registerUserInfo, setRegisterUserInfo}}>
                            <SignUp />
                        </RegisterProvider>

                    </Route>
                    <Route path="/external-register-successful">
                        <RegisterProvider value={{...registerUserInfo, setRegisterUserInfo}}>
                            <ExternalRegisterSuccessful />
                        </RegisterProvider>
                    </Route>

                    <Route path="/login-successful">
                        <LoginProvider value={{...loginUserInfo, setLoginUserInfo}}>
                            <Dashboard />
                        </LoginProvider>
                    </Route>

                    <Route>
                        {/* Aqui todo lo que vaya con NavBar */}
                        <Header />
                        <Route path="/filter">
                            <Filter />
                        </Route>

                        <Route exact path="/Mask-detail/:id">
                            <ProdutProvider value={{Products, setProducts}}>
                                <MaskDetail/>
                            </ProdutProvider>
                        </Route>

                        <Route path="/Camera">
                            <ProdutProvider value={{Products, setProducts}}>
                                <CameraTool />
                            </ProdutProvider>
                        </Route>

                        <Route exact path="/Mask-list">
                            <ProdutProvider value={{Products, setProducts}}>
                                <MaskList/>
                            </ProdutProvider>
                        </Route>

                        <Route exact path="/Advices">
                            <Advices/>
                        </Route>

                        <Route exact path="/First-advice-detail">
                            <FirstAdviceDetail/>
                        </Route>

                        <Route exact path="/Second-advice-detail">
                            <SecondAdviceDetail/>
                        </Route>

                        <Route path="/timer">
                            <Timer />
                        </Route>

                        <NavBar />
                    </Route>
                    
                </Switch>
            </Router>
        </>
    )
}