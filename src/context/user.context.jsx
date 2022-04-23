import {createContext, useEffect, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";

//The context component, or the value you want to access.
//This is what is referenced inside the (part of) the app
// that is wrapped in the UserProvider component.
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

//The provider component holds the context (component) or value.
//Wrapping components in this provider component allows child
//components to access the context component.
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe
    }, [])

    return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>
}