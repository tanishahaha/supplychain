import React from "react";
import Image from "next/image";

const Services=({
  setopenprofile,
  setcompletemodal,
  setgetmodal,
  setstartmodal
})=>{
  // const team=[
  //   {
  //     avatar:images.img1,
  //   },
  //   {
  //     avatar:images.img1,
  //   },
  //   {
  //     avatar:images.img1,
  //   },
  // ];

  const openmodalbox=(text)=>{
    if(text==1){
      setcompletemodal(true);
    }else if(text==2){
      setgetmodal(true);
    }else if(test==4){
      setopenprofile(true);
    }
  }
  return(
    <div>
      Services
    </div>
  )
}

export default Services;