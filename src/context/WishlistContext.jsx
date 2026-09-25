import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

const WishlistContent = createContext();

export const useWishlist = () => useContext(WishlistContent);

export const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("glp-wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    })

    useEffect(() => {
        try {
            localStorage.setItem("glp-wishlist", JSON.stringify(wishlist));
        } catch (error) {
            console.log(error);
        }
    }, [wishlist]);


    const isInWishlist = useCallback((id) => {
        if (!id) return false;
        return wishlist.some(item => (item._id || item.id) === id);
    }, [wishlist]);

    const addToWishlist = useCallback((product) => {
        if (!product) return;
        const productId = product._id || product.id;
        setWishlist((prev) => {
            if (prev.some(item => (item._id || item.id) === productId)) {
                return prev;
            }
            return [...prev, product];
        });
    }, []);

    const removeFromWishlist = useCallback((id) => {
        if (!id) return;
        setWishlist((prev) => prev.filter(item => (item._id || item.id) !== id));
    }, []);

    const toggleWishlist = useCallback((product) => {
        if (!product) return;
        const productId = product._id || product.id;
        if (wishlist.some(item => (item._id || item.id) === productId)) {
            setWishlist(prev => prev.filter(item => (item._id || item.id) !== productId));
        } else {
            setWishlist(prev => [...prev, product]);
        }
    }, [wishlist]);

    const clearWishlist = useCallback(() => {
        setWishlist([]);
    }, []);

    const value = useMemo(() => ({
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlist.length
    }), [wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, clearWishlist]);

    return (
        <WishlistContent.Provider value={value}>
            {children}
        </WishlistContent.Provider>
    );
};
