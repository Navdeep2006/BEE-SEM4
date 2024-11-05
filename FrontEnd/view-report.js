//logout button
function UserLogout(){
    localStorage.removeItem('token');
    window.location.href = "get-started.html";
}

//Create User button
function CreateUser(){
    window.location.href = "user-login.html";
}   

//Create User Report button
function CreateReport(){
    window.location.href = "create-report.html";
}

function put_user_data(data){
    document.getElementById('user-name').innerText=data.name;
    document.getElementById('user-gender').innerText='Gender: '+ data.gender;
    document.getElementById('user-DOB').innerText='Date of Birth: ' + data.DOB;
    document.getElementById('user-Email').innerText='Email: ' + data.email;
    document.getElementById('user-Address').innerText='Address: ' + data.address;
}

async function get_patient_name(email){
    const respone = await fetch('http://127.0.0.1:3000/user',{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({email: email}),
                            });
    const data = await respone.json();
    return data.name;
}

function put_user_report(data){
    const main_div = document.getElementById('user-data-ctn-history');
    main_div.innerHTML='';
    data.forEach(async function(report){
        const report_div = document.createElement('div');
        const patient_name = await get_patient_name(report.user);
        const pdf_data = report.assets[0];
        report_div.innerHTML=`<div id="user-data-ctn-history">
                                    <div id="user-data-ctn-history-ctn" style="margin: auto;">
                                        <div id="user-data-history-line1">
                                            <h3>DATE: <span>${report.date}</span></h3>
                                            <h3 style="width: 40%;">HEADING:<span>${report.Heading}</span></h3>
                                        </div>
                                        <div id="user-data-history-line2">
                                            <h3 style="min-width: 30%;">PATIENT'S NAME: <span>${patient_name}</span></h3> 
                                            <h3 style="min-width: 50%;">DESCRIPTION: <span style="font-size: 15px;">${report.description}</span></h3>


                                        </div>
                                        <div id="user-data-history-line3">
                                            <button onclick="viewPDF('${pdf_data}')"><p style="text-decoration: none; color: black;">view pdf</p></button>
                                        </div>
                                    </div>
                                </div>`;

        main_div.appendChild(report_div);
    });
}

//viewing the pdf data
function viewPDF(pdf_data){
    const new_window = window.open();
    new_window.document.write(`<iframe src="${pdf_data}" style="width: 100%; height: 100%;" frameborder="0"></iframe>`)
}

// checking token
const token = localStorage.getItem('token');

if(!token){
    window.location.href='get-started.html';
}



//getting email from jwt token
let payload = token.split('.')[1];
payload = payload.replace(/-/g, '+').replace(/_/g, '/');
payload = atob(payload);
let body = decodeURIComponent(escape(payload));
body=JSON.parse(body);
user_email=body.email;


//fetching doctor data
fetch("http://127.0.0.1:3000/user",{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: user_email}),
})
.then(function(response){
    if(!response.ok){
        throw new Error('error');
    }

    return response.json();
})
.then(data=>{
    put_user_data(data)
})
.catch(err=>{
    alert('unexpected error occured please come back later');
})



//fetching users report
// console.log(token);
fetch('http://127.0.0.1:3000/reports',{
    method: 'GET',
    headers:{
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
    }
})
.then(function(response){
    if(!response.ok){
        throw new Error('error');
    }

    return response.json();
})
.then(data=>{
    put_user_report(data);
})
.catch(err=>{
    alert('unexpected error occured please come back later');
})

