"use client";
import React from "react";
import { useState,useEffect,useContext } from "react";
import { Trackingcontext } from "@/context/Tracking";
// import {FiOpen} from "react-icons";

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
    };
  },[]);


  return(
    <nav className={`bg-white pb-5 md:text-sm ${
      state?"shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0":""
    }`}>

      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <h1 href="#" className="underline-none ">web3<span className="text-green-400">Galaxy</span></h1>
          <div className="md:hidden">
            <button className="menu-btn text-gray-500 hover:text-gray-800" onclick={()=>setstate(!state)}>
              {state? "this":"that"}
            </button>

          </div>

        </div>

        <div className={ `flex-1 items-center mt-8 md:mt-0 md:flex ${
          state?"block":"hidden"
        }`}>

          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {
              navigation.map((item,key)=>{
                return(
                  <li key={key} className="text-gray-700 hover:text-gray-900">
                    <a href={item.path} className="block">{item.title}</a>
                  </li>
                )
              })
            }
          </ul>

          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            {
              curruser?(
                <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">{curruser.slice(0,25)}</p>
              ):(
                <button onclick={()=>connectwallet()} className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                  Connect Wallet
                </button>
              )
            }
          </div>

        </div>

      </div>

      
    </nav>
  )
}

export default Navbar;