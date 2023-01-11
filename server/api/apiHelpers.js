const { models: { User }} = require('../db')

function verifyInteger(req, res, next){
    try {
      const num = Number(req.params.id)
      if (num < 0 || num > 5000000000){
        throw new Error(`${num}: integer is out of bounds`)
      } else if (!Number.isInteger(num)){
        throw new Error(`"${req.params.id}" is not an integer`)
      } else {
        next()
      }
    } catch(err){
      next(err)
    }
}

async function verifyIsSpecificUserOrAdmin(req, res, next){
    try{
        const { id } = req.params
        const token = req.headers.authorization
        const user = await User.findByToken(token)
        if (user.adminRights || id === user.id){
            next()
        } else{
            throw new Error("Do not have permission to access this user.")
        }
    } catch(err){
        next(err)
    }
}

async function verifyIsAdmin(req, res, next){
    try{
        const token = req.headers.authorization
        const user = await User.findByToken(token)
        if (user.adminRights){
            next()
        } else{
            throw new Error("Only allowed for admin users.")
        }
    } catch(err){
        next(err)
    }
}

const requireToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const user = await User.byToken(token);
      req.user = user;
      next();
    } catch(error) {
      next(error);
    }
  };

const attachUserDataToReq = async (req, res, next) => {
    try{ 
        const token = req.headers.authorization
        const user = await User.findByToken(token)
        req.user = "jackie" // user
        next();
    } catch(err){
        req.user = "cindy"
        next()
    }
}

module.exports = { 
    verifyInteger,
    verifyIsSpecificUserOrAdmin,
    verifyIsAdmin,
    attachUserDataToReq
}