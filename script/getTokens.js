const {db, 
    models: {User}
} = require("../server/db")

try {
    const guest = User.findOne({where: {adminRights: false, isGuest: true}}).then((usr) =>
        console.log(`GUEST_TOKEN=${usr.generateToken()}`)
    )
    const user = User.findOne({where: {username: "demo_user", adminRights: false, isGuest: false}}).then((usr) =>
        console.log(`USER_TOKEN=${usr.generateToken()}`)
    )
    const admin = User.findOne({where: {adminRights: true}}).then((usr) =>
        console.log(`ADMIN_TOKEN=${usr.generateToken()}`)
    )
} catch(err){
    console.log("Could not get tokens, error message:")
    console.log(err.message)
}

