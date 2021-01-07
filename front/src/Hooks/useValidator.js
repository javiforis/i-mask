export const useValidator = () => {

    const validateEmail = (strEmail) => {
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // console.log("email", emailRegex.test(strEmail) )
        return emailRegex.test(strEmail);
    }
    
    const validatePsw = (strPsw) => {
        // console.log(strPsw)
        let pswRegex = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/;
        // console.log("pass", pswRegex.test(strPsw));
        return pswRegex.test(strPsw);
    }
    
    const validateCredentials = (strEmail, strPsw) =>{
        return (validatePsw(strPsw) && validateEmail(strEmail));
    }
    return {
        validateEmail,
        validatePsw,
        validateCredentials
    }
}