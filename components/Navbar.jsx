import React from "react";
import { useState,useEffect,useContext } from "react";
import { Trackingcontext } from "@/context/Tracking";

const Navbar=()=>{

  const [state,setstate]=useState(false);
  const {curruser,connectwallet}=useContext(Trackingcontext);

  const navigation=[
    {title:"Home",path:"#"},
    {title:"Services",path:"#"},
    {title:"Contact Us",path:"#"},
    {title:"Erc20",path:"#"},
  ];

  useEffect(()=>{
    document.onclick=(e)=>{
      const target=e.target;
      if(!target.closest(".menu-btn") ) setstate(false);
    }
  },[]);


  return(
    <nav>
      
      navbar
    </nav>
  )
}

export default Navbar;