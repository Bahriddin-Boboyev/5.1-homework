import React from "react";
import header from "./header.module.scss";
import logo from "./img/logo.svg"

export const Header = () => {
  return <>
  <div className={header.container}>
    <nav className={header.nav}>
    <div className={header.logo_box}>
   <img src={logo} alt="logo" />
    </div>
    <div>
    <input className={header.search} type="search"placeholder="Search books..." />
    </div>
    <div>
      <button className={header.log}>Logout</button>
    </div>
    </nav>

  <div className={header.box}>
  <div className={header.box_text}>
    <h3>
    Showing 18 Result(s)
    </h3>
  </div>
  <div className={header.box_calendar}>
    <h3>Order by newest</h3>
  </div>
    </div>
  </div>
</>
};
