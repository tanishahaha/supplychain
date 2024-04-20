"use client"
import React, { useState } from "react";

const Completeshipment = ({ completemodal, setcompletemodal, completeshipment }) => {
  const [completeship, setcompleteship] = useState({
    receiver: "",
    index: "",
  });

  const changestatus = async () => {
    completeshipment(completeship);
  };

  return completemodal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setcompletemodal(false)}>

      </div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto gradient-form rounded-md shadow-lg">
          <div className="flex justify-end">
            <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100" onClick={() => setcompletemodal(false)}>close</button>
          </div>

          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-black">
              complete shipment
            </h4>

            <form onSubmit={(e) => e.preventDefault()}>

              <div className="relative mt-3">
                <input type="text" placeholder="receiver" className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg" onChange={(e) => setcompleteship({ ...completeship, receiver: e.target.value, })} />
              </div>
              <div className="relative mt-3">
                <input type="number" placeholder="Id" className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg" onChange={(e) => setcompleteship({ ...completeship, index: e.target.value, })} />
              </div>

              <button onClick={() => changestatus()} className="block w-full mt-3 py-3 px-4 text-sm text-center text-white font-bold bg-green-500 hover:bg-green-400 active:bg-green-500 rounded-lg ring-offset-2 ring-green-400 focus:ring-2">Complete shipment</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  ) : ("");
}

export default Completeshipment;