import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedCart);
  }, []);

  const updateCartStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCartStorage(updatedCart);
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return {
          ...item,
          quantity: newQty < 1 ? 1 : newQty,
        };
      }
      return item;
    });
    updateCartStorage(updatedCart);
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 sm:pt-24 md:pt-30 px-4 sm:px-6 md:px-12 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-[#326287]">
          Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center text-[#326287]/70 space-y-2 text-sm sm:text-base">
            <p className="italic text-base sm:text-lg">Your cart is empty.</p>
            <Link
              to="/products"
              className="text-[#D59C8C] font-semibold underline hover:text-[#D59C8C] text-sm sm:text-base"
            >
              Go to Shop →
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-200 pb-4 gap-3 sm:gap-4"
                >
                  <img
                    src={item.image || (item.images && item.images[0])}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#326287] text-sm sm:text-base truncate">{item.title}</p>
                    <p className="text-[#B3746E] font-medium text-sm sm:text-base">{item.price} €</p>
                    <p className="text-[#326287] font-medium text-xs sm:text-sm">
                      Subtotal:{" "}
                      {(parseFloat(item.price) * item.quantity).toFixed(2)} €
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-[#326287]/10 p-1 sm:p-2 rounded-lg gap-1 sm:gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 rounded-full border border-[#D59C8C] text-[#D59C8C] hover:bg-[#f2e0dc] transition"
                        title="Decrease quantity"
                      >
                        <FaMinus size={10} className="sm:w-3 sm:h-3" />
                      </button>
                      <span className="px-2 sm:px-3 font-semibold text-[#326287] text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 rounded-full border border-[#D59C8C] text-[#D59C8C] hover:bg-[#f2e0dc] transition"
                        title="Increase quantity"
                      >
                        <FaPlus size={10} className="sm:w-3 sm:h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-[#D59C8C] hover:text-[#B3746E] text-xl sm:text-2xl transition transform hover:scale-110"
                      title="Remove"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <div className="flex flex-col sm:flex-row pb-6 sm:pb-8 justify-between items-start sm:items-center gap-2 sm:gap-0 text-lg sm:text-xl font-bold text-[#326287]">
                <span>Total:</span>
                <span>{totalAmount.toFixed(2)} €</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#D59C8C] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-[#B3746E] transition-colors flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                <FiShoppingBag className="text-sm sm:text-base" />
                <span className="hidden sm:inline">Proceed to Checkout</span>
                <span className="sm:hidden">Checkout</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
