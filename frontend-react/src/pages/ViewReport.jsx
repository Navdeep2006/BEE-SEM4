import React, { useEffect, useState } from 'react'
import "../css/user-data.css"
import "../index.css"
import { useNavigate } from 'react-router-dom'

function UserReport({report}) {

    const pdf_data = report.assets[0]

    return (
        <div id="user-data-ctn-history-ctn" style={{margin: "auto", marginTop:"5px"}}>
            <div id="user-data-history-line1">
                <h3>DATE: <span>{report.date}</span></h3>
                <h3 style={{width: "40%"}}>HEADING:<span>{report.Heading}</span></h3>
            </div>
            <div id="user-data-history-line2">
                <div style={{display:"flex", flexDirection:"column"}}>
                    <h3 style={{minWidth: "30%"}}>PATIENT'S EMAIL: <span>{report.user}</span></h3> 
                    <h3 style={{minWidth: "30%"}}>DOCTOR EMAIL: {report.doctor}</h3>
                </div>
                <h3 style={{minWidth: "50%"}}>DESCRIPTION: <span style={{fontSize: "15px"}}>{report.description}</span></h3>

            </div>
            <div id="user-data-history-line3">
                <button onClick={() => {

                }}><p style={{color:"black"}}>view pdf</p></button>
            </div>
        </div>)
}

function ViewReport() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        name: "Navdeep",
        gender: "Male",
        DOB: 'January 22 2004',
        email: "example@example.com",
        address: ""
    })

    const [reports, setReports] = useState([{
        assets:[],
        user: 'user',
        doctor: 'abc@gmail.com',
        description: '',
        Heading: '',
        date: '',
    }])

    function put_user_data(data){
        setUserData({...data})
    }

    function put_user_report(data){
        setReports([...data])
    }

    function fetchDetails(user_email) {
        // fetching doctor data
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
    }

    function fetchReports(token){
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
                data && put_user_report([...data]);
            })
            .catch(err=>{
                alert('unexpected error occured please come back later');
            })
    }



    useEffect(() => {
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
        let user_email=body.email;

        fetchDetails(user_email)

        fetchReports(token)        
    }, [])


    return (
        <div>
            <h1>{parseInt(localStorage.getItem('is_doc')) ? "Doctor's Dashboard" : "Report"}</h1>
            {parseInt(localStorage.getItem('is_doc'))?
            <>
                <button className="view-rpt-btn" onClick={() => {
                    window.location.href = "http://localhost:5173/user";
                }}>create-user</button>

                <button className="view-rpt-btn-1" onClick={() => {
                    navigate('/create')
                }}>create-report</button>
            </>
            :null
            }

            <div id="user-data-ctn">
                <div id="user-data-ctn-profile">
                    <img src="src\assets\img.png" />
                    <h3 id="user-name">{userData.name}</h3>
                    <button id="user-datat-logout-btn" onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = "http://127.0.0.1:5500/FrontEnd/get-started.html";
                    }}>LOGOUT</button>
                </div>
                <div id="user-data-ctn-data">
                    <div className="item"><h4 id="user-gender">Gender: {userData.gender}</h4></div>
                    <div className="item"><h4 id="user-DOB">Date of Birth: {userData.DOB}</h4></div>
                    <div className="item"><h4 id="user-Email">Email: {userData.email}</h4></div>
                    <div className="item"><h4 id="user-Address">Address: {userData.address}</h4></div>
                </div>
            </div>

            <hr/>

            <h2>
                {parseInt(localStorage.getItem('is_doc')) ? "Reports created by you":"Medical-History"}
            </h2>
            
            <div id="user-data-ctn-history">
                {reports ? reports.map((report, id) => {
                    return <UserReport report={report} key={id}/>
                }): ""}
            </div>
        </div>
    )
}

export default ViewReport
