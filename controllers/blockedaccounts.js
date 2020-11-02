var Blockedusers = require('./../models/blockedusers');
var sessionstorage = require('sessionstorage');
var fs = require('fs');



exports.getBlockedAccounts = async (req,res)=>{
    if(sessionstorage.getItem('USER_ID') == null)
    {
        res.render('login', { title: 'Login Page' });
    }else{
   await Blockedusers.find({userId:sessionstorage.getItem('USER_ID')}, (err, users) => {
    if (err) {
        console.log(err);
        res.end();
    }
    else {
        console.log(users);
        res.render('blockedaccounts', {title:'Blocked Accounts Page', users: users });
        }
    });
}
}

exports.blockAccount = async (req,res)=>{
    var obj = {
        userId:sessionstorage.getItem('USER_ID'),
        blockedFirstName: req.body.firstname,
        blockedLastName: req.body.lastname,
        blockedEmail:req.body.email,
        img: {
            data: new Buffer.from(fs.readFileSync(req.file.path), 'base64'),
            contentType: req.file.mimetype
        }
    }
    Blockedusers.create(obj, (err, item) => {
        if (err) {
            console.log(err);
            res.send({success:false,message:"Some error occured!! Try Again!!!"});
            res.end();
        }
        else {
            // item.save();
            res.redirect('/blockedaccounts');
        }
    });
}

exports.unblockAccounts = async (req,res)=>{
    console.log(req.params.id);

    Blockedusers.deleteOne({_id: req.params.id})
        .then(result=>{
            res.redirect('/blockedaccounts');
        }).catch(err=>{
        console.log(err);
        res.json({success: false, message: "Error occurred"});
    });

};