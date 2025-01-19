import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await axios.get("/cart");
        setCart(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fetchCartItems();
  }, []);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Context used outside of provider.");
  return context;
}

export default CartProvider;
