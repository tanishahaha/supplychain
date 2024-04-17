"use client"
import React from "react";
const Footer=()=>{
  const footnavs=[
    {
      href:"javascript:void()",
      name:"Terms",
    },
    {
      href:"javascript:void()",
      name:"License",
    },
    {
      href:"javascript:void()",
      name:"Privacy",
    },
    {
      href:"javascript:void()",
      name:"About us",
    },
  ]
  return(
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <h1>web3<span className="text-green-400">Galaxy</span></h1>
            <p className="max-w-md">Supply chain project in making</p>

            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {
                footnavs.map((item,key)=>{
                  <li className="text-gray-800 hover:text-gray-500 duration-150">
                    <a href={item.href} key={key}>{item.name}</a>
                  </li>
                })
              }

            </ul>
          </div>

          <div className="mt-6">
            <p className="text-gray-700 font-semibold">Get the app</p>
            <div className="flex items-center gap-3 mt-3 sm:block">
              <a href="javascript:void()">icon</a>
              <a href="javascript:void()">icon</a>
            </div>
          </div>
        </div>

        <div className="mt-10 py-10 border-t md:text-center">
          <p>@ 2024 web3galaxy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;