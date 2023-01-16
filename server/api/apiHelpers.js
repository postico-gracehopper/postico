const e = require('express')
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

const attachUserDataToReq = async (req, res, next) => {
  try{ 
      const {authorization: token} = req.headers
      const user = await User.findByToken(token)
      if (user === null) throw new Error("Must have token to access api")
      req.user = user
      next();
  } catch(err){
      next(err)
  }
}


async function verifyIsSpecificUserOrAdmin(req, res, next){
    try{
        const { id: requestId } = req.params
        const { id: userId } = req.user 
        if (requestId === String(userId) || req.user.adminRights){
          next()
        } else{
          throw new Error ("Permission denied - must be admin or specific user")
        }
    } catch(err){
        next(err)
    }
}

async function verifyIsAdmin(req, res, next){
    try{
        if (req.user.adminRights){
            next()
        } else{
            throw new Error("Only allowed for admin users.")
        }
    } catch(err){
        next(err)
    }
}

async function verifyNotGuest(req, res, next){
  try{
    if (req.user.isGuest) {
      throw new Error ("Guest cannot access")
    } else{
      next()
    }
  } catch(err){
    next(err)
  }
}

module.exports = { 
    verifyInteger,
    verifyIsSpecificUserOrAdmin,
    verifyIsAdmin,
    verifyNotGuest,
    attachUserDataToReq,
}