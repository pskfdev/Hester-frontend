import React from "react";
import { FaFacebookSquare, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-100 bg-red-400 text-white">
      <div className="container mx-auto items-center flex justify-between h-60 px-5 md:px-0">
        <div>
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
            <FaFacebookSquare size={20} />
          </a><br />
          <a href="https://www.instagram.com/pskfluk/" target="_blank">
            <FaInstagram size={20} />
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
