import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  FaStar,
  FaRegStar,
  FaShoePrints,
  FaShoppingBag,
  FaRegGem,
} from "react-icons/fa";

// Import fallback image
import FallbackImage from "../assets/Glowify-blau-Logo.png";
import { GiLipstick, GiPerfumeBottle, GiSunglasses } from "react-icons/gi";
import { BsCart2, BsHeart, BsHeartFill } from "react-icons/bs";
import AddToCart from "./AddToCart";
import { BsStars } from "react-icons/bs";

const Product = () => {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");

  const categories = [
    {
      key: "beauty",
      label: "Beauty",
      icon: <GiLipstick className="text-white text-lg" />,
    },
    {
      key: "fragrances",
      label: "Fragrances",
      icon: <GiPerfumeBottle className="text-white text-lg" />,
    },
    {
      key: "womens-shoes",
      label: "Shoes",
      icon: <FaShoePrints className="text-white text-lg" />,
    },
    {
      key: "womens-bags",
      label: "Bags",
      icon: <FaShoppingBag className="text-white text-lg" />,
    },
    {
      key: "womens-jewellery",
      label: "Jewellery",
      icon: <FaRegGem className="text-white text-lg" />,
    },
    {
      key: "sunglasses",
      label: "Sunglasses",
      icon: <GiSunglasses className="text-white text-xl" />,
    },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [urlCategory]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (urlCategory && categories.some((cat) => cat.key === urlCategory)) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        if (selectedCategory) {
          const response = await axios.get(
            `https://dummyjson.com/products/category/${selectedCategory}`
          );
          setProducts(response.data.products);
        } else {
          const results = await Promise.all(
            categories.map(async (category) => {
              const response = await axios.get(
                `https://dummyjson.com/products/category/${category.key}`
              );
              return response.data.products;
            })
          );
          setProducts(results.flat());
        }
      } catch (error) {
        setError("Error loading products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = storedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      storedCart[existingItemIndex].quantity =
        (storedCart[existingItemIndex].quantity || 1) + 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    alert(`"${product.title}" has been added to the cart.`);
  };

  const toggleFavorite = (product) => {
    const isFavorite = favorites.some((fav) => fav.id === product.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < fullStars ? (
          <FaStar key={i} className="text-[#E8B09E]" />
        ) : (
          <FaRegStar key={i} className="text-[#E8B09E]" />
        )
      );
    }
    return (
      <div className="absolute top-2 left-2 flex gap-1 bg-white/80 px-2 py-1 rounded">
        {stars}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-gray-50 pt-20 sm:pt-24 md:pt-30 flex flex-col lg:flex-row gap-4 
    md:gap-12 px-4 sm:px-6 md:px-12"
    >
      {/* Mobile Filter Section */}
      <div className="lg:hidden w-full mb-4">
        <div
          className="bg-white rounded-lg shadow-md p-4"
          style={{
            background:
              "linear-gradient(50deg, #326287 25%, #D59C8C 85%, #E8B09E 100%)",
            transition: "background 0.5s ease-in-out",
          }}
        >
          <h3 className="text-lg font-bold text-center text-white mb-3">
            Filter
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-1 min-w-[120px] flex font-medium items-center justify-center gap-2 
                px-3 py-2 rounded-lg capitalize transition-colors ${
                  selectedCategory === "all"
                    ? "bg-[#e8b09e]/60 text-white"
                    : "text-white hover:bg-[#e8b09e]/20"
                }`}
            >
              <BsStars className="text-sm" />
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex-1 min-w-[120px] font-medium flex items-center justify-center gap-2
                   px-3 py-2 rounded-lg capitalize transition-colors ${
                     selectedCategory === category.key
                       ? "bg-[#e8b09e]/60 text-white"
                       : "text-white hover:bg-[#e8b09e]/20"
                   }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex items-center gap-2 flex-col h-[100%] sticky top-24 w-64 bg-white 
        rounded-lg shadow-md p-4 lg:p-6"
        style={{
          background:
            "linear-gradient(50deg, #326287 25%, #D59C8C 85%, #E8B09E 100%)",
          transition: "background 0.5s ease-in-out",
        }}
      >
        <div className="mt-auto pb-4 w-full border-b border-white">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-white">
            Filter
          </h3>
        </div>

        <button
          onClick={() => setSelectedCategory(null)}
          className={`w-full mt-2 sm:mt-3 flex font-medium items-center gap-2 sm:gap-3 px-3 
            sm:px-4 py-2 sm:py-3 rounded-lg capitalize transition-colors ${
              !selectedCategory
                ? "bg-[#e8b09e]/60 text-white"
                : "text-white hover:bg-[#e8b09e]/20"
            }`}
        >
          <BsStars className="text-base sm:text-lg" />
          All Categories
        </button>

        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`w-full font-medium flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 
              sm:py-3 rounded-lg capitalize transition-colors ${
                selectedCategory === cat.key
                  ? "bg-[#e8b09e]/60 text-white"
                  : "text-white hover:bg-[#e8b09e]/20"
              }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </aside>

      {/* Products */}
      <main className="flex-1">
        {error && <p className="text-[#326287] mb-4">{error}</p>}
        {loading ? (
          <p className="text-center text-base sm:text-lg text-[#326287]">
            Loading products...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow 
                duration-300 cursor-pointer flex flex-col"
              >
                <div
                  onClick={() => setModalProduct(product)}
                  className="relative overflow-hidden rounded-t-xl"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  {(product.thumbnail || product.images?.length > 0) && (
                    <>
                      <img
                        src={product.thumbnail || product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                      />
                      {renderStars(product.rating)}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product);
                        }}
                        className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      >
                        {isFavorite(product.id) ? (
                          <BsHeartFill className="text-[#326287] text-sm sm:text-base" />
                        ) : (
                          <BsHeart className="text-[#326287] text-sm sm:text-base" />
                        )}
                      </button>
                    </>
                  )}
                </div>
                <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
                  <h3 className="text-[#326287] font-semibold text-base sm:text-lg mb-1 truncate">
                    {product.title}
                  </h3>
                  <p className="text-[#326287]/80 mb-3 sm:mb-4 text-xs sm:text-sm flex-grow">
                    {product.description.length > 80
                      ? product.description.slice(0, 77) + "..."
                      : product.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-auto">
                    <span className="text-[#326287] font-semibold text-lg sm:text-xl">
                      {product.price} €
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-1 sm:gap-2 bg-[#e8b09e] hover:bg-[#D59C8C] 
                      transition-colors rounded-xl px-3 sm:px-4 py-2 text-white font-semibold shadow-md text-sm sm:text-base"
                    >
                      <BsCart2 className="text-sm sm:text-base" />
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalProduct && (
          <div
            onClick={() => setModalProduct(null)}
            className="fixed inset-0 z-50 bg-[#326287] bg-opacity-60 flex items-center justify-center
             px-4 sm:px-8 py-8 sm:py-24 overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-4 sm:p-6 md:p-8 relative
               max-h-[90vh] sm:max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#326287] mb-3 sm:mb-4">
                {modalProduct.title}
              </h2>
              <div className="relative mb-3 sm:mb-4">
                <img
                  src={modalProduct.thumbnail || modalProduct.images[0]}
                  alt={modalProduct.title}
                  className="rounded-xl w-full max-h-[200px] sm:max-h-[300px] object-contain"
                  onError={(e) => {
                    e.target.src = FallbackImage;
                  }}
                />
                {renderStars(modalProduct.rating)}
              </div>
              <p className="text-[#326287]/90 mb-4 sm:mb-6 text-sm sm:text-base">
                {modalProduct.description}
              </p>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <p className="text-[#326287] font-semibold text-lg sm:text-xl md:text-2xl">
                  Price: {modalProduct.price} €
                </p>
              </div>
              <AddToCart product={modalProduct} />
              <button
                onClick={() => setModalProduct(null)}
                className="mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-[#E8B09E] rounded-xl 
                text-white hover:bg-[#D59C8C] transition-colors
                 w-full font-semibold text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Product;
