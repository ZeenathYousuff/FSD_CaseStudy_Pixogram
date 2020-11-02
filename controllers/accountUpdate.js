var Users = require('./../models/register');
var sessionstorage = require('sessionstorage');
var fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getAccount = async (req,res)=>{
  //  res.render('accountUpdate', {title:'Account Update Page'});
  if(sessionstorage.getItem('USER_ID') == null)
    {
        res.render('login', { title: 'Login Page' });
    }else{

  await Users.findOne({_id:sessionstorage.getItem('USER_ID')}).then(user=>{
    console.log(user);
    if (!user)
        res.json({success:true,message:"User not found!! Login First"});

    console.log(user);
    res.render('accountUpdate', {title:'Account Update Page',user:user});
}).catch(err=>{
    console.log(err);
    res.json({success: false, message: "Error occurred"});
});
}

}

exports.updateAccount = async (req,res)=>{
bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            let user = {
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: hash,
            };
            console.log("User izzzz",user);
            Users.findByIdAndUpdate(req.params.id,user, (err, item) => {
                if (err) {
                    console.log('validation error',reason.message);
                    res.status(400).send(reason.message);
                    res.end();
                }
                else {
                    res.render('/accountUpdate', {title:'Account Update Page'});
                    console.log("User saved");
                  //  res.send(user);
                }
            });
        });

}