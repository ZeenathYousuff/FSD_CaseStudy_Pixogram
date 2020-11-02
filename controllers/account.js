var Newsfeed = require('./../models/newsfeed');
var sessionstorage = require('sessionstorage');

exports.getAccount = async (req,res)=>{
    //res.render('account', {title:'Account Page'});
    if(sessionstorage.getItem('USER_ID') == null)
    {
        res.render('login', { title: 'Login Page' });
    }else{
    await Newsfeed.find({userId:sessionstorage.getItem('USER_ID')}, (err, newsfeeds) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            console.log(newsfeeds);
            res.render('account', {title:'Account Page', newsfeeds: newsfeeds});
            }
        });
    }
}