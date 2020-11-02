var Image = require('./../models/image');
var sessionstorage = require('sessionstorage');

exports.getMyMedia = (req,res)=>{
    //5f9020fda253d93ddc84a51f

    if(sessionstorage.getItem('USER_ID') == null)
    {
        res.render('login', { title: 'Login Page' });
    }else{

    Image.find({userId:sessionstorage.getItem('USER_ID')}, (err, images) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            
                res.render('myMedia', {title:'My Media Page', images: images });
        }
    });
  }
}
