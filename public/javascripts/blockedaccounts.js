function unblockUser(id){
    alert(id);
    fetch("/blockedaccounts/"+id, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json; charset=UTF-8' // Indicates the content
        }
    }).then(res => {
       // return res.json();
    }).then(res => {
        console.log(res);// {success: true/false, data: {}, message: ""}
        alert("Successfully Unblocked")
        window.location.href = '/blockedaccounts';
        
    }).catch(err => {
        alert(err);
        console.log(err);
    });
}