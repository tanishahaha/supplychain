'use client'
import { useState } from "react";
export default ({ getmodal, setgetmodal, getShipment }) => {
  const [index, setIndex] = useState(0);
  const [singleShipmentData, setSingleShipmentData] = useState();

  const getShipmentData = async () => {
    const getData = await getShipment(index);
    setSingleShipmentData(getData);
    console.log(getData);
  };
  console.log(singleShipmentData);

  const converTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);
    return dataTime;
  };
  return getmodal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setgetmodal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        |<div className="relative w-full max-w-lg p-4 mx-auto gradient-form rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setgetmodal(false)}>
              close
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-black">
              Product Tracting Details
            </h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="number"
                  placeholder="Id"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                  onChange={(e) => setIndex(e.target.value)}
                />
              </div>
              <button
                onClick={() => getShipmentData()}
                className="block w-full mt-3 py-3 px-4 text-sm text-center text-white font-bold bg-green-500 hover:bg-green-400 active:bg-green-500 rounded-lg ring-offset-2 ring-green-400 focus:ring-2">
                Get details
              </button>
            </form>
            {singleShipmentData == undefined ? (
              ""
            ) : (
              <div className="text-left">
                <p>Sender: {singleShipmentData.sender.slice(0, 25)}...</p>
                <p>Recevier: {singleShipmentData.receiver.slice(0, 25)}...</p>
                <p>PickupTime: {converTime(singleShipmentData.pickupTime)}</p>
                <p>
                  DeliveryTime: {converTime(singleShipmentData.deliveryTime)}
                </p>
                <p>Distance: {singleShipmentData.distance}</p>
                <p>Price: {singleShipmentData.price}</p>
                <p>Status: {singleShipmentData.status}</p>
                <p>
                  Paid: {" "}
                  {singleShipmentData.isPaid ? "Complete" : "Not Complete"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};