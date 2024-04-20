'use client'
import React, { useState, useEffect, useContext } from "react";
import { TrackingContext } from "@/context/Tracking";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, connectWallet } = useContext(TrackingContext);

  const navigation = [
    { title: "Home", path: "#" },
    { title: "Services", path: "#" },
    { title: "Contact Us", path: "#" },
    { title: "Erc20", path: "#" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className={` text-black pb-5 md:text-sm ${isOpen ? "shadow-lg rounded-xl border mx-2 mt-2" : ""}`}>
      <div className="max-w-screen-xl mx-auto px-4 md:flex md:px-8 ">
        <div className="flex items-center justify-between py-5 md:block mt-9 ">
          <h1 href="#" className="text-2xl font-bold text-black mr-48">
            <span className="text-black"></span> web3<span className="text-green-400">Galaxy</span>
          </h1>
          <div className="md:hidden">
            <button className="menu-btn text-black hover:text-gray-200" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:flex flex-1 items-center  md:mt-0`}>
          <ul className="flex flex-col justify-center items-center space-y-6 md:flex-row md:space-x-6 md:space-y-0">
            {navigation.map((item, key) => (
              <li key={key} className="text-black hover:text-white">
                <a href={item.path} className="block px-4 py-2 rounded-md hover:bg-green-700 font-medium text-lg">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex-1 gap-x-6 items-center justify-end py-14 space-y-6 md:flex md:space-y-0 md:mt-0 text-black">
            {currentUser ? (
              <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-green-700 hover:bg-green-600  rounded-full md:inline-flex">
                {currentUser.slice(0, 25)}
              </p>
            ) : (
              
              <button
                onClick={() => connectWallet()}
                className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-mediumbg-green-700 hover:bg-green-600  rounded-full md:inline-flex"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
