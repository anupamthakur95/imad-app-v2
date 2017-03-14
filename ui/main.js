var button=document.getElementById('submit_btn');
submit.onClick=function() {
    var request=new XMLHttpRequest();
    request.onreadystatechange=function() {
        if(request.readyState===XMLHttpRequest.Done){
            if (request.status===200){
                alert('logged in successfully');
            } else if(request.status===403){
                alert('username/password is incorrect');
            } else if(request.status===500){
                alert('something went wrong on the server');
            }
        }
    };

    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    request.open('POST','http://anupamthakur95.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type','ápplication/json');
    request.send(JSON.strinfigy({username:username,password: password}));
};
