import React from 'react'
import "../css/create-report.css"
import { useNavigate } from 'react-router-dom';

function CreateReport() {

  const navigate = useNavigate()

  function create_report(event){

    event.preventDefault();

    const form = document.getElementById('report-form');
    if (!form.checkValidity()) {
        
        form.reportValidity(); 
        return;
    }

    var report_user = document.getElementById('email').value;
    var report_Heading = document.getElementById('heading').value;
    var report_description = document.getElementById('description').value;

    const today = new Date();
    var today_date = today.toDateString();

    let pdf_input = document.getElementById('pdf');
    let pdf_data = pdf_input.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(pdf_data);

    reader.onload = function(){
        var base64pdf = reader.result;
        const token = localStorage.getItem('token');
        fetch('http://127.0.0.1:3000/report/create',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user: report_user,
                date: today_date,
                Heading: report_Heading,
                description: report_description,
                assets: [base64pdf,"future use"]
            })
            })
            .then(response=>{
                if(!response.ok){
                    throw new Error('error');
                }
                return response.json();
            })
            .then(()=>{
                alert('report succesfully created');
                navigate('/report');
            })
            .catch(()=>{
                alert('some error occured');
            })
            document.getElementById('email').value = '';
            document.getElementById('heading').value = '';
            document.getElementById('description').value = '';
    }
}

  return (
    <div>
        <div id="create-user-form">
        <div className="create-user-form-left" style={{width: "50%", overflow: "hidden"}}>
            <img src="src\assets\create-user-report.png" style={{position: "relative", top: "50px"}}/>
        </div>
        <div className="create-user-form-right">
            <h1>Submit Your Information</h1>

            <form  id="report-form">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />

                <label htmlFor="heading">Heading:</label>
                <input type="text" id="heading" name="heading" placeholder="Enter a heading" required />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" rows="5" placeholder="Enter a description" required></textarea>

                <label htmlFor="pdf" style={{fontFamily: "Josefin Sans"}}>Upload PDF:</label>
                <input type="file" id="pdf" name="pdf" accept="application/pdf" required/>
                <button type="submit" onClick={(event) => {
                    create_report(event)
                  }}>Create</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default CreateReport
