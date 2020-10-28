//With model
var Users = require('./../models/register');
var fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getRegisterUser = (req,res)=>{
    res.render('register', { title: 'Register Page' });
}

exports.checkUser = async (req, res)=>
{
    let username=req.params.username;
    let result = await Users.findOne({username:username}).then(result=>{
        console.log(result);
        if (!result)
            res.json({success:true,message:"Username not found"});

        res.json({success:true,message:"Username already exist!! Try some other username"});
    }).catch(err=>{
        console.log(err);
        res.json({success: false, message: "Error occurred"});
    });

   // res.send(result);
    //const names = Name.fetchAll();
    //res.render('user',{names:names,pageTitle:'Display Name', path: '/user/print-name'})
}

exports.registerUser =async (req, res) =>
{
    let username=req.body.username;
    let result = await Users.findOne({username:username});
    if (!result)
    {
        console.log("Register called");
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            let user = {
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                dob:req.body.dob,
                password: hash,
                img: {
                    data: new Buffer.from(fs.readFileSync(req.file.path), 'base64'),
                    contentType: req.file.mimetype
                }
            };

            Users.create(user, (err, item) => {
                if (err) {
                    console.log('validation error',reason.message);
                    res.status(400).send(reason.message);
                    res.end();
                }
                else {
                    res.render('login', { data:{ titleView: 'Login Page'}, data: { user } });
                  //  console.log("User saved");
                  //  res.send(user);
                }
            });
        });

    }
    else{
        res.json({success:false,message:"User with username already exist!!! Try some other username"});
    }
}
