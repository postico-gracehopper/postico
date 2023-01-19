const {
  models: { User },
} = require('../db');

const attachUserDataToReq = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const user = await User.findByToken(token);
    if (user === null) throw new Error('Must have token to access api');
    req.user = user;
    next();
  } catch (err) {
    err.status = 404;
    err.message = 'user with token not found';
    next(err);
  }
};

function verifyInteger(req, res, next) {
  try {
    const num = Number(req.params.id);
    if (num < 0 || num > 5000000000) {
      throw new Error(`${num}: integer is out of bounds`);
    } else if (!Number.isInteger(num)) {
      throw new Error(`"${req.params.id}" is not an integer`);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function verifyIsSpecificUserOrAdmin(req, res, next) {
  try {
    const { id: requestId } = req.params;
    const { id: userId } = req.user;
    if (requestId === String(userId) || req.user.adminRights) {
      next();
    } else {
      throw new Error('Permission denied - must be admin or specific user');
    }
  } catch (err) {
    err.status = 401;
    err.message = 'Must be admin or specific user';
    next(err);
  }
}

async function verifyIsAdmin(req, res, next) {
  try {
    if (req.user.adminRights) {
      next();
    } else {
      throw new Error('Only allowed for admin users.');
    }
  } catch (err) {
    err.status = 401;
    err.message = 'Must be admin user';
    next(err);
  }
}

async function verifyNotGuest(req, res, next) {
  try {
    if (req.user.isGuest) {
      throw new Error('Guest cannot access');
    } else {
      next();
    }
  } catch (err) {
    err.status = 401;
    err.message = 'Guest cannot access user data';
    next(err);
  }
}

async function verifyOwnsOrderOrIsAdmin(req, res, next) {
  if (req.user.adminRights) {
    next();
  } else {
    try {
      const orderNums = await req.user.getOrderNumbers();
      const { id } = req.params;
      if (orderNums.includes(id)) {
        next();
      } else {
        throw new Error('User does not own this order');
      }
    } catch (err) {
      err.status = 401;
      err.message = 'User does not own this order';
    }
  }
}

async function verifyOwnsOrderItemOrIsAdmin(req, res, next) {
  if (req.user.adminRights) {
    next();
  } else {
    try {
      const { orderItemId } = req.body;
      const ownedOrderItemNums = await req.user.getAllActiveOrderItemNums();
      console.log('ownedOrderItemNums: ', ownedOrderItemNums);
      if (ownedOrderItemNums.includes(orderItemId)) {
        next();
      } else {
        throw new Error('User does not own this order');
      }
    } catch (err) {
      console.log(err);
      err.status = 401;
      err.message = 'User does not own this order';
    }
  }
}

module.exports = {
  attachUserDataToReq,
  verifyInteger,
  verifyIsSpecificUserOrAdmin,
  verifyIsAdmin,
  verifyNotGuest,
  verifyOwnsOrderOrIsAdmin,
  verifyOwnsOrderItemOrIsAdmin,
};
