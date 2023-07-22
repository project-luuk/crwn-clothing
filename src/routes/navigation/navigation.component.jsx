import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles"
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../context/cart.context";

const Navigation = () => {
    //useContext causes this component to re-render whenever the context changes.
    //This happens due to useState being called inside the context component.
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ?
                            <NavLink as='span' onClick={ signOutUser }>SIGN OUT</NavLink>
                        :
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                    }
                    <CartIcon />
                </NavLinks>
                {/*If both (all) are true, return the last object*/}
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;