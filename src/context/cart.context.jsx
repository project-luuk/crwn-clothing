import { createContext, useState, useEffect } from "react";

// I would personally rename these to addItemToCartHelper
// This way the naming is clear and consistent with the actual
// function being exported.
const addCartItem = (cartItems, productToAdd) => {
    //Check if productToAdd exists in cartItems
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id;
    })
    //If existing, increment quantity
    if(existingCartItem) {
        return cartItems.map((cartItem)=>{
            return cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1}: cartItem;
        })
    }

    //If not existing, add productToAdd to cartItems
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove, deleteProduct) => {
    //Check if productToRemove exists in cartItems
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToRemove.id;
    })

    if(existingCartItem.quantity===1 || deleteProduct===true){
        return cartItems.filter((cartItem) => {
            return cartItem.id !== existingCartItem.id;
        })
    }

    return cartItems.map((cartItem)=>{
        return cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1}: cartItem;
    })
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
    total: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove, deleteProduct) => {
        setCartItems(removeCartItem(cartItems, productToRemove, deleteProduct));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, cartTotal, removeItemFromCart };

    return(
        <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
    );
};