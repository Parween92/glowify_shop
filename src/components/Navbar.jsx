import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { BsPersonCircle } from "react-icons/bs";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

import GlowifyLogo from "../assets/Glowify-Logo.png";
import GlowifyBlueLogo from "../assets/Glowify-blau-Logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto flex items-center justify-between p-2 px-4 sm:px-6">
        <Link to="/" className="select-none cursor-pointer">
          <img
            src={scrolled ? GlowifyLogo : GlowifyBlueLogo}
            className="h-8 sm:h-10 transition-all duration-500"
            alt="Glowify Logo"
          />
        </Link>

        <ul className="hidden md:flex gap-4 lg:gap-6 xl:gap-8 items-center">
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
              <div className="flex items-start gap-1 lg:gap-2">
                {isLoggedIn ? (
                  <>
                    <BsPersonCircle className="text-sm" />
                    <span className="hidden sm:inline">DASHBOARD</span>
                  </>
                ) : (
                  <>
                    <GoPerson className="text-sm" />
                    <span className="hidden sm:inline">LOGIN</span>
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
              <div className="flex items-start gap-1 lg:gap-2">
                <BsCart2 className="text-sm" />
                <span className="hidden sm:inline">CART</span>
              </div>
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors ${
              scrolled ? "text-white" : "text-[#326287]"
            }`}
          >
            {isMobileMenuOpen ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-white z-40 shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-3 rounded-lg transition-colors text-xs ${
                  isActive
                    ? "bg-[#E8B09E] text-white font-bold"
                    : "text-[#326287] hover:bg-gray-100"
                }`
              }
            >
              <span>HOME</span>
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-3 rounded-lg transition-colors text-xs ${
                  isActive
                    ? "bg-[#E8B09E] text-white font-bold"
                    : "text-[#326287] hover:bg-gray-100"
                }`
              }
            >
              <span>PRODUCTS</span>
            </NavLink>

            <NavLink
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-3 rounded-lg transition-colors text-xs ${
                  isActive
                    ? "bg-[#E8B09E] text-white font-bold"
                    : "text-[#326287] hover:bg-gray-100"
                }`
              }
            >
              <BsCart2 className="text-lg" />
              <span>CART</span>
            </NavLink>

            <NavLink
              to={isLoggedIn ? "/dashboard" : "/login"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-3 rounded-lg transition-colors text-xs ${
                  isActive
                    ? "bg-[#E8B09E] text-white font-bold"
                    : "text-[#326287] hover:bg-gray-100"
                }`
              }
            >
              {isLoggedIn ? (
                <BsPersonCircle className="text-lg" />
              ) : (
                <GoPerson className="text-lg" />
              )}
              <span>{isLoggedIn ? "DASHBOARD" : "LOGIN"}</span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
