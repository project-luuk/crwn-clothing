import SHOP_DATA from '../shop-data.js'

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

import { createContext, useEffect, useState } from "react";

//The context component, or the value you want to access.
//This is what is referenced inside the (part of) the app
// that is wrapped in the UserProvider component.
export const CategoriesContext = createContext({
    categoriesMap: {},
    // setProducts: () => null
});

//The provider component holds the context (component) or value.
//Wrapping components in this provider component allows child
//components to access the context component.
export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap };

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, [])

    return <CategoriesContext.Provider value={ value }>{ children }</CategoriesContext.Provider>
}