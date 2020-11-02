function updateAccount(id){

    var pass  = document.getElementById("password").value;
    var rpass  = document.getElementById("repeat-password").value;
    if(pass != rpass){
        $('#message').html("Entered Password is not matching!!");
        return false;
    }else {
        $('#message').html("");
        
    
    alert(id);
    fetch("/accountUpdate/"+id, {
        method: 'PUT',
        enctype: 'multipart/form-data',
        body:JSON.stringify({firstname:$("#firstname").val(),lastname:$("#lastname").val(),email:$("#email").val(),username:$("#username").val(),password:$("#password").val()}),
        headers: {
            'content-type': 'application/json; charset=UTF-8' // Indicates the content
        }
    }).then(res => {
       // return res.json();
    }).then(res => {
        console.log(res);// {success: true/false, data: {}, message: ""}
        alert("Successfully Updated")
        window.location.href = '/accountUpdate';
        
    }).catch(err => {
        alert(err);
        console.log(err);
    });
  }
}