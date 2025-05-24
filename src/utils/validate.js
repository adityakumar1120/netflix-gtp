export const checkValidData = (email , password , name)=>{
    const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    const passwordTest = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password)
    let nameTest;
    
    const returnObj = {}

    returnObj.emailTest = emailTest
    returnObj.passwordTest = passwordTest
    if(name !== undefined){
        nameTest = name !== ''
        returnObj.nameTest = nameTest
        return returnObj
    }
    // returnObj.emailTest = emailTest
    // returnObj.passwordTest = passwordTest
    return returnObj
}