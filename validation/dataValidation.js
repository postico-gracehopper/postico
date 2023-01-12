


function switchValidateUserOnKey(key, val){
    switch(key) {
        case "id":
            const id = Number(val)
            if (id < 0 || id > 5000000000) throw new Error(`id error: ${id} integer is out of bounds`)
            if (!Number.isInteger(id)) throw new Error(`${id} is not an integer`)
            return {id: val}

        case "username":
            return {username: String(val)}

        case "firstName":
            return {firstName: String(val)}

        case "lastName":
            return {lastName: String(val)}

        case "email":
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) throw new Error("Does not match email format")
            return {email: val}

        case "addressLine1":
            return {addressLine1: String(val)}

        case "addressLine2":
            return {addressLine2: String(val)}

        case "city":
            return {city: String(val)}

        case "zipCode":
            if (!Number.isInteger(Number(val))) throw new Error("zip code is not an integer")
            if (val > 99999) throw new Error("zip code too big - only 5 digits accepted")
            return {zipCode: Number(val)}


        case "creditCardNumber":
            return {creditCardNumber: String(val)}

        case "creditCardName":
            return {creditCardName: String(val)}
        
        case "creditCardExpiration":
            return {creditCardExpiration: String(val)}

        case "creditCardCVV":
            if (!Number.isInteger(Number(val))) throw new Error("CVV is not an integer")
            if (val > 999) throw new Error("CVV code too big - only 4 digits accepted")
            return {creditCardName: Number(val)}

        case "adminRights":
            return {adminRights: Boolean(val)}
            
        case "isGuest":
            return {isGuest: Boolean(val)}

        case "createdAt":
            return {createdAt: String(val)}

        case "updatedAt":
            return {createdAt: String(val)}

        default:
            throw new Error(`${key} is not a valid user field `)
}}

function validateUserFields(usrObj, callback=null){
    try {
        if (Array.isArray(usrObj)) return usrObj.map(validateUserFields)
        return Object.keys(usrObj).reduce((acc, key) => {
            return {...acc, ...switchValidateUserOnKey(key, usrObj[key])}
        }, {})
    } catch(err){
        console.log(err.message)
        if (callback) callback(err.message)
        throw err
    }
}
