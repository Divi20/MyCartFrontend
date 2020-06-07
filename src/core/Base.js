import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = " text-white p-4",
  children
}) => (
  <div>
    <Menu />
   
      <div className="jumbotron bg-dark text-white text-center">
     <div className="row" style={{justifyContent:"center"}}>
     <h1>Welcome to</h1>
     <img src="assets/ban.jpg" style={{padding:"10px"}}></img>
     <h1>MyCart</h1>
     </div>
       
      </div>
      <div className={className}>{children}</div>
  
    <footer className="footer bg-dark mt-auto py-3" style={{top:"0%"}}>
      <div className="container-fluid text-white text-center py-3">
        <h4>For help, feel free to reach out!</h4>
        <a className="btn btn-warning btn-lg" href="https://mail.google.com/mail/u/0/#inbox?compose=new">Contact Us</a>
      </div>
    </footer>
  </div>
);

export default Base;
