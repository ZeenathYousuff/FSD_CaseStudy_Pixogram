exports.getLoginUser = (req,res)=>{
    res.render('login', { title: 'Login Page' });
}

exports.loginUser = (req,res)=>{
    require(__dirname + '/../utility/token')({ username: req.body.username, password: req.body.password }, res);
}