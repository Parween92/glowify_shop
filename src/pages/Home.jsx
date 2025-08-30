import { useEffect, useState } from "react";
import axios from "axios";
import { GiLipstick, GiPerfumeBottle, GiSunglasses } from "react-icons/gi";
import { FaShoePrints, FaShoppingBag, FaRegGem } from "react-icons/fa";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { GoPackageDependents } from "react-icons/go";
import { CiCreditCard1 } from "react-icons/ci";
import { BsCart2, BsFire } from "react-icons/bs";
import { Link } from "react-router-dom";

import ChanelLogo from "../assets/Chanel.png";
import NikeLogo from "../assets/Nike.png";
import RolexLogo from "../assets/Rolex.png";
import GucciLogo from "../assets/Gucci.png";
import FashionVideo from "../assets/fashion.mp4";
import Video2 from "../assets/video2.mp4";

const SALE_PRODUCT_IDS = [1, 5];

const brands = [
  { logo: ChanelLogo },
  { logo: NikeLogo },
  { logo: RolexLogo },
  { logo: GucciLogo },
];

const categories = [
  {
    key: "beauty",
    label: "Beauty",
    icon: <GiLipstick className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
  {
    key: "fragrances",
    label: "Fragrances",
    icon: <GiPerfumeBottle className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
  {
    key: "womens-shoes",
    label: "Shoes",
    icon: <FaShoePrints className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
  {
    key: "womens-bags",
    label: "Bags",
    icon: <FaShoppingBag className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
  {
    key: "womens-jewellery",
    label: "Jewellery",
    icon: <FaRegGem className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
  {
    key: "sunglasses",
    label: "Sunglasses",
    icon: <GiSunglasses className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
];

export const Home = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loadingSale, setLoadingSale] = useState(true);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      setLoadingSale(true);
      try {
        const responses = await Promise.all(
          SALE_PRODUCT_IDS.map((id) =>
            axios.get(`https://dummyjson.com/products/${id}`)
          )
        );
        setSaleProducts(responses.map((r) => r.data));
      } catch {
        setSaleProducts([]);
      }
      setLoadingSale(false);
    };
    fetchSaleProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Video */}
      <div
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[580px] xl:h-[650px]
       flex items-center justify-center overflow-hidden"
      >
        <video
          className="w-full h-full object-cover"
          src={FashionVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center px-4">
          <h1
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold
           drop-shadow-xl tracking-wide mb-2 sm:mb-3 text-center"
          >
            Glowify Your Life
          </h1>
          <span
            className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
           font-light drop-shadow-lg text-center"
          >
            Your Beauty. Your Style. Your Choice.
          </span>
          <a
            href="#offers"
            className="mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-7 py-2 sm:py-3 rounded-xl bg-[#e8b09e]
             text-white font-semibold shadow
             hover:bg-[#D59C8C] hover:scale-105 transition text-sm sm:text-base md:text-lg"
          >
            Discover Now
          </a>
        </div>
      </div>

      {/* Benefits section */}
      <section className="w-auto flex flex-col items-center py-4 sm:py-5 md:py-6 bg-white shadow-sm border-b-[#326287] px-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:flex sm:flex-row sm:gap-6 md:gap-8 lg:gap-10 justify-center items-center w-full max-w-5xl">
          <div className="col-span-1 row-span-1 flex justify-center">
            <Benefit
              key="delivery"
              icon={
                <GoPackageDependents className="text-[#e8b09e] text-xl sm:text-2xl" />
              }
              text="Free Delivery (DE)"
            />
          </div>

          <div className="col-span-1 row-span-1 flex justify-center">
            <Benefit
              key="payment"
              icon={
                <CiCreditCard1 className="text-[#e8b09e] text-2xl sm:text-3xl" />
              }
              text="Klarna Payment"
            />
          </div>

          <div className="col-span-2 row-span-1 flex justify-center">
            <Benefit
              key="return"
              icon={
                <HiArrowUturnLeft className="text-[#e8b09e] text-lg sm:text-xl" />
              }
              text="30-Day Return Policy"
            />
          </div>
        </div>
      </section>

      {/* Offers */}
      <section
        id="offers"
        className="py-6 sm:py-8 md:py-10 px-4 max-w-5xl mb-6 sm:mb-8 mx-auto w-full"
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 mt-4 sm:mt-6 md:mt-8 
        text-[#326287] flex items-center gap-2 justify-center"
        >
          Hot Deals <BsFire className="text-xl sm:text-2xl" />
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {loadingSale ? (
            <div className="text-[#e8b09e] text-center col-span-full">
              Loading...
            </div>
          ) : (
            saleProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-5 md:p-6 flex flex-col 
                items-center group hover:shadow-2xl 
                transition border border-[#e8b09e]/30"
              >
                <div
                  className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 flex 
                items-center justify-center mb-3 sm:mb-4 overflow-hidden rounded-xl"
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition"
                  />
                  <span
                    className="absolute top-1 right-1 bg-[#e8b09e] text-white text-xs 
                  font-semibold px-2 sm:px-3 py-1 rounded-lg"
                  >
                    SALE
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-1 text-[#326287] text-center">
                  {p.title}
                </h3>
                <p className="text-[#326287]/70 text-xs sm:text-sm mb-2 line-clamp-2 text-center">
                  {p.description}
                </p>
                <p className="text-[#e8b09e] font-bold text-lg sm:text-xl">
                  {p.price} €
                </p>
                <button
                  className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 rounded-xl bg-[#e8b09e] text-white 
                  font-semibold shadow hover:bg-[#D59C8C]
                 transition flex items-baseline gap-2 text-sm sm:text-base"
                >
                  <BsCart2 /> Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 sm:py-8 md:py-10 px-4 bg-white">
        <div
          className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 
        md:gap-16 lg:gap-20 xl:gap-35 py-6 sm:py-8 md:py-10 px-4 max-w-5xl mx-auto w-full"
        >
          {/* Video Section */}
          <div className="w-full lg:w-auto flex justify-center order-2 lg:order-1">
            <video
              className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:w-[450px] xl:w-[500px] 
              h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px] 
              object-[center_30%] object-cover rounded-xl shadow-lg"
              src={Video2}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Categories Section */}
          <div className="flex flex-col justify-center items-center w-full lg:w-auto order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#326287] text-center">
              Categories
            </h2>
            <div className="w-full max-w-sm sm:max-w-md lg:w-auto grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {categories.map((category) => (
                <Link
                  key={category.key}
                  to={`/products?category=${category.key}`}
                  className="flex flex-col items-center justify-center bg-white rounded-xl 
                  shadow-lg group p-3 sm:p-4 hover:shadow-2xl 
                  transition border border-[#e8b09e]/30 cursor-pointer h-[120px] w-[140px] 
                  sm:h-[140px] sm:w-[160px] md:h-[160px] md:w-[190px]"
                >
                  <div className="text-[#e8b09e] text-2xl sm:text-3xl mb-2 scale-105 group-hover:scale-110 transition">
                    {category.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#326287] text-center">
                    {category.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="p-8 sm:p-12 md:p-16 lg:p-20 px-4 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[#326287]">
          Our Top Brands
        </h2>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-15
         justify-center items-center"
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-[#e8b09e] shadow-lg group hover:shadow-2xl 
                        border border-[#e8b09e]/30 transition"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-16 h-14 sm:w-20 sm:h-16 md:w-24 md:h-20 object-contain mb-2 
                scale-105 group-hover:scale-110 transition"
              />
              <span className="font-medium text-[#326287] text-sm sm:text-base md:text-lg text-center">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Benefit = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-2 sm:px-3 py-2 text-center sm:text-left">
    {icon}
    <span className="text-xs sm:text-sm font-semibold text-[#326287]">
      {text}
    </span>
  </div>
);
