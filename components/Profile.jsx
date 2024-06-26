"use client"
import React,{useState,useEffect} from "react";

const Profile=({openprofile,setopenprofile,curruser,getShipmentsCount})=>{
  const [count,setcount]=useState();
  useEffect(()=>{
    const getshipmentsdata=getShipmentsCount();

    return async ()=>{
      const alldata=await getshipmentsdata;
      setcount(false);
    };
  },[]);

  return openprofile? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={()=>setopenprofile(false)}>

      </div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto gradient-form rounded-md shadow-lg">
          <div className="flex justify-end">
            <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100" onClick={()=>setopenprofile(false)}>
              close
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <div className="flex flex-col items-center pb-10">
              <h1 className="text-green-500">web3galaxy</h1>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black">welcome trader</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">{curruser}</span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2">Balance : 34ETH </a>
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2">Total shipment :{count}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ):("")
}

export default Profile;