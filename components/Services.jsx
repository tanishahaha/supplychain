import React from "react";

const Services = ({
  setopenprofile,
  setcompletemodal,
  setgetmodal,
  setstartmodal,
}) => {
  const team = [
    {
      avatar: "Complete shipment",
    },
    {
      avatar: "Get shipment",
    },
    {
      avatar: "Start shipment",
    },
    {
      avatar: "User profile",
    },
  ];

  const openmodalbox = (text) => {
    if (text === 1) {
      setcompletemodal(true);
    } else if (text === 2) {
      setgetmodal(true);
    } else if (text === 3) {
      setstartmodal(true);
    } else if (text === 4) {
      setopenprofile(true);
    }
  };

  return (
    <div className=" text-white">
      <section className="py-0 pb-14">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-2">
              {team.map((item, i) => (
                <li key={i}>
                  <div
                    onClick={() => openmodalbox(i + 1)}
                    className="w-full h-60 sm:h-52 md:h-56 bg-green-700 hover:bg-green-600 active:bg-gray-900 rounded-xl shadow-md flex items-center justify-center cursor-pointer"
                  >
                    {/* You can replace the following div with an actual Image component */}
                    <div className="text-center font-semibold text-2xl">{item.avatar}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
