
module.exports = function(req, res, next){
    console.log('in middleware to find if admin');
    if(req.user.role === 'admin'){
        next();
    } else {
        res.json({ success: false, message: "Access denied" });
    }
}
