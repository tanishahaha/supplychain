"use client"
import React,{useState,useEffect,useContext} from 'react';
import {
  Table,
  Form,
  Services,
  Profile,
  Completeshipment,
  Getshipment,
  Startshipment,
} from "../components/index";
import { TrackingContext } from '@/context/Tracking';

export default function Home() {
  const{
    connectWallet,createShipment,getAllShipment,completeShipment,getShipment,startShipment,getShipmentsCount,currentUser
  }=useContext(TrackingContext);

  const [createShipmentmodel,setcreateShipmentmodel]=useState(false);
  const [openprofile,setopenprofile]=useState(false);
  const [startmodal,setstartmodal]=useState(false);
  const [completemodal,setcompletemodal]=useState(false);
  const [getmodal,setgetmodal]=useState(false);
  const [allshipmentsdata,setallshipmentsdata]=useState();

  useEffect(()=>{
    const getcampaignsdata=getAllShipment();

    return async()=>{
      const alldata=await getcampaignsdata;
      setallshipmentsdata(alldata);

    };
  },[]);


  return (
    <>
    <Services 
    setopenprofile={setopenprofile}
    setcompletemodal={setcompletemodal}
    setgetmodal={setgetmodal}
    setstartmodal={setstartmodal}
    />

    <Table
    setcreateShipmentmodel={setcreateShipmentmodel}
    allshipmentsdata={allshipmentsdata}
    />

    <Form
    createShipmentmodel={createShipmentmodel}
    createShipment={createShipment}
    setcreateShipmentmodel={setcreateShipmentmodel}
    />

    <Profile
    openprofile={openprofile}
    setopenprofile={setopenprofile}
    currentUser={currentUser}
    getShipmentsCount={getShipmentsCount}
    />

    <Completeshipment
    completemodal={completemodal}
    setcompletemodal={setcompletemodal}
    completeShipment={completeShipment}
    />

    <Getshipment
    getmodal={getmodal}
    setgetmodal={setgetmodal}
    getShipment={getShipment}
    />

    <Startshipment
    startmodal={startmodal}
    setstartmodal={setstartmodal}
    startShipment={startShipment}
    />
    
    </>
  );
}
