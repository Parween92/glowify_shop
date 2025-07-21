import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { BsPersonCircle } from "react-icons/bs";

// Import logos
import GlowifyLogo from "../assets/Glowify-Logo.png";
import GlowifyBlueLogo from "../assets/Glowify-blau-Logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();

    window.addEventListener("storage", checkAuthStatus);

    window.addEventListener("authStatusChanged", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authStatusChanged", checkAuthStatus);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#e8b09e] shadow-md navbar-scrolled" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-2">
        <div className="select-none cursor-pointer">
          <img
            src={scrolled ? GlowifyLogo : GlowifyBlueLogo}
            className="h-10 transition-all duration-500"
            alt="Glowify Logo"
          />
        </div>

        <ul className="flex gap-8 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link text-xs font-semibold transition-colors pt-3 duration-300 ${
                  isActive ? "font-bold" : ""
                } ${scrolled ? "text-white" : "text-[#326287]"}`
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `nav-link text-xs font-semibold transition-colors pt-3 duration-300 ${
                  isActive ? "font-bold" : ""
                } ${scrolled ? "text-white" : "text-[#326287]"}`
              }
            >
              PRODUCTS
            </NavLink>
          </li>

          <li>
            <NavLink
              to={isLoggedIn ? "/dashboard" : "/login"}
              className={({ isActive }) =>
                `nav-link text-xs font-semibold transition-colors pt-3 duration-300 ${
                  isActive ? "font-bold" : ""
                } ${scrolled ? "text-white" : "text-[#326287]"}`
              }
            >
              <div className="flex items-start gap-2">
                {isLoggedIn ? (
                  <>
                    <BsPersonCircle />
                    DASHBOARD
                  </>
                ) : (
                  <>
                    <GoPerson className="text-sm" />
                    LOGIN
                  </>
                )}
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `nav-link text-xs font-semibold transition-colors pt-3 duration-300 ${
                  isActive ? "font-bold" : ""
                } ${scrolled ? "text-white" : "text-[#326287]"}`
              }
            >
              <div className="flex items-start gap-2">
                <BsCart2 />
                CART
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
