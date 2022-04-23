import SHOP_DATA from '../shop-data.json'

import { createContext, useEffect, useState } from "react";

//The context component, or the value you want to access.
//This is what is referenced inside the (part of) the app
// that is wrapped in the UserProvider component.
export const ProductsContext = createContext({
    products: [],
    // setProducts: () => null
});

//The provider component holds the context (component) or value.
//Wrapping components in this provider component allows child
//components to access the context component.
export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(SHOP_DATA);
    const value = { products };

    // useEffect(() => {
    //     setProducts(SHOP_DATA)
    // }, [])

    return <ProductsContext.Provider value={ value }>{ children }</ProductsContext.Provider>
}