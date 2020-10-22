let passportJWT = require("passport-jwt");

module.exports = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: "5om353cr3tk3y"
  }
  
  
  
  