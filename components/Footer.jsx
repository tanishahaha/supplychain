"use client"
import React from "react";
import { FaInstagram } from 'react-icons/fa';
const Footer=()=>{
  // const footnavs=[
  //   {
  //     href:"#",
  //     name:"Terms",
  //   },
  //   {
  //     href:"#",
  //     name:"License",
  //   },
  //   {
  //     href:"#",
  //     name:"Privacy",
  //   },
  //   {
  //     href:"#",
  //     name:"About us",
  //   },
  // ]
  return(
    <footer className="pt-40">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
          <h1 href="#" className="text-2xl font-bold text-black mr-48">
            <span className="text-black"></span> web3<span className="text-green-400">Galaxy</span>
          </h1> 
            <p className="max-w-md">Supply chain project in making</p>

            {/* <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {
                footnavs.map((item,key)=>{
                  <li className="text-gray-800 hover:text-gray-500 duration-150">
                    <a href={item.href} key={key}>{item.name}</a>
                  </li>
                })
              }

            </ul> */}
          </div>

          <div className="mt-6 flex items-center flex-col">
            <p className="text-gray-800 font-semibold">Connect with us</p>
            <div className=" gap-3 mt-3 sm:block">
            <a href="https://www.instagram.com/web3galaxyy/" target="blank" >
                <FaInstagram className="text-2xl text-gray-700 hover:text-gray-500 duration-150" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 py-10 border-t md:text-center text-green-600">
          <p>@ 2024 web3galaxy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;