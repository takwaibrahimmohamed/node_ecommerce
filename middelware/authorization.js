const APIError = require("../utils/APIError");
const authorizeRoles = (...roles) => {
    
    return (req, res, next) => {
        console.log(req.user)
        if (!req.user) {
            return next(new APIError("Not authenticated", 401)); 
          }
      if (!roles.includes(req.user.role)) {
        return next(new APIError("Not authorized for this action", 403));
      }
      next();
    };
  };
  
  module.exports = { authorizeRoles };