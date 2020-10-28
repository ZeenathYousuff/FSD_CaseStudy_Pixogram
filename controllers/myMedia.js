var Image = require('./../models/image');

exports.getMyMedia = (req,res)=>{
    //5f9020fda253d93ddc84a51f
    Image.find({userId: req.params.userId}, (err, images) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            if(images.length > 0){
                res.render('myMedia', {title:'My Media Page', images: images });
            }else{

            }

        }
    });
}
