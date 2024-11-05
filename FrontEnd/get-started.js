const token = localStorage.getItem('token');

//checking if token is already exist
if(token){
    let payload = token.split('.')[1];
    payload = payload.replace(/-/g, '+').replace(/_/g, '/');
    payload = atob(payload);
    let body = decodeURIComponent(escape(payload));
    body=JSON.parse(body);
    is_doctor = body.is_doctor;

    //directing to right page
    if(is_doctor){
        window.location.href='doctor-data.html';
    }
    else{
        window.location.href='user-data.html';
    }
}