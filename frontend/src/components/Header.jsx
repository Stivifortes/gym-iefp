import React from "react";
import "./Header.css"


export default function Header() {
    return(
       <nav className="header">
        <div className="logo">
            <img src="/public/Black 2.png" alt="logo" className="logo-img"/>
        </div>
        <div className="menu">
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className="login">
            <button className="login-button">Login</button>
        </div>
       </nav>
    )
}