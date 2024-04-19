"use client"
import React,{useState,useEffect} from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import tracking from "../context/Tracking.json";

const contractaddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractabi=tracking.abi;

const fetchcontract=(signerorprovider) => new ethers.Contract(contractaddress,contractabi,signerorprovider);

export const Trackingcontext=React.createContext();

export const Trackingprovider=({children})=>{
  const dappname="tracking";
  const [curruser,setcurruser]=useState("");

  const createshipment=async(items)=>{
    console.log(items);
    const {receiver,pickuptime,distance,price}=items;

    try{
      const web3modal=new Web3Modal();
      const connection=await web3modal.connect();
      const provider=new ethers.providers.Web3Provider(connection);
      const signer=provider.getSigner();
      const contract=fetchcontract(signer);
      const createitem=await contract.createshipment(receiver,new Date(pickuptime).getTime(),distance,ethers.utils.parseUnits(price,18),{value:ethers.utils.parseUnits(price,18)});
      await createitem.wait();
      console.log(createitem);
    }catch(error){
      console.log("create error",error);
    }
  };

  const getallshipments=async()=>{
    try{
      const provider=new ethers.providers.JsonRpcProvider();
      const contract=fetchcontract(provider);
      const shipments=await contract.getalltransactions();
      const allshipments=shipments.map((shipment)=>({
        sender:shipment.sender,
        receiver:shipment.receiver,
        price:ethers.utils.formatEther(shipment.price.toString()),
        pickuptime:shipment.pickuptime.toNumber(),
        deliverytime:shipment.deliverytime.toNumber(),
        distance:shipment.distance.toNumber(),
        isPaid:shipment.isPaid,
        status:shipment.status,
      }));

      return allshipments;
    }catch(error){
      console.log("shipment error",error);
    }
  };

  // const getshipmentcount=async()=>{
  //   try{
  //     if(!window.ethereum) return "install metamask";

  //     const accounts=await window.ethereum.request({
  //       method:"eth_accounts",
  //     });
  //     const provider=new ethers.providers.JsonRpcProvider();
  //     const contract=fetchcontract(provider);
  //     const shipmentscount=await contract.getshipmentscount(accounts[0]);
  //     return shipmentscount.toNumber();

  //   }catch(err){
  //     console.log("shipmentcount error",err);
  //   }
  // };
  const getshipmentcount = async () => {
    try {
      // Request Ethereum accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
  
      if (accounts.length === 0) {
        throw new Error("No Ethereum accounts available.");
      }
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = fetchcontract(provider);
      const shipmentscount = await contract.getshipmentscount(accounts[0]);
      return shipmentscount.toNumber();
    } catch (err) {
      console.log("shipmentcount error", err.message);
      return 0; // Return a default value or handle the error as needed
    }
  };
  

  const completeshipment=async(completeship)=>{
    console.log(completeship);
    const {receiver,index} =completeship;

    try{
      if(!window.ethereum) return "install metamask";

      const accounts=await window.ethereum.request({
        method:"eth_accounts",
      });

      const web3modal=new Web3Modal();
      const connection=await web3modal.connect();
      const provider=new ethers.providers.Web3Provider(connection);
      const signer=provider.getSigner();
      const contract=fetchcontract(signer);

      const transactions=await contract.completeshipment(
        accounts[0],
        receiver,
        index,
        {
          gasLimit:300000,
        }
      );

      transactions.wait();
      console.log(transactions);
    }catch(err){
      console.log("complete shipment error",err);
    }
  };

  const getshipment=async(index)=>{
    console.log(index*1);
    try{
      if(!window.ethereum) return "install metamask";

      const accounts=await window.ethereum.request({
        method:"eth_accounts",
      });

      const provider=new ethers.providers.JsonRpcProvider();
      const contract=fetchcontract(provider);
      const shipment=await contract.getshipment(accounts[0],index*1);

      const singleshipment={
        sender:shipment[0],
        receiver:shipment[1],
        pickuptime:shipment[2].toNumber(),
        deliverytime:shipment[3].toNumber(),
        distance:shipment[4].toNumber(),
        price:ethers.utils.formatEther(shipment[5].toString()),
        status:shipment[6],
        isPaid:shipment[7],
      };
      return singleshipment;
    }catch(err){
      console.log("get shipment",err);
    }
  };

  const startshipment=async(getproduct)=>{
    const {receiver,index}=getproduct;

    try{
      if(!window.ethereum) return "install metamask";

      const accounts=await window.ethereum.request({
        method:"eth_accounts",
      });

      const web3modal=new Web3Modal();
      const connection=await web3modal.connect();
      const provider=new ethers.providers.Web3Provider(connection);
      const signer=provider.getSigner();
      const contract=fetchcontract(signer);

      const shipment=await contract.startshipment(
        accounts[0],
        receiver,
        index*1
      );

      shipment.wait();
      console.log(shipment);

    }catch(err){
      console.log("sorry no shipment",err);
    }
  };

  const checkifwalletconnected=async()=>{
    try{
      if(!window.ethereum) return "install metamask";

      const accounts=await window.ethereum.request({
        method:"eth_accounts",
      });

      if(accounts.length){
        setcurruser(accounts[0]);
      }else{
        return "no account";
      }
    }catch(err){
      console.log("not connected");
    }
  };

  // const connectwallet=async()=>{
  //   try{
  //     if(!window.ethereum) return "install metamask";

  //     const accounts=await window.ethereum.request({
  //       method:"eth_requestAccounts",
  //     });
  //     setcurruser(accounts[0]);
  //   }catch(err){
  //     console.log("nai horaha connect",err);
  //   }
  // }
  const connectwallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
      }
  
      // Open MetaMask popup only when the button is clicked
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
  
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
  
      if (accounts.length === 0) {
        throw new Error("User rejected connecting the wallet.");
      }
  
      setcurruser(accounts[0]);
    } catch (err) {
      console.log("Error connecting wallet:", err.message);
      // Provide feedback to the user or handle the error as needed
    }
  };
  
  

  useEffect(()=>{
    checkifwalletconnected();
  },[]);

  return(
    <Trackingcontext.Provider value={{
      connectwallet,createshipment,getallshipments,completeshipment,getshipment,startshipment,getshipmentcount,dappname,curruser,
    }}
    >
      {children}
    </Trackingcontext.Provider>
  )

}

