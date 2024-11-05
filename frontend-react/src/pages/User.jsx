import React, { useState } from 'react'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';

function Signin(){
    const navigate = useNavigate()

    function DoctorLogin(event){

        event.preventDefault();
    
        const form = document.getElementById('loginForm');
        if (!form.checkValidity()) {
            
            form.reportValidity(); 
            return;
        }
    
        let un = document.getElementById('loginEmailPhone').value;
        let pw = document.getElementById('loginPassword').value;
        fetch('http://127.0.0.1:3000/user/login',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({ email:un, password :pw, is_doctor:true }),
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('error');
            }
            return response.json();
        })
        .then(data=>{
            let token = data.token;
            console.log("GOT IT", token)
            localStorage.setItem('token',token);
            localStorage.setItem('is_doc',  1)
            navigate("/report");    
        })
        .catch(err=>{
            alert('Invalid username/password');
        })
        
        document.getElementById('loginEmailPhone').value='';
        document.getElementById('loginPassword').value='';
        
        
    }
    
    function UserLogin(event){
        event.preventDefault();
        
        const form = document.getElementById('loginForm');
        if (!form.checkValidity()) {
            form.reportValidity(); 
            return;
        }
        
        let un = document.getElementById('loginEmailPhone').value;
        let pw = document.getElementById('loginPassword').value;
        
        fetch('http://127.0.0.1:3000/user/login',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({email:un, password :pw, is_doctor:false}),
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('error');
            }
            return response.json();
        })
        .then(data=>{
            let token = data.token;
            localStorage.setItem('token',token);
            localStorage.setItem('is_doc',  0)
            navigate("/report");
    
        })
        .catch(err=>{
            alert('Invalid username/password');
        })
    
        document.getElementById('loginEmailPhone').value='';
        document.getElementById('loginPassword').value='';
    }

    const isDoctor = location.href.includes('doctor')

    return (
        <form id="loginForm" method='post' className="form active-form">
            <h2>Login</h2>
            <label htmlFor="loginEmailPhone">Email/Phone:</label>
            <input type="text" id="loginEmailPhone" name="loginEmailPhone" required/>

            <label htmlFor="loginPassword">Password:</label>
            <input type="password" id="loginPassword" name="loginPassword" minLength="8" required/>

            <button type="submit" onClick={(event) => {
                if(isDoctor){
                    DoctorLogin(event)
                }
                else{
                    UserLogin(event)
                }
            }}>Login</button>
        </form>
    )
}

function Signup(){

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

    function DoctorCreate(event){
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
                is_doctor: true
            })    
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('error');
            }
            return response.json();
        })
        .then(()=>{
            alert('Doctor succesfully created');
        })
        .catch(()=>{
            alert('Doctor already exist');
        })
        
    
        document.getElementById("signupName").value = '';
        document.getElementById("signupEmail").value = '';
        document.getElementById("signupPassword").value = '';
        document.getElementById("dob").value = '';
        document.getElementById("signupAddress").value = '';
        document.getElementById("gender").value = '';
    }

    const isDoctor = location.href.includes('doctor')

    return (
        <form id="signupForm" className="form active-form">
            <h2>Sign Up</h2>
            <label htmlFor="signupName">Name:</label>
            <input type="text" id="signupName" name="signupName" required/>

            <label htmlFor="signupEmail">Email:</label>
            <input type="email" id="signupEmail" name="signupEmail" required/>

            <label htmlFor="signupPassword">Password:</label>
            <input type="password" id="signupPassword" name="signupPassword" minLength="8" required/>

            <label htmlFor="signupAddress">Address:</label>
            <input type="text" id="signupAddress" name="signupAddress" required/>

            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" required>
                <option value="" disabled selected>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" required/>

            <button type="submit" onClick={(event) => {
                if(isDoctor){
                    DoctorCreate(event)
                }
                else{
                    UserCreate(event)
                }
            }}>Sign Up</button>
        </form>
    )
}

function User() {

    const [signin, setSignin] = useState(true)

    return (
        <div>
            <img src="./src/assets/logo.png" alt="" style={{position: "absolute", left:"700px", width: "170px", height: "150px",}} id="rotating-img" />

            <div className="form-parent-ctn">
            <div className="form-parent-img">
                <img src="./src/assets/form-parent-img.png" alt=""/>
            </div>

            <div className="form-container">
                <div className="form-toggle">
                    <button id="loginBtn" className={`toggle-btn ${signin ? 'active' : ''}`} onClick={() => {
                        setSignin(!signin)
                    }}>Login</button>
                    <button id="signupBtn" className={`toggle-btn ${!signin ? 'active' : ''}`} onClick={() => {
                        setSignin(!signin)
                    }}>Sign Up</button>
                </div>
                    {signin ? <Signin/> : <Signup/>}
            </div>
        </div>

        <Footer/>

    </div>


    )
}

export default User
