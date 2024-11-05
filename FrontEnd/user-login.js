//user login
function UserLogin(event){

    event.preventDefault();

    const form = document.getElementById('loginForm');
    if (!form.checkValidity()) {
        
        form.reportValidity(); 
        return;
    }

    un = document.getElementById('loginEmailPhone').value;
    pw = document.getElementById('loginPassword').value;
    // console.log(un,pw);
    fetch('http://127.0.0.1:3000/user/login',{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify({ email:un, password :pw, is_doctor:false }),
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('error');
        }
        return response.json();
    })
    .then(data=>{
        token = data.token;
        
        localStorage.setItem('token',token);
        window.location.href = "user-data.html";

    })
    .catch(err=>{
        alert('Invalid username/password');
    })

    document.getElementById('loginEmailPhone').value='';
    document.getElementById('loginPassword').value='';
}


//user-signup
function UserCreate(event){
    event.preventDefault();
    const form = document.getElementById('signupForm');
    if (!form.checkValidity()) {
        
        form.reportValidity(); 
        return;
    }
    
    fetch('http://127.0.0.1:3000/user/create',{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById("signupName").value,
            email: document.getElementById("signupEmail").value,
            password: document.getElementById("signupPassword").value,
            DOB: document.getElementById("dob").value,
            address: document.getElementById("signupAddress").value,
            gender: document.getElementById("gender").value,
            is_doctor: false
        })    
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('error');
        }
        return response.json();
    })
    .then(()=>{
        alert('user succesfully created');
    })
    .catch(()=>{
        alert('user already exist');
    })
    

    document.getElementById("signupName").value = '';
    document.getElementById("signupEmail").value = '';
    document.getElementById("signupPassword").value = '';
    document.getElementById("dob").value = '';
    document.getElementById("signupAddress").value = '';
    document.getElementById("gender").value = '';
}