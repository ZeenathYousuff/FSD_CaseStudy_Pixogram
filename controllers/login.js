
var sessionstorage = require('sessionstorage');

exports.getLoginUser = (req,res)=>{
    sessionstorage.removeItem('USER_ID');
    sessionstorage.clear();
    res.render('login', { title: 'Login Page' });
}

exports.loginUser = (req,res)=>{
    require(__dirname + '/../utility/token')({ username: req.body.username, password: req.body.password }, res);
}