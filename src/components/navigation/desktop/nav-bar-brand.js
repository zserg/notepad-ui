import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../notepad.jpg";

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src={logo}
          alt="Auth0 shield logo"
          // width="60"
          // height="120"
        />
      </NavLink>
    </div>
  );
};
