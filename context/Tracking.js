"use client"
import React,{useState,useEffect} from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import tracking from "../context/Tracking.json";

const ContractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI=tracking.abi;

const fetchContract=(signerOrProvider) => new ethers.Contract(ContractAddress,ContractABI,signerOrProvider);

export const TrackingContext=React.createContext();

export const TrackingProvider=({ children })=>{
  const DappName="tracking";
  const [currentUser,setCurrentUser]=useState("");

  const createShipment=async(items)=>{
    console.log(items);
    const {receiver,pickupTime,distance,price}=items;

    try{
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const createItem = await contract.createShipment(
      receiver,
      new Date(pickupTime).getTime(),
      distance,ethers.utils.parseUnits(price, 18),
      {
      value: ethers.utils.parseUnits(price,18),
     }
     );
      await createItem.wait();
      console.log(createItem);
    }catch(error){
      console.log("create error",error);
    }
  };

  const getAllShipment=async()=>{
    try{
      const provider=new ethers.providers.JsonRpcProvider();
      const contract=fetchContract(provider);
      const shipments=await contract.getAllTransactions();
      const allShipments=shipments.map((shipment)=>({
        sender:shipment.sender,
        receiver:shipment.receiver,
        price:ethers.utils.formatEther(shipment.price.toString()),
        pickupTime:shipment.pickupTime.toNumber(),
        deliveryTime:shipment.deliveryTime.toNumber(),
        distance:shipment.distance.toNumber(),
        isPaid:shipment.isPaid,
        status:shipment.status,
      }));

      return allShipments;
    }catch(error){
      console.log("shipment error",error);
    }
  };

  const getShipmentsCount=async ()=>{
    try{
      if(!window.ethereum) return "install metamask";

      const accounts=await window.ethereum.request({
        method:"eth_accounts",
      });
      const provider=new ethers.providers.JsonRpcProvider();
      const contract=fetchContract(provider);
      const shipmentsCount=await contract.getShipmentsCount(accounts[0]);
      return shipmentsCount.toNumber();

    }catch(err){
      console.log("shipmentcount error",err);
    }
  };

  const completeShipment=async(completeShip)=>{
    console.log(completeShip);
    const {receiver,index} =completeShip;

    try{
      if(!window.ethereum) return "install metamask";

      const accounts=await window.ethereum.request({
        method:"eth_accounts",
      });

      const web3Modal=new Web3Modal();
      const connection=await web3Modal.connect();
      const provider=new ethers.providers.Web3Provider(connection);
      const signer=provider.getSigner();
      const contract=fetchContract(signer);

      const transaction=await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        {
          gasLimit:30000000,
        }
      );

      transaction.wait();
      console.log(transaction);
    }catch(err){
      console.log("complete shipment error",err);
    }
  };

  const getShipment=async(index)=>{
    console.log(index*1);
    try{
      if(!window.ethereum) return "install metamask";

      const accounts=await window.ethereum.request({
        method:"eth_accounts",
      });

      const provider=new ethers.providers.JsonRpcProvider();
      const contract=fetchContract(provider);
      const shipment=await contract.getShipment(accounts[0],index*1);

      const SingleShipment={
        sender:shipment[0],
        receiver:shipment[1],
        pickupTime:shipment[2].toNumber(),
        deliveryTime:shipment[3].toNumber(),
        distance:shipment[4].toNumber(),
        price:ethers.utils.formatEther(shipment[5].toString()),
        status:shipment[6],
        isPaid:shipment[7],
      };
      return SingleShipment;
    }catch(err){
      console.log("get shipment",err);
    }
  };

  const startShipment=async(getProduct)=>{
    const {receiver,index}=getProduct;

    try{
      if(!window.ethereum) return "install metamask";

      const accounts=await window.ethereum.request({
        method:"eth_accounts",
      });

      const web3Modal=new Web3Modal();
      const connection=await web3Modal.connect();
      const provider=new ethers.providers.Web3Provider(connection);
      const signer=provider.getSigner();
      const contract=fetchContract(signer);

      const shipment=await contract.startShipment(
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

  const checkIfWalletConnected=async()=>{
    try{
      if(!window.ethereum) return "install metamask";

      const accounts=await window.ethereum.request({
        method:"eth_accounts",
      });

      if(accounts.length){
        setCurrentUser(accounts[0]);
      }else{
        return "no account";
      }
    }catch(err){
      console.log("not connected");
    }
  };

  const connectWallet=async()=>{
    try{
      if(!window.ethereum) return "install metamask";

      const accounts=await window.ethereum.request({
        method:"eth_requestAccounts",
      });
      setCurrentUser(accounts[0]);
    }catch(err){
      console.log("nai horaha connect",err);
    }
  }

  useEffect(()=>{
    checkIfWalletConnected();
  },[]);

  return(
    <TrackingContext.Provider value={{
      connectWallet,createShipment,getAllShipment,completeShipment,getShipment,startShipment,getShipmentsCount,DappName,currentUser,
    }}
    >
      {children}
    </TrackingContext.Provider>
  );

};

