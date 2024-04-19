import React from "react";
import Image from "next/image";

const Services=({
  setopenprofile,
  setcompletemodal,
  setgetmodal,
  setstartmodal
})=>{

  const team=[
    {
      avatar:"Comp shipment",
    },
    {
      avatar:"get shipment",
    },
    {
      avatar:"start shipment",
    },
    {
      avatar:"user profile",
    },
  ];

  const openmodalbox=(text)=>{
    if(text==1){
      setcompletemodal(true);
    }else if(text==2){
      setgetmodal(true);
    }else if(text==3){
      setstartmodal(true);
    }else if(test==4){
      setopenprofile(true);
    }
  }
  return(
    <div>
      <section className="py-0 pb-14">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 cursor-pointer">
              {
                team.map((item,i)=>(
                  <li key={i}>
                    <div onClick={()=>openmodalbox(i+1)} className="w-full h-60 sm:h-52 md:h-56">
                      {/* <Image alt="img" className="w-full h-full object-cover object-center shadow-md rounded-xl"/> */}
                      {item.avatar}

                    </div>
                  </li>
                ))
              }

            </ul>

          </div>
        </div>
      </section>
      
    </div>
  )
}

export default Services;