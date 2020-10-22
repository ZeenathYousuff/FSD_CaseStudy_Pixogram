const Users = require("./../models/register");
let jwt = require('jsonwebtoken');
const jwtOptions = require('./jwt-options');
const bcrypt = require('bcrypt');

module.exports = async function(user, res){
  // actual must be in database, find data if matched

      await Users.findOne({username:user.username}).then(resUser =>{
        if(!resUser){
            res.json({success:false,message:"User not found"});
        }
        else{
            console.log(resUser);
            bcrypt.compare(user.password, resUser.password).then(function(match) {

                if(match){
                    console.log("password matched");
                    let payload = {id: resUser.id, username:resUser.username, email: resUser.email};
                    let token = jwt.sign(payload, jwtOptions.secretOrKey);

                    res.json({success: true, token: token});
                }
                else{
                   res.status(203).json({success:false, message:"Invalid Password"});
                }
            });

        }
    })


    /*var isValid = true;
    if(isValid){
        var payload = {id: 1254, username: "mark carl", email: "mark.carl@gmail.com", role: "user"};

          let token = jwt.sign(payload, jwtOptions.secretOrKey);
          
          res.json({success: true, token: token});

    } else {
        res.json({success: false, message:"User not found in database"});
    }
*/
}
