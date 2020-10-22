function validateRegistration(){
    var pass  = document.getElementById("password").value;
    var rpass  = document.getElementById("repeat-password").value;
    if(pass != rpass){
        $('#message').html("Entered Password is not matching!!");
        return false;
    }else {
        $('#message').html("");
        return true;
    }

}

function checkUser(){
    let username  = document.getElementById("username").value;
    fetch("/register/isUserExist/"+username, {
        method: 'GET',
        headers: {
            'content-type': 'application/json; charset=UTF-8' // Indicates the content
        }
    }).then(res => {
        return res.json();
    }).then(res => {
        console.log(res);
        if(res.success == true){

            alert(res.message);
        } else {
            alert(res.message);
        }
    }).catch(err => {
        alert(err);console.log(err);
    });

}
