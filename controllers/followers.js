var Followers = require('./../models/followers');
var sessionstorage = require('sessionstorage');
var fs = require('fs');



exports.getFollowers = async (req,res)=>{
    if(sessionstorage.getItem('USER_ID') == null)
    {
        res.render('login', { title: 'Login Page' });
    }else{
   await Followers.find({userId:sessionstorage.getItem('USER_ID')}, (err, users) => {
    if (err) {
        console.log(err);
        res.end();
    }
    else {
        console.log(users);
        res.render('followers', {title:'Follower Page', users: users });
        }
    });
  }
}

exports.addFollower = async (req,res)=>{
    var obj = {
        userId:sessionstorage.getItem('USER_ID'),
        followFirstName: req.body.firstname,
        followLastName: req.body.lastname,
        followEmail:req.body.email,
        img: {
            data: new Buffer.from(fs.readFileSync(req.file.path), 'base64'),
            contentType: req.file.mimetype
        }
    }
    Followers.create(obj, (err, item) => {
        if (err) {
            console.log(err);
            res.send({success:false,message:"Some error occured!! Try Again!!!"});
            res.end();
        }
        else {
            // item.save();
            res.redirect('/followers');
        }
    });
}

exports.deleteFollowers = async (req,res)=>{
    console.log(req.params.id);

    Followers.deleteOne({_id: req.params.id})
        .then(result=>{
            res.redirect('/followers');
        }).catch(err=>{
        console.log(err);
        res.json({success: false, message: "Error occurred"});
    });

};







