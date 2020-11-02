function unfollowUser(id){
    alert(id);
    fetch("/followers/"+id, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json; charset=UTF-8' // Indicates the content
        }
    }).then(res => {
       // return res.json();
    }).then(res => {
        console.log(res);// {success: true/false, data: {}, message: ""}
        alert("Successfully Unfollowed")
        window.location.href = '/followers';
        
    }).catch(err => {
        alert(err);
        console.log(err);
    });
}