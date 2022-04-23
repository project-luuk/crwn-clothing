import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss"
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
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ?
                            <span className='nav-link' onClick={ signOutUser }>SIGN OUT</span>
                        :
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link>
                    }
                    <CartIcon />
                </div>
                {/*If both (all) are true, return the last object*/}
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;