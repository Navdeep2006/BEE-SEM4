import React from 'react'
import { FEEP } from '../config'

function NavBar() {
  return (
    <div className="navbar">
        <div className="navbar-left">
            <img src="src\assets\MEDSCRIBE.png" alt="Logo"/> 
        </div>
        <div className="navbar-right">
            <a href={`${FEEP}/index.html`}>Home</a>
            <a href="#complains">Complains</a>
            <a href="#history">My History</a>
            <a href="#account">My Account</a>
        </div>
    </div>
  )
}

export default NavBar
