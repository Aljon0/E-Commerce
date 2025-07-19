import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setCartItems([]);
      return;
    }

    const cartRef = doc(db, "carts", currentUser.uid);
    const unsubscribe = onSnapshot(cartRef, (doc) => {
      if (doc.exists()) {
        setCartItems(doc.data().items || []);
      } else {
        setCartItems([]);
      }
    });

    return unsubscribe;
  }, [currentUser]);

  const addToCart = async (product) => {
    if (!currentUser) return;

    const existingItem = cartItems.find((item) => item.id === product.id);
    let newItems;

    if (existingItem) {
      newItems = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
    } else {
      newItems = [...cartItems, product];
    }

    const cartRef = doc(db, "carts", currentUser.uid);
    await setDoc(cartRef, { items: newItems });
  };

  const updateCartItem = async (index, quantity) => {
    if (!currentUser) return;

    const newItems = [...cartItems];
    newItems[index].quantity = quantity;

    const cartRef = doc(db, "carts", currentUser.uid);
    await setDoc(cartRef, { items: newItems });
  };

  const removeFromCart = async (index) => {
    if (!currentUser) return;

    const newItems = cartItems.filter((_, i) => i !== index);
    const cartRef = doc(db, "carts", currentUser.uid);
    await setDoc(cartRef, { items: newItems });
  };

  const clearCart = async () => {
    if (!currentUser) return;

    const cartRef = doc(db, "carts", currentUser.uid);
    await setDoc(cartRef, { items: [] });
  };

  const value = {
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
