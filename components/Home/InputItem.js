import Image from "next/image";
import React from "react";

const InputItem = ({ type }) => {
  const isSource = type === "source";

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image
        src={isSource ? "/source.png" : "/destination.png"}
        width={20}
        height={20}
        alt=""
      />
      <input
        className="bg-transparent outline-none"
        type="text"
        placeholder={
          isSource ? "Enter Pick-Up Location" : "Enter Drop Location"
        }
      />
    </div>
  );
};

export default InputItem;
