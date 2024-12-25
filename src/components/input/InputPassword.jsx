import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function InputPassword({ title, handleChange, name, placeholder }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex items-center space-x-2 justify-center">
      <h4 className="text-rose-400 uppercase">{title}</h4>
      <input
        type={showPass ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        className="input input-bordered input-sm w-[170px] max-w-xs"
        onChange={handleChange}
      />
      <span
        className="flex justify-around items-center"
        onClick={() => setShowPass(!showPass)}
      >
        {showPass ? (
          <FiEyeOff className="absolute mr-14 text-slate-500 cursor-pointer" />
        ) : (
          <FiEye className="absolute mr-14 text-slate-500 cursor-pointer" />
        )}
      </span>
    </div>
  );
}

export default InputPassword;
