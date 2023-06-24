import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../notepad.jpg";

export const MobileNavBarBrand = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="mobile-nav-bar__brand">
      <NavLink to="/">
        <img
          className="mobile-nav-bar__logo"
          src={logo}
          alt="Auth0 shield logo"
          // width="82"
          // height="24"
        />
      </NavLink>
    </div>
  );
};
