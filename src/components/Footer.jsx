import React from "react";
import { FaFacebookSquare, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full text-slate-600 border-t-1 bg-gradient-to-t from-amber-200 to-slate-50">
      <div className="container mx-auto items-center flex justify-between h-60 px-5 md:px-0">
        <div className="font-semibold">
          <h3 className="font-bold text-lg">Hester</h3>
          <br />
          <p>123 Demo Street New York,</p>
          <p>NY 10000</p>
          <p>(555) 555-555</p>
          <br />
          <p>Made with Squarespace</p>
        </div>
        <div className="">
          <a href="https://www.facebook.com/pongsakan.fluk/" target="_blank">
            <FaFacebookSquare size={20} className="text-blue-600" />
          </a><br />
          <a href="https://www.instagram.com/pskfluk/" target="_blank">
            <FaInstagram size={20} className="text-rose-600" />
          </a><br />
          <a href="https://github.com/pskfdev" target="_blank">
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
