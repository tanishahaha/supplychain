import Image from "next/image";
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
import { Trackingcontext } from "@/context/Tracking";

export default function Home() {
  const{
    connectwallet,createshipment,getallshipments,completeshipment,getshipment,startshipment,getshipmentcount,curruser
  }=useContext(Trackingcontext);

  const [createshipmentmodel,setcreateshipmentmodel]=useState(false);
  const [openprofile,setopenprofile]=useState(false);
  const [startmodal,setstartmodal]=useState(false);
  const [completemodal,setcompletemodal]=useState(false);
  const [getmodal,setgetmodal]=useState(false);
  const [allshipmentsdata,setallshipmentsdata]=useState();

  useEffect(()=>{
    const getcampaignsdata=getallshipments();

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
    setcreateshipmentmodel={setcreateshipmentmodel}
    allshipmentsdata={allshipmentsdata}
    />

    <Form
    createshipmentmodel={createshipmentmodel}
    createshipment={createshipment}
    setcreateshipmentmodel={setcreateshipmentmodel}
    />

    <Profile
    openprofile={openprofile}
    setopenprofile={setopenprofile}
    curruser={curruser}
    getshipmentcount={getshipmentcount}
    />

    <Completeshipment
    completemodal={completemodal}
    setcompletemodal={setcompletemodal}
    completeshipment={completeshipment}
    />

    <Getshipment
    getmodal={getmodal}
    setgetmodal={setgetmodal}
    getshipment={getshipment}
    />

    <Startshipment
    startmodal={startmodal}
    setstartmodal={setstartmodal}
    startshipment={startshipment}
    />
    
    </>
  );
}
