import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../config/AuthContext.jsx";

export const store = createContext();
const FavouriteProvider = ({ children }) => {
  const { user, getFavorites, addToFavorites, removeFromFavorites } = useAuth();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (user) {
      getFavorites().then(setFavourites);
    }
  }, [user]);

  const toggleFavourite = async (itemId) => {
    try {
      if (favourites.some((fav) => fav === itemId)) {
        await removeFromFavorites(itemId);
        setFavourites((prev) => prev.filter((id) => id !== itemId));
      } else {
        await addToFavorites(itemId);
        setFavourites((prev) => [...prev, itemId]);
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  return (
    <store.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </store.Provider>
  );
};

export default FavouriteProvider;
