const Users = require("./../models/register");
let jwt = require('jsonwebtoken');
const jwtOptions = require('./jwt-options');
const bcrypt = require('bcrypt');
let foundUser = {};

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

                   // res.json({success: true, token: token});
                    module.exports.foundUser = resUser;
                    res.redirect('/uploadSingleMedia');
                   // res.render('uploadSingleMedia', { data:{ titleView: 'Upload Page'}, data: { resUser } });
                }
                else{
                   res.status(203).json({success:false, message:"Invalid Password"});
                }
            });

        }
    })
}

//module.exports.foundUser = foundUser;
